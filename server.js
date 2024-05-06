// // Пример настройки Express.js для отмены кэширования изображений
// const dotenv = require('dotenv')
// dotenv.config()
// const express = require('express');
// const next = require('next');

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev });
// // const handle = app.getRequestHandler();

// const PORT = process.env.PORT
// app.prepare().then(() => {
//   const server = express();

//   // Обработка пути для изображений
//   server.get('/assets/*', (req, res) => {
//     res.setHeader('Cache-Control', 'no-cache');
//     return app.serveStatic(req, res, path.join(__dirname, 'public/assets', req.url));
//   });

//   // Перенаправление всех запросов на next.js
//   // server.get('*', (req, res) => {
//   //   return handle(req, res);
//   // });
//   // server.post('*', (req, res) => {
//   //   return handle(req, res);
//   // });
//   // server.put('*', (req, res) => {
//   //   return handle(req, res);
//   // });
//   // server.delete('*', (req, res) => {
//   //   return handle(req, res);
//   // });

//   // Запуск сервера
//   server.listen(PORT, (err) => {
//     if (err) throw err;
//     console.log("\x1b[1m\x1b[34m%s\x1b[0m",`<=======  Сервер запущен... ${PORT && PORT + ' ' + 'Порт'}  =========>`);
//   });
// });




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

