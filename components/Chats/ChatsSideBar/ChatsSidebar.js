import { observer } from 'mobx-react-lite'
import css from './ChatsSideBard.module.css'
import mobx from '@/mobx/mobx'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'
import ChatCardImage from '@/components/widgets/ChatCardImage/ChatCardImage'
import ChatCardName from '@/components/widgets/ChatCardName/ChatCardName'

const ChatsSidebar = observer(() => {
  const chats = mobx.chats
  return (
    <div className={css.container}>
      {
        chats.length ? <_ChatsList chats={chats}/> : <_NotFoundChats />
      }
      
    </div>
  )
})

export default ChatsSidebar



const _ChatsList = observer(({chats}) => {
  
  return (
    <div className={css.chatsList}>
      {chats.map(dialog => <_DialogCard dialog={dialog} />)}
    </div>
  )
})


const _DialogCard = observer(({dialog}) => {
  const chat = dialog.chat
  const users = dialog.users
  const lastMessage = dialog.lastMessage
  console.log(users)
  return(
    <OpacityDiv className={`${css.dialogCard} ${mobx.currentChat.chat?.id === chat.id ? css.activeDialog:''}`} onClick={()=>mobx.setCurrentChat(dialog)}>
        <div className={css.img}><ChatCardImage users={users}/> </div>
        <div className={css.textContainer}>
          <ChatCardName chat={chat} users={users}/>
          <span className={css.lastMessage}>{lastMessage?.message || ''}</span>
          </div>
    </OpacityDiv>
  )
})




// Заглушка, если чатов нет
const _NotFoundChats = () =>{
  return <span className={css.notFound}>У вас пока нет чатов.</span>
}