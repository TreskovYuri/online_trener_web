'use client'
import { useEffect, useState, useRef } from 'react'
import css from './OneChatWind.module.css'
import { io } from 'socket.io-client'
import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import { Send } from 'lucide-react'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'

const OneChatWind = observer(() => {
  const [socket, setSocket] = useState(undefined)
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState('')

  const inboxRef = useRef(inbox)
  
  useEffect(() => {
    if(mobx.currentChatID){
      const roomID = mobx.currentChatID
      // Инициализация вебсокета
      const socket = io(`${process.env.NEXT_PUBLIC_STATIC_WEB_SOCKET}`)
      // Подключение к комнате
      socket.emit('JoinRoom',roomID)
      // Отслеживание новых сообщений и пополнение массива
      socket.on('message', (message) => {
        // Update inboxRef.current before updating state
        inboxRef.current = [...inboxRef.current, message]
        setInbox(inboxRef.current)
      })
      
      setSocket(socket)


      
      // Отключение при размонтировании компонента
      return () => {
        socket.disconnect()
      }
    }
  }, [mobx.currentChatID])

  const handleSendMessage = () => {
    const roomID = mobx.currentChatID
    if (message.trim() !== '') {
      socket?.emit('message', message,roomID )
      setMessage('')
    }
  }

  if(mobx.currentChatID) return (
    <div className={css.container}>
      {
        inbox.map((msg, index) => <_Message key={index} message={msg} />)
      }
      <div className={css.inputBox}>
        <RigthModalInput input={message} setInput={setMessage} placeholder={'Сообщение'} className={css.input} isIcon={false} />
        <div className={css.sendBox} onClick={handleSendMessage}><Send className={css.send} /></div>
      </div>
    </div>
  )
})

export default OneChatWind

const _Message = ({ message }) => {
  return (
    <div className={css.messageCard}>
      <span className={css.message}>{message}</span>
    </div>
  )
}
