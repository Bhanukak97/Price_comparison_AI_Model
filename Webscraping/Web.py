import requests
from bs4 import BeautifulSoup

url = "https://www.woofshack.com/en/cloud-chaser-waterproof-softshell-dog-jacket-ruffwear-rw-5102.html"  # URL of the Walmart website
response = requests.get(url)
html_content = response.text

products=[] #List to store name of the product
prices=[] #List to store price of the product
ratings=[] #List to store rating of the product
# driver.get("https://www.woofshack.com/en/cloud-chaser-waterproof-softshell-dog-jacket-ruffwear-rw-5102.html")

soup = BeautifulSoup(html_content, "html.parser")
print(soup)
products = soup.find_all("h1", class_="page-title")  # Find product titles
prices = soup.find_all("span", class_="css-2vqe5n esdkp3p0")  # Find product prices

# Extract the text from the found elements
titles = [product.text.strip() for product in products]
prices = [price.text.strip() for price in prices]

for title, price in zip(titles, prices):
    print("Title:", title)
    print("Price:", price)
    print()
