from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import os


chromedriver_path="C:/Users/admin/Desktop/chromedriver_win32"
os.environ["webdriver.chrome.driver"] = chromedriver_path

# driver = webdriver.Chrome(chromedriver_path)
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")
options.add_argument("executable_path=" + chromedriver_path)

driver = webdriver.Chrome(options=options)

products=[] #List to store name of the product
prices=[] #List to store price of the product
ratings=[] #List to store rating of the product
driver.get("<a href=https://www.flipkart.com/laptops/>""https://www.flipkart.com/laptops/</a>~buyback-guarantee-on-laptops-/pr?sid=6bo%2Cb5g&amp;amp;amp;amp;amp;amp;amp;amp;amp;uniq")

# products=[] #List to store name of the product
# prices=[] #List to store price of the product
# ratings=[] #List to store rating of the product
# driver.get("<a href=https://www.flipkart.com/laptops/>""https://www.flipkart.com/laptops/</a>~buyback-guarantee-on-laptops-/pr?sid=6bo%2Cb5g&amp;amp;amp;amp;amp;amp;amp;amp;amp;uniq")
