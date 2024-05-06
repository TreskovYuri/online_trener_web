'use client'
import { observer } from 'mobx-react-lite'
import css from './Header.module.css'
import mobx from '@/mobx/mobx'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import user from './img/user.jpg'
import searchImg from './img/search.svg'
import Link from 'next/link'
import {motion} from 'framer-motion'

const Header = observer(() => {
  const router = useRouter()
  const [search, setSearch] = useState('')


  const handleSarch = (e) => {
    setSearch(e)
    if(mobx.pageName == 'Справочники' ){
      if (e) {
        const results = mobx.exercises.filter(exercises =>
          exercises.nameRu?.toLowerCase().includes(e.toLowerCase())
        );
        const results2 = mobx.tests.filter(tests =>
          tests.name?.toLowerCase().includes(e.toLowerCase())
        );
        mobx.setExercisesSearch(results)
        mobx.setTestsSearch(results2)
      }else{
        mobx.setExercisesSearch(mobx.exercises)
        mobx.setTestsSearch(mobx.tests)

      }
    }else if (mobx.pageName == 'Тренировки' ){
      if (e) {
        const results = mobx.trainingPatterns.filter(trainingPattern =>
          trainingPattern.name?.toLowerCase().includes(e.toLowerCase())
        );
        mobx.setTrainingPatternsSearch(results)
      }else{
        mobx.setTrainingPatternsSearch(mobx.trainingPatterns)
      }
    }else if (mobx.pageName == 'Спортсмены' ){
      if (e) {
        const results = mobx.sportsmans.filter(sportsman =>
          sportsman.name?.toLowerCase().includes(e.toLowerCase())
        );
        mobx.setSportsmansSearch(results)
      }else{
        mobx.setSportsmansSearch(mobx.sportsmans)
      }
    }else if (mobx.pageName == 'Шаблоны питания' ){
      if (e) {
        const results = mobx.popularPatterns.filter(popularPattern =>
          popularPattern.name?.toLowerCase().includes(e.toLowerCase())
        );
        mobx.setPopularPatternsSearch(results)
      }else{
        mobx.setPopularPatternsSearch(mobx.popularPatterns)
      }
    }else if (mobx.pageName == 'Спортивная программа' ){
      if (e) {
        const results = mobx.sportprogramms.filter(sportprogramm =>
          sportprogramm.name?.toLowerCase().includes(e.toLowerCase())
        );
        mobx.setSportprogrammsSearch(results)
      }else{
        mobx.setSportprogrammsSearch(mobx.sportprogramms)
      }
    }
    
  }
  useEffect(()=>{
    if(mobx.pageName == 'Справочники'&& mobx.exercises){
        mobx.setExercisesSearch(mobx.exercises)
    }

  },[mobx.exercises])

  useEffect(()=>{
    if(mobx.pageName == 'Справочники' && mobx.tests){
      mobx.setTestsSearch(mobx.tests)
    }
  },[mobx.tests])

  useEffect(()=>{
    if(mobx.pageName == 'Тренировки' && mobx.trainingPatterns){
      mobx.setTrainingPatternsSearch(mobx.trainingPatterns)
    }
  },[mobx.trainingPatterns])

  useEffect(()=>{
    if(mobx.pageName == 'Спортсмены' && mobx.sportsmans){
      mobx.setSportsmansSearch(mobx.sportsmans)
    }
  },[mobx.sportsmans])

  useEffect(()=>{
    if(mobx.pageName == 'Шаблоны питания' && mobx.popularPatterns){
      mobx.setPopularPatternsSearch(mobx.popularPatterns)
    }
  },[mobx.popularPatterns])

  useEffect(()=>{
    if(mobx.pageName == 'Спортивная программа' && mobx.sportprogramms){
      mobx.setSportprogrammsSearch(mobx.sportprogramms)
    }
  },[mobx.sportprogramms])


  return (
    <div className={css.container}>
    <div className={css.container1}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.exit} onClick={()=>router.back()}>{'< Назад'}</motion.div>
      <motion.h1 initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.header}>{mobx.pageName}</motion.h1>
    </div>
    <div className={css.container2}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.searchContainer}>
        <Image src={searchImg} className={css.search} alt='Онлайн-Тренер'/>
        <input  placeholder='Найти...' type='text' className={css.input} value={search} onChange={e => handleSarch(e.target.value)}/>
      </motion.div>
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
