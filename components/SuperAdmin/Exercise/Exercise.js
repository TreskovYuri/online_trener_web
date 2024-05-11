'use client'
import React, { useEffect } from 'react'
import css from './Exercise.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import { motion } from 'framer-motion'
import video from './video.png'
import Image from 'next/image'
import TrainingUtills from '@/http/TrainingUtills'
import favirite from '../AddExercise/img/favorite.svg'

const Exercise = observer(({ currentStage, currentMuscleGroup,currentEquipment }) => {

  useEffect(() => {
    TrainingUtills.getExercise()
  }, [])





  return (
    <div className={css.container}>
      <div className={css.cardContainer}>
        {mobx.exercisesSearch &&
          mobx.exercisesSearch.filter(
            e => JSON.parse(e.stage)?.includes(currentStage) || currentStage == 'Все')?.filter(
            e => JSON.parse(e.musclegroups).includes(currentMuscleGroup) || currentMuscleGroup == 'Все').filter(
            e => JSON.parse(e.equipment).includes(currentEquipment) || currentEquipment =="Все"
            ).map(
            (card, index) => (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={card.id} className={css.card} onClick={() => { mobx.setonEExercise(card); mobx.setExerciseDetails(true) }}>
              <div className={css.hraderContainer}>
                <h2 className={css.cardName}>{card.nameRu}<span>/ {card.nameEng}</span></h2>
                <div className={css.favoriteContainer}>
                  <Image about='wasd' src={favirite} className={css.img} />
                </div>
              </div>
              <div className={css.stageContainer}>
                {
                  card.stage &&
                  JSON.parse(card.stage)?.map(stage => (
                    <div className={css.stage} key={stage}>{stage}</div>
                  ))
                }
              </div>
              <span className={css.label}>Описание</span>
              <span className={css.description}>{TextWrang(card.descriptionRu)}</span>
              <span className={css.label}>Сняряжение</span>
              <div className={css.equipmentContainer}>
                {
                  JSON.parse(card.equipment)?.length > 0 ?
                    JSON.parse(card.equipment)?.map(equipment => (
                      <div className={css.equipment} key={equipment}>{equipment}</div>
                    ))
                    :
                    <div className={css.equipment} >Без снаряжения</div>
                }
              </div>

            </motion.div>
          ))
        }
      </div>
    </div>
  )
})

export default Exercise





function TextWrang(text) {
  if (text && text?.length <= 135) {
    return text;
  } else if (text) {
    return text?.slice(0, 135) + "..";
  } else return ''
}