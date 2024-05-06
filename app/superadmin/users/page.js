'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect } from 'react'
import css from './nutrition.module.css'
import Popular from '@/components/SuperAdmin/Users/Popular/Popular';
import Image from 'next/image';
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import {motion} from 'framer-motion'
import UpdateUser from '@/components/SuperAdmin/Users/UpdateUser/UpdateUser';
import AddUser from '@/components/SuperAdmin/Users/addUser/addUser';


const page = observer(() => {
  useEffect(() => {
    mobx.setPageName('Пользователи')
  })
  return (
<>
{mobx.updateUser && <UpdateUser/>}
{mobx.addUser && <AddUser/>}
<div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=> mobx.setAddUser(true)}><span>+</span>Зарегистрировать пользователя</div>
          <div className={css.btn}>
            <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
          </div>
          <div className={css.btn}>
            <Image src={search} alt='Онлайн-Тренер' className={css.img}/>
          </div>
      </motion.div>
      <Popular/>
    </div>
</>

  )
})

export default page