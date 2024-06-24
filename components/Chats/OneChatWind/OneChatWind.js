'use client'
import { useEffect, useState, useRef } from 'react'
import css from './OneChatWind.module.css'
import { io } from 'socket.io-client'
import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import { MessageCircleReply, Mic, Paperclip, Phone, Send, SendHorizontal, Settings, Video } from 'lucide-react'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'
import ChatUtills from '@/http/ChatUtills'
import ChatCardImage from '@/components/widgets/ChatCardImage/ChatCardImage'
import ChatCardName from '@/components/widgets/ChatCardName/ChatCardName'
import { ErrorHandler } from '@/utils/ErrorHandler'
import  { format }from "date-fns";


const OneChatWind = observer(() => {
  const [chat, setChat] = useState(undefined)
  
  useEffect(()=>{
    setChat(mobx.currentChat)
  }, [mobx.currentChat])
  
  if(chat?.chat){return (<_Wind key={chat.chat} chat={chat}/>)}else{if(mobx.chats.length)return <_NotFoundWind />}
})

export default OneChatWind


const _Wind = observer(({ chat }) => {
  const roomID = parseInt(chat?.chat?.id)
  const users = chat?.users
  
  const [socket, setSocket] = useState(undefined)
  const [inbox, setInbox] = useState([])
  const [message, setMessage] = useState('')
  const WindRef = useRef(null)

  const inboxRef = useRef(inbox)

  useEffect(() => {
    
    if(roomID) {
      ChatUtills.getMessageByChat(roomID)
      ChatUtills.readMessageByChatId(roomID)
      // Reset the inbox state when roomID changes
      setInbox([])
      inboxRef.current = []
      scrollToBottom()
      // Инициализация вебсокета
      const socket = io(`${process.env.NEXT_PUBLIC_STATIC_WEB_SOCKET}`)
      setSocket(socket)

      // Подключение к комнате
      socket.emit('JoinRoom', parseInt(roomID))

      // Отслеживание новых сообщений и пополнение массива
      socket.on('message', (data) => {
        setInbox((prev) => [...prev, {'userId': data.userId, 'message': data.message, 'createdAt': new Date()}])
        const ccc = mobx.chats.find(ct => ct.chat?.id == roomID)
        ccc.lastMessage = {userId:data.userId, message:data.message}
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
      socket?.emit('message', {
        'message':message, 
        'roomID':roomID, 
        'userId':mobx.user.id
      })
      setMessage('')
    }else{ErrorHandler('Нельзя отправить пустое сообщение!')}
  }
  console.log(mobx.currentChat)
  if(roomID) return (
    <OpacityDiv className={css.container}>
      <div className={css.windHeader}>
        <OpacityDiv className={css.windImg}><ChatCardImage users={users}/> </OpacityDiv>
        <OpacityDiv className={css.textContainer}>
          <ChatCardName chat={chat} users={users}/>
        </OpacityDiv>
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
      <OpacityDiv className={css.inputBox}>
        <UploadField 
        onFiles={file => console.log(file)}
        uploadProps={{accept:'.jpg,.jpeg,.png,.gif'}}
        >
          <OpacityDiv duration={1} className={css.sendBox} onClick={()=>{}}><Paperclip className={css.mic} /></OpacityDiv>
        </UploadField>
      
        <RigthModalInput input={message} setInput={setMessage} placeholder={'Сообщение'} className={css.input} isIcon={false} onSubmit={handleSendMessage}/>
        {message.length ?
        <OpacityDiv duration={1} className={css.sendBox} onClick={handleSendMessage}><SendHorizontal className={css.send} /></OpacityDiv>:
        <OpacityDiv duration={1} className={css.sendBox} onClick={()=>{}}><Mic className={css.mic} /></OpacityDiv>
        }
      </OpacityDiv>
    </OpacityDiv>
  )
})


const _Message = ({ message}) => {
  return (
    <div  className={ `${css.messageCard} ${message.userId == mobx.user.id?css.myMessage:''}`} >
      <OpacityDiv   className={`${css.message}  ${message.userId == mobx.user.id?css.myM:''}`}>
        {message.message}
        <div className={css.timeAgo}>{format(message.createdAt,"HH:mm")}</div>
        </OpacityDiv>
      
    </div>
  )
}



const _NotFoundWind = () => {
  return <did className={css.notFoundContainer}>
    <MessageCircleReply className={css.chatSvg} />
    Откройте диалог
    </did>
}