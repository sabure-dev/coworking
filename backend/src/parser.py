import requests
from bs4 import BeautifulSoup
import time

url = 'https://лицей373.рф/news-line.html'

max_attempts = 3  # Максимальное количество попыток
current_attempt = 0

while current_attempt < max_attempts:
    try:
        print(f"Попытка {current_attempt + 1} из {max_attempts}")
        response = requests.get(url)

        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            for img in soup.find_all('img'):
                src = img.get('src')
                if src and src.startswith('wpimages/'):
                    img['src'] = 'https://xn--373-qddohl3g.xn--p1ai/' + src

            for link in soup.find_all('a'):
                href = link.get('href')
                if href and (href.endswith('.pdf') or href.endswith('.PDF')):
                    if not href.startswith('http'):
                        link['href'] = 'https://xn--373-qddohl3g.xn--p1ai/' + href

            with open('backend/src/output.html', 'w', encoding='utf-8') as file:
                file.write(soup.prettify())

            print("Содержимое успешно сохранено в 'output.html'")
            break  # Выходим из цикла при успешном выполнении
        else:
            print(f"Ошибка при запросе: {response.status_code}")
            
    except Exception as e:
        print(f"Ошибка при попытке {current_attempt + 1}: {str(e)}")
    
    current_attempt += 1
    if current_attempt < max_attempts:
        print("Ожидание 30 секунд перед следующей попыткой...")
        time.sleep(30)

if current_attempt == max_attempts:
    print("Все попытки получения данных завершились неудачно")