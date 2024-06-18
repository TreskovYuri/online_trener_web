
const ColorConsole = require('./utils/console/ColorConsole');
const sequelize = require('./express_db_cinfig');
const { UserMessageBelongChatExpress } = require('./models/Express/models');

require('dotenv').config()

const PORT = process.env.WEB_SOCKET_SERVER_PORT
const CLIENT_URL = process.env.CLIENT_URL
const debug = true


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

const io = require('socket.io')(PORT, {
  cors: {
    origin: CLIENT_URL,
    methods: ["GET", "POST"],
  }
})

debug&&ColorConsole.blue(`Сервер запустился на ${PORT} порту...`)
// console.log(`Сервер запустился на ${PORT} порту...`)

// Отслеживание нового подключения 
io.on('connection', (socket) => {
  debug&&ColorConsole.cyan('Пользователь подключен..')

  // Отслеживание входящего сообщения
  socket.on('message', (message, roomID, userId) => {
    debug&&ColorConsole.yellow(`Сообщение: ${message}.`)
    debug&&ColorConsole.brightGreen(`Комната № ${roomID}.`)
    debug&&ColorConsole.brightMagenta(`Пользователь ID: ${userId}`)
    // Если в комнате кто-то есть
    if (roomID > 0) {
      // Отправить сообщение всем посетителям комнаты
      io.to(roomID).emit('message', message, userId)
      try{
        UserMessageBelongChatExpress.create({chatId:roomID,userId:userId,message:message})
      }catch(e){ColorConsole.red(e)}
    }
  })

  // Отслеживание отключения пользователя
  socket.on('disconnect', () => {
    debug&&ColorConsole.red('Пользователь отключен.')
  })

  // Отслеживание подключения к определенной комнате
  socket.on('JoinRoom', (roomID) => {
    debug&&ColorConsole.bgCyan(' Подключение к комнате: ' + `${roomID} `)
    socket.join(roomID)
  })
})
