import requests
from bs4 import BeautifulSoup

url = f'https://www.irs.gov/efile-index-taxpayer-search?zip=93101&state=All&page=0'
response = requests.get(url)

soup = BeautifulSoup(response.content, 'html.parser')
print(soup.select('.table'))
