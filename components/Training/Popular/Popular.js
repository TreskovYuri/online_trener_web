'use client'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'
import TrainingUtills from '@/http/TrainingUtills'
import { TrainingExerciseCount } from '@/utils/TrainingExerciseCount'

const Popular = observer(() => {

  useEffect(()=>{
    TrainingUtills.getTrainingPattern()
  },[])





  return (
    <div className={css.container}>
        <h2 className={css.header}>Популярное</h2>
        <div className={css.cardContainer}>
            {mobx.trainingPatternsSearch&&
              mobx.trainingPatternsSearch.map((card,index) => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {mobx.setOneTrainingPattern(card);mobx.setTrainongDetails(true)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.count}>
                      {TrainingExerciseCount(card)} 
                    </span>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular