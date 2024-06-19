import { observer } from 'mobx-react-lite'
import css from './ChatsSideBard.module.css'
import mobx from '@/mobx/mobx'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'
import ChatCardImage from '@/components/widgets/ChatCardImage/ChatCardImage'
import ChatCardName from '@/components/widgets/ChatCardName/ChatCardName'
import { MessageSquarePlus } from 'lucide-react'
import GradientCircle from '@/components/widgets/GradientCircle/GradientCircle'

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
  const unRead = dialog.unRead
  console.log(users)
  return(
    <OpacityDiv duration={0.6} className={`${css.dialogCard} ${mobx.currentChat.chat?.id === chat.id ? css.activeDialog:''}`} onClick={()=>mobx.setCurrentChat(dialog)}>
        <div className={css.img}><ChatCardImage users={users}/> </div>
        <div className={css.textContainer}>
          <ChatCardName chat={chat} users={users}/>
          <span className={css.lastMessage}>{lastMessage?.message || ''}</span>
        </div>
        {unRead>0 && <div className={css.notification}><GradientCircle text={unRead} /></div>}
    </OpacityDiv>
  )
})




// Заглушка, если чатов нет
const _NotFoundChats = () =>{
  return <span className={css.notFound}>
    <MessageSquarePlus className={css.notFoundChatSvg}/>
    Создайте новый чат.
    </span>
}