import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './AddChat.module.css'
import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import { useEffect, useState } from 'react'
import RigthModalInputCurrentItem from '@/components/widgets/MODALS/RigthModalInputCurrentItem/RigthModalInputCurrentItem'
import UserIconsRow from '@/components/widgets/UserIconsRow/UserIconsRow'
import FillBacgroundInput from '@/components/widgets/INPUTS/FillBacgroundInput/FillBacgroundInput'
import SizedBox from '@/components/widgets/SizedBox/SizedBox'
import UserScrollList from '@/components/widgets/UserScrollList/UserScrollList'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import ChatHandlers from '../ChatHandlers'

const AddChat = observer(({setModal}) => {
    const [name,setName] = useState('')
    const itemsList = ['Все участники',"Только я"]
    const [messageOnlyI, setMessageOnlyI] = useState(false)
    const [currentUsers, setCurrentUsers] = useState([])
    const [searchUsers, setSearchUsers] = useState([])
    const [serchText, setSearchText] = useState('')

    useEffect(()=>{
        if(mobx.users)setSearchUsers(mobx.users.filter(el => el.id != mobx.user.id))
    },[mobx.users])



    
  return (
    <RigthModalWind setModal={setModal}>
        <div className={css.container}>
            <h2 className={css.header}>Создание чата</h2>
            <RigthModalInput  placwholder={'Название чата'} input={name} setInput={setName}/>
            <span className={css.label}>Кто может отправлять сообщения</span>
            <RigthModalInputCurrentItem item={messageOnlyI?itemsList[1]:itemsList[0]} list={itemsList} setItem={(e)=>ChatHandlers.inputClickHandler({item:e, setMessageOnlyI:setMessageOnlyI})}/>
            <span className={css.bigLabel}>Добавьте участников</span>
            <UserIconsRow users={currentUsers} />
            <SizedBox heigth={1}/>
            <FillBacgroundInput value={serchText} setValue={(e)=>{
                setSearchText(e);
                ChatHandlers.handleSearch({setSearchUsers:setSearchUsers,text:e})
            }}/>
            <SizedBox heigth={1}/>
            <UserScrollList users={searchUsers} currentUsers={currentUsers} setCurrentUsers={(e)=>ChatHandlers.handleCurrentUser({currentUsers:currentUsers,setCurrentUsers:setCurrentUsers,user:e})}/>
            <div className={css.btn}><GradientButtonOval callback={()=>ChatHandlers.create({currentUsers:currentUsers,messageOnlyI:messageOnlyI,name:name,close:()=>setModal(false)})} text={'Создать чат'}/></div>
        </div>
    </RigthModalWind>
  )
})

export default AddChat