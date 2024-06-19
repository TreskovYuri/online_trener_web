'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './chats.module.css'
import ChatsSidebar from '@/components/Chats/ChatsSideBar/ChatsSidebar'
import OneChatWind from '@/components/Chats/OneChatWind/OneChatWind'
import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import AddChat from '@/components/Chats/AddChat/AddChat'
import UserUtills from '@/http/UserUtills'
import ChatUtills from '@/http/ChatUtills'
import { io } from "socket.io-client";

const Chats = () => {
    const [modalAddChat, setModalAddChat] = useState(false)
    useEffect(() => {
        UserUtills.getUsers()
        mobx.setPageName('Чаты')
        ChatUtills.getMyChats()
        const socket = io(`${process.env.NEXT_PUBLIC_STATIC_WEB_SOCKET}`);

socket.on('connect', () => {
    const userId = mobx.user.id
    socket.emit('registerUser', userId);
});

// Listen for new message notifications
socket.on('newMessageNotification', (data) => {
    console.log('New message notification:', data);
    alert('У вас новое  сообщение!')
    // Handle the notification (e.g., show a popup, update the UI)
});
      },[])
  return (
    <div className={css.container}>
        {modalAddChat&&<AddChat setModal={setModalAddChat}/>}
        <div className={css.sidebar}>
            <h4 className={css.header}>Все чаты</h4>
            <ChatsSidebar />
        </div>
        <div className={css.chatWind}>
            <HeaderAddButton callback={()=>setModalAddChat(true)} text={'Создать чат'}/>
            <OneChatWind />
        </div>
    </div>
  )
}

export default Chats