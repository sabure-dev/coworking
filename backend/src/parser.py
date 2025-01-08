import requests
from bs4 import BeautifulSoup
import os
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry
import time

url = 'https://лицей373.рф/news-line.html'
output_file = 'output.html'

def get_current_content():
    if os.path.exists(output_file):
        with open(output_file, 'r', encoding='utf-8') as file:
            return file.read()
    return None

def save_content(content):
    with open(output_file, 'w', encoding='utf-8') as file:
        file.write(content)
    print("Содержимое успешно сохранено в 'output.html'")

# Настройка повторных попыток
session = requests.Session()
retry_strategy = Retry(
    total=5,  # количество повторных попыток
    backoff_factor=1,  # время ожидания между попытками будет увеличиваться
    status_forcelist=[500, 502, 503, 504]  # статусы для повторных попыток
)
adapter = HTTPAdapter(max_retries=retry_strategy)
session.mount("http://", adapter)
session.mount("https://", adapter)

# Используем прокси для доступа к российским сайтам
proxies = {
    'http': 'http://proxy.freemyip.com:8080',
    'https': 'http://proxy.freemyip.com:8080'
}

# Пробуем получить данные с повторными попытками
max_attempts = 3
attempt = 0
while attempt < max_attempts:
    try:
        print(f"Попытка {attempt + 1} из {max_attempts}")
        response = session.get(url, proxies, verify=False, timeout=30)  # таймаут 30 секунд
        
        if response.status_code == 200:
            soup = BeautifulSoup(response.content, 'html.parser')

            # Обработка изображений
            for img in soup.find_all('img'):
                src = img.get('src')
                if src and src.startswith('wpimages/'):
                    img['src'] = 'https://xn--373-qddohl3g.xn--p1ai/' + src

            # Обработка ссылок на PDF
            for link in soup.find_all('a'):
                href = link.get('href')
                if href and (href.endswith('.pdf') or href.endswith('.PDF')):
                    if not href.startswith('http'):
                        link['href'] = 'https://xn--373-qddohl3g.xn--p1ai/' + href

            new_content = soup.prettify()
            current_content = get_current_content()

            if current_content != new_content:
                save_content(new_content)
                print("Обнаружены изменения, файл обновлен")
            else:
                print("Изменений не обнаружено")
            
            break  # Выходим из цикла, если всё успешно
        else:
            print(f"Ошибка при запросе: {response.status_code}")
            
    except requests.exceptions.Timeout:
        print(f"Таймаут при попытке {attempt + 1}")
    except requests.exceptions.RequestException as e:
        print(f"Ошибка при попытке {attempt + 1}: {str(e)}")
    
    attempt += 1
    if attempt < max_attempts:
        print("Ожидание 30 секунд перед следующей попыткой...")
        time.sleep(30)

if attempt == max_attempts:
    print("Все попытки получения данных завершились неудачно")
