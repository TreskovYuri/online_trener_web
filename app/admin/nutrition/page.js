'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect } from 'react'
import css from './nutrition.module.css'
import Popular from '@/components/Nutrition/Popular/Popular';
import Image from 'next/image';
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import AddPatern from '@/components/Nutrition/AddPatern/AddPatern';
import PatternDetails from '@/components/Nutrition/PatternDetails/PatternDetails';
import UpdatePatern from '@/components/Nutrition/UpdatePatern/UpdatePatern';
import {motion} from 'framer-motion'


const page = observer(() => {
  useEffect(() => {
    mobx.setPageName('Шаблоны питания')
  })
  return (
<>
{mobx.addPattern&&<AddPatern/>}
{mobx.updatePattern&&<UpdatePatern/>}
{mobx.patternDetails&&<PatternDetails/>}
<div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=> mobx.setAddPattern(true)}><span>+</span>Создать шаблон</div>
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