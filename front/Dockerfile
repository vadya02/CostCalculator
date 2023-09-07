# Используем базовый образ Node.js
FROM node:18

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код React-приложения в контейнер
COPY . .

# Собираем приложение
RUN npm run build

# Указываем порт, который будет слушать контейнер
EXPOSE 3000

# Команда для запуска приложения
CMD ["npm", "start"]
