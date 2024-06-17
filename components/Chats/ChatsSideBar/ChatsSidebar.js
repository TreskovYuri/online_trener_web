import { observer } from 'mobx-react-lite'
import css from './ChatsSideBard.module.css'
import mobx from '@/mobx/mobx'

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
    <div>
      {chats.map(dialog => <_DialogCard dialog={dialog} />)}
    </div>
  )
})


const _DialogCard = ({dialog}) => {
  return(
    <div className={css.dialogCard}>
        <span>{dialog.name}</span>
    </div>
  )
}




// Заглушка, если чатов нет
const _NotFoundChats = () =>{
  return <span className={css.notFound}>У вас пока нет чатов.</span>
}