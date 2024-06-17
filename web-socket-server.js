
const PORT = 4000
const CLIENT_URL = 'http://localhost:3000'

const io = require('socket.io')(PORT,{
    cors:{
        origin:CLIENT_URL,
        methods:["GET","POST"],
    }
})

console.log(`Сервер запустился на ${PORT} порту...`)

// Отслеживание нового полключения
io.on('connection',(socket)=> {
    console.log('Пользователь подключен..')
    // Отслеживание входящего сообщения
    socket.on('message',(message, roomID) => {
        // Если в комнате кто то есть
        if(roomID>0){
            console.log(`Сообщение: ${message}. Комната № ${roomID}`)
            // Отправить сообщение всем посетителям комнаты
            io.to(roomID).emit('message',message)
        }
        // else{
        //     // В противном случае отправляю сообщение всем желающим
        //     io.emit('message', message)
        // }
        
    })
    // Отслеживание отключения пользователя
    socket.on('disconnected',()=>{
        console.log('Пользователь отключен.')
    })
    // Отслеживание подключения к определенной комнате
    socket.on('JoinRoom',(roomID)=>{
        console.log('Подключение к комнате: ' + `${roomID}`)
        socket.join(roomID)
    })
}) 