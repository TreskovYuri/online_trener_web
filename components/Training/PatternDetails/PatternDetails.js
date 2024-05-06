'use client'
import mobx from '@/mobx/mobx'
import css from './PatternDetails.module.css'
import {motion} from 'framer-motion'
import favorite from './img/favorite.svg'
import plus from './img/plus.svg'
import Image from 'next/image'
import { useEffect } from 'react'
import { observer } from 'mobx-react-lite'





const PatternDetails = observer(() => {


  useEffect(() => {
    // console.log(mobx.OneTrainingPattern.id)
    // console.log(mobx.trainingBelongs)
  },[])


  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setTrainongDetails(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>{mobx.OneTrainingPattern.name}</h2>
                 <div className={css.btnRow}>
                    <div className={css.btn}>
                        <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                    <div className={css.btn} onClick={()=> {mobx.setUpdateTrainingPattern(true);mobx.setTrainongDetails(false)}}>
                        <Image src={plus} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                 </div>

            </div>
            <span className={css.label}>Упражнения</span>

            
            <div className={css.trainingsContainer}>
              {
                mobx.trainingBelongs.map(belong => (
                  belong.programmId == mobx.OneTrainingPattern.id &&
                  <div className={css.trainingCard}>
                      <span className={css.cardHeader}>{mobx.exercises.find(obj => obj.id == belong.exerciseId)?.nameRu}<span> / {mobx.exercises.find(obj => obj.id == belong.exerciseId)?.nameEng}</span></span>
                      {/* <span className={css.cardTypes}>Продолжительность: {belong.timing}</span>
                      <span className={css.cardTypes}>Сеты: {belong.sets}</span> */}
                  </div>
                ))
              }
              {
                mobx.testBelongs.map(belong => (
                  belong.programmId == mobx.OneTrainingPattern.id &&
                  <div className={css.trainingCard}>
                      <span className={css.cardHeader}>{mobx.tests.find(obj => obj.id == belong.testId)?.name}</span>
                      {/* <span className={css.cardTypes}>Продолжительность: {belong.timing}</span>
                      <span className={css.cardTypes}>Сеты: {belong.sets}</span> */}
                  </div>
                ))
              }
            </div>
        </motion.div>
    </motion.div>
  )
})

export default PatternDetails