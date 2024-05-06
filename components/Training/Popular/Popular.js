'use client'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'
import TrainingUtills from '@/http/TrainingUtills'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import GroupUtills from '@/http/GroupUtills'

const Popular = observer(() => {

  useEffect(()=>{
    TrainingUtills.getTrainingPattern()
    TrainingUtills.getTrainingBelongs()
    TrainingUtills.getExercise()
    TrainingUtills.getTestTrainingPatternBelongs()
    GroupUtills.getTests()
  },[])

  const pluralize = (number, one, two, five) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return one;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return two;
    } else {
        return five;
    }
};

const countHandler = (id) => {
    let count = 0;
    mobx.trainingBelongs.forEach(belong => {
      if(belong.programmId == id){
        count++
      }
    })
    return `${count} ${pluralize(count, 'упражнение', 'упражнения', 'упражнений')}`;
};


  return (
    <div className={css.container}>
        <h2 className={css.header}>Популярное</h2>
        <div className={css.cardContainer}>
            {mobx.trainingPatternsSearch&&
              mobx.trainingPatternsSearch.map((card,index) => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {mobx.setOneTrainingPattern(card);mobx.setTrainongDetails(true)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.count}>
                      {countHandler(card.id)} 
                    </span>
                    {/* <span className={css.descrHeader}>Описание</span>
                    <span className={css.description}>{card.description}</span> */}
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular