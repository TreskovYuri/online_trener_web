const express = require('express');
const path = require('path');


const app = express();

// Указываем Express использовать статические файлы из папки public/assets
app.use('/assets', express.static(path.join(__dirname, 'public/assets')));

// Обработчик маршрута для главной страницы
app.get('/', (req, res) => {
  res.send('Главная страница');
});

// Запускаем сервер
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {
  console.log("\x1b[1m\x1b[34m%s\x1b[0m",`Сервер запущен на порту ${PORT}`);
});
