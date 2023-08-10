from selenium import webdriver
import time

# Get the website using the Chrome webbdriver
browser = webdriver.Chrome()
browser.get('https://www.costco.ca/jarlsberg-cheese-500-g-19.2-oz-%c3%97-4-pack.product.100767609.html')

# Print out the result
price = browser.find_element('value canada-currency-size')
print("Price: " + price.text)

# Close the browser
time.sleep(100)
browser.close()