import requests
from bs4 import BeautifulSoup

url = 'https://лицей373.рф/news-line.html'
response = requests.get(url)

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    for img in soup.find_all('img'):
        src = img.get('src')
        if src and src.startswith('wpimages/'):
            img['src'] = 'https://xn--373-qddohl3g.xn--p1ai/' + src

    with open('output.html', 'w', encoding='utf-8') as file:
        file.write(soup.prettify())

    print("Содержимое успешно сохранено в 'output.html'")
else:
    print(f"Ошибка при запросе: {response.status_code}")
