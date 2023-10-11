from flask import Flask, request, make_response
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup

# initializing the Flask application
app = Flask(__name__)
CORS(app)

@app.post('/')
def get_providers():
    req = request.get_json()
    page_number = 0
    data = []
    irs_response = requests.get(f'https://www.irs.gov/efile-index-taxpayer-search?zip={req}&state=All&page={page_number}')
    if irs_response.status_code != 200:
        return make_response(irs_response.json(), 500)
    soup = BeautifulSoup(irs_response.content, 'html.parser')
    while (len(soup.find_all('tr')) > 0):
        for i in range(0, len(soup.find_all('tr'))):
            data.append(soup.find_all('tr')[i].find_all('td')[1].text.split('\n'))
        page_number += 1
        irs_response = requests.get(f'https://www.irs.gov/efile-index-taxpayer-search?zip={req}&state=All&page={page_number}')
        soup = BeautifulSoup(irs_response.content, 'html.parser')
    return make_response(data, 200)
    
if __name__ == '__main__':
    app.run(port=5555, debug=True)