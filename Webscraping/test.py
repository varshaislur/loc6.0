import csv
import pprint
import requests
from bs4 import BeautifulSoup

def flipkart_scraper(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,/;q=0.8',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'Connection': 'keep-alive'
    }

    page = requests.get(url, headers=headers, verify=False)  # Ignore SSL verification (not recommended)
    soup = BeautifulSoup(page.content, 'html.parser')
    
    data = {'source': 'Flipkart'}

    # Find title
    title_element = soup.find('h1', class_="yhB1nd")
    title = title_element.text.strip() if title_element else None
    data['title'] = title

    # Find image source
    img_tag = soup.find('img', class_='_396cs4 _2amPTt _3qGmMb')
    image_src = img_tag['src'] if img_tag else None
    data['image'] = image_src

    # Find ratings and reviews
    value_element = soup.find('span', class_="_2_R_DZ")
    if value_element:
        value = value_element.text.strip()
        split = value.split("&")
        ratings = split[0].split()[0]
        reviews = split[1].split()[0]
    else:
        ratings = None
        reviews = None
    data['ratings'] = ratings
    data['reviews'] = reviews

    # Find stars
    stars_element = soup.find('div', class_="_3LWZlK")
    stars = stars_element.text.strip() if stars_element else None
    data['stars'] = stars

    # Find price
    price_element = soup.find('div', class_="_30jeq3 _16Jk6d")
    price = price_element.text.strip() if price_element else None
    data['price'] = price

    # Find highlights
    highlights_div = soup.find('div', class_='_2cM9lP')
    if highlights_div:
        highlights_title_div = highlights_div.find('div', class_='_3a9CI2')
        highlights_ul = highlights_div.find('ul')
        highlights_title = highlights_title_div.text.strip() if highlights_title_div else None
        highlights_list = [li.text.strip() for li in highlights_ul.find_all('li')] if highlights_ul else []
        data['description'] = highlights_list
    else:
        data['description'] = None

    return data

def write_to_csv(data, filename):
    with open(filename, 'a', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['title', 'image', 'ratings', 'reviews', 'stars', 'price', 'description']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        ##writer.writeheader()
        writer.writerow({k: v for k, v in data.items() if k in fieldnames})


url = "https://www.flipkart.com/apple-iphone-13-pink-128-gb/p/itm6e30c6ee045d2?pid=MOBG6VF5GXVFTQ5Y&lid=LSTMOBG6VF5GXVFTQ5YWKHB1V&marketplace=FLIPKART&q=iphone+13&store=tyy%2F4io&srno=s_1_1&otracker=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&otracker1=AS_QueryStore_OrganicAutoSuggest_1_6_na_na_na&fm=organic&iid=1afcad9d-dd58-4124-a21c-bd58eef19ac4.MOBG6VF5GXVFTQ5Y.SEARCH&ppt=hp&ppn=homepage&ssid=zgr0s43f340000001709993358276&qH=c68a3b83214bb235"
product_data = flipkart_scraper(url)

write_to_csv(product_data, 'productdata.csv')
print("Data written to productdata.csv")
