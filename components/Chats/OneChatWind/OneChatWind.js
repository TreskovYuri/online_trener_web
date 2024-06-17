'use client'
import { useEffect, useState, useRef } from 'react'
import css from './OneChatWind.module.css'
import { io } from 'socket.io-client'
import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import { Send } from 'lucide-react'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'


const OneChatWind = observer(() => {
  const [chat, setChat] = useState(undefined)
  
  useEffect(()=>{
    setChat(mobx.currentChat)
  }, [mobx.currentChat])
  
  if(chat) return (<_Wind key={chat.chat} chat={chat}/>)
})

export default OneChatWind


const _Wind = ({ chat }) => {
  const roomID = chat.id
  const [socket, setSocket] = useState(undefined)
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState('')

  const inboxRef = useRef(inbox)

  useEffect(() => {
    if(roomID) {
      // Reset the inbox state when roomID changes
      setInbox([])
      inboxRef.current = []

      // Инициализация вебсокета
      const socket = io(`${process.env.NEXT_PUBLIC_STATIC_WEB_SOCKET}`)
      setSocket(socket)

      // Подключение к комнате
      socket.emit('JoinRoom', roomID)

      // Отслеживание новых сообщений и пополнение массива
      socket.on('message', (message) => {
        inboxRef.current = [...inboxRef.current, message]
        setInbox([...inboxRef.current])
      })

      // Отключение при размонтировании компонента
      return () => {
        socket.disconnect()
      }
    }
  }, [roomID])

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket?.emit('message', message, roomID)
      setMessage('')
    }
  }

  if(roomID) return (
    <OpacityDiv className={css.container}>
      {
        inbox.map((msg, index) => <_Message key={index} message={msg} />)
      }
      <div className={css.inputBox}>
        <RigthModalInput input={message} setInput={setMessage} placeholder={'Сообщение'} className={css.input} isIcon={false} />
        <div className={css.sendBox} onClick={handleSendMessage}><Send className={css.send} /></div>
      </div>
    </OpacityDiv>
  )
}


const _Message = ({ message }) => {
  return (
    <div className={css.messageCard}>
      <span className={css.message}>{message}</span>
    </div>
  )
}
