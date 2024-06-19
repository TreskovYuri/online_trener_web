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

const Chats = () => {
    const [modalAddChat, setModalAddChat] = useState(false)
    useEffect(() => {
        UserUtills.getUsers()
        mobx.setPageName('Чаты')
        ChatUtills.getMyChats()

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