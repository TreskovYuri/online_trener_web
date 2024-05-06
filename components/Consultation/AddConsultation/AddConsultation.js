'use client'
import mobx from '@/mobx/mobx'
import css from './AddConsultation.module.css'
import {motion} from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ErrorHandler } from '@/utils/ErrorHandler'
import PatternUtills from '@/http/PatternUtills'
import searchImg from './img/search.svg'
import UserUtills from '@/http/UserUtills'
import { observer } from 'mobx-react-lite'
import calculateAge from '@/utils/utills'
import dat from './img/dat.svg'
import ConsultationUtills from '@/http/ConsultationUtills'

const AddConsultation = observer(() => {
  const [name, setName] = useState('')
  const [comment, setComment] = useState('')
  const [dateTime, setDateTime] = useState('')
  const [search, setSearch] = useState('')
  const [usersFinal, setUsersFinal] = useState([])


  useEffect(()=>{
    UserUtills.getUsers()
  },[])



  const save = async() => {
    if(!name || !dateTime){
      ErrorHandler('Заполните обязательные поля!')
      return
    }
    const users = usersFinal.map(user => user.id)
    const formData = new FormData();
    name ? formData.append('name', name) : formData.append('name', 111)
    dateTime ? formData.append('date', dateTime) : formData.append('date', 111)
    usersFinal ? formData.append('users', users) : formData.append('users', 111)
    const data = await ConsultationUtills.create(formData)
    if(data === 'ok'){
      mobx.setAddConsultation(false)
    }
  }


  const addUserHandler = (user) => {
    if(usersFinal && usersFinal.some(obj=> obj.id === user.id)){
      setUsersFinal(usersFinal.filter(obj => obj.id !== user.id))
    }else{
      setUsersFinal([...usersFinal,user])
    }
  }


  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setAddConsultation(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>Назначить консультацию</h2>
            </div>
            <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name} onChange={e => setName(e.target.value)} />
            <span className={css.label}>Дата и время</span>
            <input type='datetime-local' className={`${css.input} ${css.name}`}   id="password" value={dateTime} onChange={e => setDateTime(e.target.value)} />
            <span className={css.label}>Добавьте комментарий (опционально)</span>
            <input type='text' className={`${css.input} ${css.name}`} placeholder='Комментарий'  id="password" value={comment} onChange={e => setComment(e.target.value)} />
            <div className={css.headerContainer}>
                 <h2 className={css.header}>Добавьте участников</h2>

            </div>
            <div className={css.usersContainer}>
              {!usersFinal.length>0&&<span className={css.placeholder}>Выберите кого бы вы хотели пригласить</span>}
              {usersFinal.map(user => (
                    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.userCard1}>
                      <div className={css.row}>
                        <div className={css.imgContainer}>
                          <Image className={css.cardImg1} src={user.img?`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${user.img}`:``} unoptimized width={30} height={30}/>
                        </div>
                        <div className={css.textContainer}>
                          <span className={css.cardName}>{user.name}</span>
                          <div className={css.card1Row}>
                            {calculateAge(user.date)}г
                            <Image src={dat} alt='Онлайн-тренер' className={css.dat} style={{visibility:user.height?`visible`:`hidden`}}/>
                            {user.height?`${user.height} см`:``}
                            <Image src={dat} alt='Онлайн-тренер' className={css.dat} style={{visibility:user.height?`visible`:`hidden`}}/>
                            {user.height?`${user.width} кг`:``}
                          </div>
                        </div>
                      </div>
                      <div className={css.typeContainer}>
                        <span className={css.type}>{user.post}</span>
                        <span className={css.type}>{user.team}</span>
                      </div>
                      </motion.div>
                  ))}
            </div>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.searchContainer}>
              <Image src={searchImg} className={css.search} alt='Онлайн-Тренер'/>
              <input  placeholder='Найти...' type='text' className={css.inputSearch} value={search} onChange={e => setSearch(e.target.value)}/>
            </motion.div>
            <div className={css.allUsersContainer}>
                {mobx.users.length>0&&
                  mobx.users.map(user => (
                    <div className={css.userCard}>
                      <div className={usersFinal.some(obj=> obj.id === user.id)?`${css.checkBox} ${css.checkBoxActive}`:`${css.checkBox}`} onClick={()=>addUserHandler(user)}></div>
                      <Image className={css.cardImg} src={user.img?`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${user.img}`:``} unoptimized width={30} height={30}/>
                      <span className={css.cardName}>{user.name?.split(' ')[1]} {user.name?.split(' ')[0]}</span>
                      </div>
                  ))
                }
            </div>
            <div className={css.btnSave} onClick={save}>Назначить консультацию</div>

        </motion.div>
    </motion.div>
  )
})

export default AddConsultation  
















