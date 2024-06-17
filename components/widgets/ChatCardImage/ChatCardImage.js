import mobx from '@/mobx/mobx'
import React from 'react'
import UserIconImage from '../UserIconImage/UserIconImage'

const ChatCardImage = ({users}) => {
  if(users.length>2){
    return (
      <div style={{height:"100%",width:'100%',flexWrap:'wrap',display:'flex',gap:'.1vw',alignItems:'center',justifyContent:'center'}}>
        {
        users.slice(0,4).map(user => <div style={{height:'40%',width:'40%'}}><UserIconImage user={user}/></div>)
        }</div>
    )
  }else{
    const apponent = users.find(user => user.id != mobx.user.id)
    return (
      <div style={{height:"100%",width:'100%'}}><UserIconImage user={apponent}/></div>
    )
  }

}

export default ChatCardImage

