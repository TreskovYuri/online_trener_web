'use client'
import { useEffect, useState, useRef } from 'react'
import css from './OneChatWind.module.css'
import { io } from 'socket.io-client'
import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import { Phone, Send, Settings, Video } from 'lucide-react'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'
import ChatUtills from '@/http/ChatUtills'
import ChatCardImage from '@/components/widgets/ChatCardImage/ChatCardImage'
import ChatCardName from '@/components/widgets/ChatCardName/ChatCardName'


const OneChatWind = observer(() => {
  const [chat, setChat] = useState(undefined)
  
  useEffect(()=>{
    setChat(mobx.currentChat)
  }, [mobx.currentChat])
  
  if(chat) return (<_Wind key={chat.chat} chat={chat}/>)
})

export default OneChatWind


const _Wind = observer(({ chat }) => {
  const roomID = chat?.chat?.id
  const users = chat?.users
  
  const [socket, setSocket] = useState(undefined)
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState('')
  const WindRef = useRef(null)

  const inboxRef = useRef(inbox)

  useEffect(() => {
    if(roomID) {
      ChatUtills.getMessageByChat(roomID)
      // Reset the inbox state when roomID changes
      setInbox([])
      inboxRef.current = []
      scrollToBottom()
      // Инициализация вебсокета
      const socket = io(`${process.env.NEXT_PUBLIC_STATIC_WEB_SOCKET}`)
      setSocket(socket)

      // Подключение к комнате
      socket.emit('JoinRoom', roomID)

      // Отслеживание новых сообщений и пополнение массива
      socket.on('message', (message,userId) => {
        // inboxRef.current = [...inboxRef.current, {'userId':userId,'message':message}]
        // setInbox([...inboxRef.current])
        setInbox((prev) => [...prev, {'userId':userId,'message':message}])
        const ccc = mobx.chats.find(ct => ct.chat?.id == roomID)
        ccc.lastMessage = {userId:userId, message:message}
        mobx.setChats([...mobx.chats.filter(el => el.chat?.id != roomID), ccc])
        setTimeout(()=>{
          scrollToBottom()
        },[100])
      })

      // Отключение при размонтировании компонента
      return () => {
        socket.disconnect()
      }
    }
  }, [roomID])

  const scrollToBottom = () => {
    WindRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(()=>{
    setInbox(mobx.messages)
    setTimeout(()=>{
      scrollToBottom()
    },[100])
  },[mobx.messages])


  const handleSendMessage = () => {
    if (message.trim() !== '') {
      socket?.emit('message', message, roomID, mobx.user.id)
      setMessage('')
    }
  }
  console.log(mobx.currentChat)
  if(roomID) return (
    <div className={css.container}>
      <div className={css.windHeader}>
        <div className={css.windImg}><ChatCardImage users={users}/> </div>
        <div className={css.textContainer}>
          <ChatCardName chat={chat} users={users}/>
        </div>
        <div className={css.iconContainer}>
        <Phone  className={css.icon}/>
        <Video  className={css.icon}/>
        <Settings  className={css.icon}/>
        </div>
      </div>
      <div className={css.scrollBox}>
      {
        inbox.map((msg, index) => <_Message  key={index} message={msg} />)
      }
      <div ref={WindRef} className={css.endRef}></div>
      </div>
      <div className={css.inputBox}>
        <RigthModalInput input={message} setInput={setMessage} placeholder={'Сообщение'} className={css.input} isIcon={false} />
        <div className={css.sendBox} onClick={handleSendMessage}><Send className={css.send} /></div>
      </div>
    </div>
  )
})


const _Message = ({ message}) => {
  return (
    <div  className={ `${css.messageCard} ${message.userId == mobx.user.id?css.myMessage:''}`} >
      <span   className={css.message}>{message.message}</span>
    </div>
  )
}
