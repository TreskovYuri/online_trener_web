'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect } from 'react'
import css from './nutrition.module.css'
import Popular from '@/components/Training/Popular/Popular';
import Image from 'next/image';
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import AddPatern from '@/components/Training/AddPatern/AddPatern';
import PatternDetails from '@/components/Training/PatternDetails/PatternDetails';
import UpdatePatern from '@/components/Training/UpdatePatern/UpdatePatern';
import {motion} from 'framer-motion'
import Sportsmans from '@/components/Sportsmans/Sportsmans';


const page = observer(() => {
  useEffect(() => {
    mobx.setPageName('Спортсмены')
  })
  return (
<>
{mobx.updateTrainingPattern&&<UpdatePatern/>}
{mobx.addPattern&&<AddPatern/>}
{mobx.trainongDetails&&<PatternDetails/>}
<div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=> mobx.setAddUser(true)}><span>+</span>Добавить пользователя</div>
          <div className={css.btn}>
            <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
          </div>
          <div className={css.btn}>
            <Image src={search} alt='Онлайн-Тренер' className={css.img}/>
          </div>
      </motion.div>
      <Sportsmans/>
    </div>
</>

  )
})

export default page