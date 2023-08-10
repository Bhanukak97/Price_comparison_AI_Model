import json
from dataclasses import dataclass, asdict

from playwright.sync_api import sync_playwright, Page
from bs4 import BeautifulSoup


@dataclass
class Product:
    name: str
    price: float
    image_link: str


def create_product_from_div(product_div):
    price_div = product_div.find('div', class_='price')
    if not price_div:
        return None

    price = float(price_div.text.strip().split()[0].replace('$', '').replace(',', ''))
    name = product_div.find('span', class_='description').text.strip()
    image_link_from_data_src = product_div.find('img', class_='img-responsive').get('data-src')
    image_link_from_src = product_div.find('img', class_='img-responsive').get('src')
    image_link = image_link_from_src or image_link_from_data_src
    return Product(name, price, image_link)


def extract_products_from_page(page):
    product_list_div = page.locator('[automation-id="productList"]')
    product_list_div_html = product_list_div.inner_html()
    soup = BeautifulSoup(product_list_div_html, 'html.parser')
    products_div_list = soup.find_all('div', class_='thumbnail')

    products_in_page = []
    for product_div in products_div_list:
        product = create_product_from_div(product_div)
        if product:
            products_in_page.append(product)

    return products_in_page


def convert_product_list_to_dict(product_list):
    return [asdict(product) for product in product_list]


def get_all_products_in_category(page, category_url):
    page_index = 1
    are_there_elements = True
    all_products = []
    while are_there_elements:
        url = f'{category_url}?currentPage={page_index}&pageSize=24'
        page.goto(url)
        products_in_page = extract_products_from_page(page)
        all_products.extend(products_in_page)
        if not products_in_page:
            are_there_elements = False

        page_index += 1

    return all_products


def main():
    with sync_playwright() as playwright_context_manager, playwright_context_manager.firefox.launch(
        headless=True, slow_mo=500
    ) as browser:
        page = browser.new_page()

        categories_url = [
            'https://www.costco.ca/paper-plastic-products.html',
            'https://www.costco.ca/baking-packaged-food.html',
            'https://www.costco.ca/coffee-tea.html',
            'https://www.costco.ca/snacks.html',
            'https://www.costco.ca/desserts.html',
            'https://www.costco.ca/seafood.html',
            'https://www.costco.ca/meat.html',
            'https://www.costco.ca/poultry.html',
            'https://www.costco.ca/cured-meats.html',
            'https://www.costco.ca/cheese.html',
            'https://www.costco.ca/bakery-desserts.html',
            'https://www.costco.ca/meals-appetizers.html',
            'https://www.costco.ca/water-beverages.html',
            'https://www.costco.ca/wine-beer-kits.html',
            'https://www.costco.ca/organic.html',
            'https://www.costco.ca/vegan-foods.html',
            'https://www.costco.ca/international-foods.html',
            'https://www.costco.ca/emergency-food-kits.html',
        ]

        all_products = []
        for category_url in categories_url:
            print('Extracting products from category:', category_url)
            all_products_in_category = get_all_products_in_category(page, category_url)
            print('Number of products in category:', len(all_products_in_category))
            all_products.extend(all_products_in_category)

        print(len(all_products))
        print(json.dumps(convert_product_list_to_dict(all_products), indent=2))
        
        with open('costco.json', 'w') as f:
            json.dump(convert_product_list_to_dict(all_products), f, indent=2)


if __name__ == '__main__':
    main()
