

const express = require('express');
const path = require('path');

// <================= HTTPS
const https =  require('https')
const fs =  require('fs')

const app = express();

// <================= HTTPS
var credentials = {
	key: fs.readFileSync('/etc/letsencrypt/live/mobilecoach.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mobilecoach.ru/fullchain.pem'),
};



// <================= HTTPS
var httpsServer = https.createServer(credentials, app);


// Обработчик маршрута для главной страницы
app.get('/', (req, res) => {
  res.send('Главная страница');
});


  // <================= HTTPS
httpsServer.listen(PORT,() => console.log('\x1b[32m%s\x1b[0m',`Сервер запустился на ${PORT} порту`))

