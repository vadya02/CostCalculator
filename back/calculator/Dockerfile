# Используем базовый образ Python
FROM python:3.10.9

# Устанавливаем рабочую директорию
WORKDIR /usr/src/app

# Копируем зависимости и устанавливаем их
COPY requirements.txt .
RUN pip install -r requirements.txt

# Копируем исходный код Django-приложения
# COPY . /usr/src/app
COPY . .
# Указываем порт, который должен слушать контейнер
EXPOSE 8000

# Команда для запуска приложения
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
