import mobx from '@/mobx/mobx'
import css from './ChatCardName.module.css'

const ChatCardName = ({chat,users}) => {
  if(users.length>2){
    return (
      <div className={css.container}>{chat.name}</div>
    )
  }else{
    const apponent = users.find(user => user.id != mobx.user.id)
    return (
      <div className={css.container}>{apponent?.name}</div>
    )
  }
  
}

export default ChatCardName