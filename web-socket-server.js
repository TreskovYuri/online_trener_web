require('dotenv').config()
const express = require('express');
const path = require('path');
const https =  require('https')
const fs =  require('fs')
const sequelize = require('./express_db_cinfig');
const { UserMessageBelongChatExpress } = require('./models/Express/models');


const WEB_SOCKET_PORT = process.env.WEB_SOCKET_SERVER_PORT || 4000
const CLIENT_URL = process.env.CLIENT_URL

const app = express();
const start = async () => {
  try{
    // Подключение к базе данных
    await sequelize.authenticate()
    // Сверка состояния базы данных со схемой данны в нашем приложении
    await sequelize.sync()
    console.log('\x1b[36m%s\x1b[0m',`Установлено подулючение к базе данных`)
  }catch(e){ColorConsole.red('\x1b[31m%s\x1b[0m',"ОШИБКА ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ");ColorConsole.red(e)}
}
start()

var credentials = {
	key: fs.readFileSync('/etc/letsencrypt/live/mobilecoach.ru/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/mobilecoach.ru/fullchain.pem'),
};


var httpsServer = https.createServer(credentials, app);

const io = require('socket.io')(httpsServer,{
  cors:{
    origin:CLIENT_URL,
    methods:["GET",'POST']
  }
})

console.log(`Сервер запустился на ${WEB_SOCKET_PORT} порту...`)

// Отслеживание нового подключения
io.on('connection', (socket) => {
  console.log('Пользователь подключен..')

  // Отслеживание входящего сообщения
  socket.on('message', (message, roomID, userId) => {
    console.log(`Сообщение: ${message}. Комната № ${roomID} Пользователь ID ${userId}`)
    // Если в комнате кто-то есть
    if (roomID > 0) {
      // Отправить сообщение всем посетителям комнаты
      io.to(roomID).emit('message', message, userId)
      try{
        UserMessageBelongChatExpress.create({chatId:roomID,userId:userId,message:message})
      }catch(e){ColorConsole.red(e)}
    }
    // else {
    //   // В противном случае отправляю сообщение всем желающим
    //   io.emit('message', message)
    // }
  })

  // Отслеживание отключения пользователя
  socket.on('disconnect', () => {
    console.log('Пользователь отключен.')
  })

  // Отслеживание подключения к определенной комнате
  socket.on('JoinRoom', (roomID) => {
    console.log('Подключение к комнате: ' + `${roomID}`)
    socket.join(roomID)
  })
})

httpsServer.listen(WEB_SOCKET_PORT ,() => console.log('\x1b[32m%s\x1b[0m',`Сервер запустился на ${WEB_SOCKET_PORT } порту`))
