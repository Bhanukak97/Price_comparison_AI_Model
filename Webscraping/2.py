import requests 
from bs4 import BeautifulSoup 
import pandas as pd 
from selenium.webdriver.common.by import By
import time

walmart_product_url = 'https://www.walmart.ca/en/ip/apple-royal-gala-your-fresh-market/6000197346281' 
headers = {'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36'} 


response = requests.get(walmart_product_url, headers=headers) 
soup = BeautifulSoup(response.content, 'html.parser') 
# # print(soup.prettify()) 

title = soup.find_all("h1","product-title") 
price = soup.find_all("span", {"itemprop": "price"})
print(price)

