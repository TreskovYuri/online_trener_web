'use client'
import { observer } from 'mobx-react-lite'
import css from './Header.module.css'
import mobx from '@/mobx/mobx'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Image from 'next/image'
import user from './img/user.jpg'
import searchImg from './img/search.svg'
import Link from 'next/link'
import {motion} from 'framer-motion'

const Header = observer(() => {
  const router = useRouter()
  const [search, setSearch] = useState('')
  return (
    <div className={css.container}>
    <div className={css.container1}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.exit} onClick={()=>router.back()}>{'< Назад'}</motion.div>
      <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.header}>{mobx.pageName||'Панель администратора'}</motion.h1>
    </div>
    <div className={css.container2}>

      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.profileontainer}>
        <Link href={'/admin/profile'}>
        {mobx.user.img?
          <Image src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${mobx.user.img}`} width={70} height={70} unoptimized className={css.userImg} alt='Онлайн-Тренер'/>:
          <Image src={user} width={10} height={10} unoptimized className={css.userImg} alt='Онлайн-Тренер'/>
        }
        </Link>

        <div className={css.descrContainer}>
          {mobx.user.name ?
            <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.Username}>{`${mobx.user.name.split(' ')[0]} ${mobx.user.name.split(' ')[1].charAt(0)}.${mobx.user.name.split(' ')[2].charAt(0)}.`}</motion.h2>:
            <motion.h2 initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.Username}>Нет данных</motion.h2>
          }
          <div className={css.row}>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.posts}>{mobx.user.post}</motion.div>
            <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.posts}>{mobx.user.team}</motion.div>
          </div>
        </div>
      </motion.div>
    </div>

      <span className={css.border}></span>
    </div>
  )
})

export default Header
