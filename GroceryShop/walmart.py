import json
from dataclasses import dataclass, asdict

from playwright.sync_api import sync_playwright
from bs4 import BeautifulSoup


@dataclass
class Product:
    name: str
    price: float
    image_link: str


def create_product_from_div(grocery_product_div):
    price_span = grocery_product_div.find('span', {'data-automation': 'current-price'})
    name_paragraph = grocery_product_div.find('p', {'data-automation': 'name'})
    image = grocery_product_div.find('img', {'data-automation': 'image'})

    price_string = price_span.text.strip()
    if "$" in price_string:
        price = float(price_string.split()[0].replace('$', '').replace(',', ''))
    elif "¢" in price_string:
        price = float(price_string.split()[0].replace('¢', '')) / 100
    else:
        raise ValueError(f'Price string {price_string} is not valid')

    name = name_paragraph.text.strip()
    image_link = image.attrs['src']
    return Product(name, price, image_link)


def extract_products_from_page(page):
    product_results_div = page.locator('[data-automation="product-results"]')
    if not product_results_div.is_visible():
        if page.locator('text=empty-handed but we experienced a problem').is_visible():
            return []
        else:
            raise Exception('Product results div is not visible')

    product_results_div_html = product_results_div.inner_html()
    soup = BeautifulSoup(product_results_div_html, 'html.parser')
    grocery_product_div_list = soup.find_all('div', {'data-automation': 'grocery-product'})

    products_in_page = []
    for grocery_product_div in grocery_product_div_list:
        product = create_product_from_div(grocery_product_div)
        products_in_page.append(product)

    return products_in_page


def convert_product_list_to_dict(product_list):
    return [asdict(product) for product in product_list]


def scroll_to_bottom(page):
    current = 0
    after = page.evaluate('(window.innerHeight + window.scrollY)')
    while current < after:
        page.mouse.wheel(0, 1000)
        page.wait_for_timeout(100)
        current = after
        after = page.evaluate('(window.innerHeight + window.scrollY)')


def get_all_products_in_category(page, category_url):
    page_index = 1
    are_there_elements = True
    all_products = []
    while are_there_elements:
        url = f'{category_url}&p={page_index}'
        page.goto(url)
        scroll_to_bottom(page)
        products_in_page = extract_products_from_page(page)
        all_products.extend(products_in_page)
        if not products_in_page:
            are_there_elements = False

        page_index += 1

    return all_products


def main():
    base_url = 'https://www.walmart.ca'
    filtered_category_list = [
        'Pets',
        'Home, kitchen & outdoor',
    ]
    with sync_playwright() as playwright_context_manager, playwright_context_manager.firefox.launch(
        headless=False, slow_mo=500
    ) as browser:
        page = browser.new_page()
        url = f'{base_url}/cp/grocery'
        page.goto(url)

        category_tiles_wrapper_div = page.locator('[data-automation="category-tiles"]').nth(1)
        category_tiles_wrapper_div_html = category_tiles_wrapper_div.inner_html()

        soup = BeautifulSoup(category_tiles_wrapper_div_html, 'html.parser')
        category_tiles_anchor_list = soup.find_all('a', {'data-automation': 'category-tile'})

        categories_url = [
            f'{base_url}{category_tile_anchor.attrs["href"]}'
            for category_tile_anchor in category_tiles_anchor_list
            if category_tile_anchor.text.strip() not in filtered_category_list
        ]

        all_products = []
        for category_url in categories_url:
            print('Extracting products from category:', category_url)
            all_products_in_category = get_all_products_in_category(page, category_url)
            print('Number of products in category:', len(all_products_in_category))
            all_products.extend(all_products_in_category)

        print(len(all_products))
        print(json.dumps(convert_product_list_to_dict(all_products), indent=2))

        with open('walmart.json', 'w') as f:
            json.dump(convert_product_list_to_dict(all_products), f, indent=2)


if __name__ == '__main__':
    main()
