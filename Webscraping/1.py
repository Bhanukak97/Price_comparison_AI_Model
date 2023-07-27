from selenium import webdriver
from selenium.webdriver.common.by import By
import time
import pandas as pd

# Get the website using the Chrome webbdriver
browser = webdriver.Chrome()
browser.get('https://www.woofshack.com/en/cloud-chaser-waterproof-softshell-dog-jacket-ruffwear-rw-5102.html')

# Print out the result
price = browser.find_element(By.ID,'product-price-665')
title = browser.find_element(By.CLASS_NAME,'page-title')

print("Price: " + price.text)
print("Price: " + title.text)


# # Close the browser
# time.sleep(3)
# browser.close()

# #df = pd.DataFrame([["woofshack.com", price.text]], columns=["Website","Price"])
# df = pd.DataFrame({'Product Name':title.text,'Price':price.text}) 
# print("test",df)
# df.to_csv('products.csv', index=False, encoding='utf-8')
# Get the text from the elements
price = price.text
title = title.text

print("Price:", price)
print("Title:", title)

# Close the browser
time.sleep(3)
browser.quit()

# Create lists for title and price
title_list = [title]
price_list = [price]

# Create the DataFrame
df = pd.DataFrame({'Product Name': title_list, 'Price': price_list})

# Save the DataFrame to a CSV file
df.to_csv('products.csv', index=False, encoding='utf-8')

# Print the DataFrame
print("DataFrame:")
print(df)