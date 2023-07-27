from selenium import webdriver
import time

# Get the website using the Chrome webbdriver
browser = webdriver.Chrome()
browser.get('https://www.woofshack.com/en/cloud-chaser-waterproof-softshell-dog-jacket-ruffwear-rw-5102.html')

# Print out the result
price = browser.find_element('product-price-665')
print("Price: " + price.text)

# Close the browser
time.sleep(3)
browser.close()