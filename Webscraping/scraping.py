from selenium import webdriver
import time

# Get the website using the Chrome webbdriver
browser = webdriver.Chrome()
browser.get('https://www.walmart.ca/browse/grocery/fruits-vegetables/fresh-fruits/apples/10019-6000194327370-6000194327411-6000202947774?icid=browse_l3_grocery_apples_942_SHF865ZTB2')

# Print out the result
price = browser.find_element('css-2vqe5n esdkp3p0')
print("Price: " + price.text)

# Close the browser
time.sleep(100)
browser.close()