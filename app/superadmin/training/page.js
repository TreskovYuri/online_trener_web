'use client'
import Exercise from '@/components/SuperAdmin/Exercise/Exercise'
import React, { useEffect } from 'react'
import css from './traininf.module.css'
import mobx from '@/mobx/mobx'

import Image from 'next/image'
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import AddExercise from '@/components/SuperAdmin/AddExercise/AddExercise'
import { observer } from 'mobx-react-lite'
import ExerciseDetails from '@/components/SuperAdmin/Exercise/ExerciseDetails/ExerciseDetails'
import UpdateExercise from '@/components/SuperAdmin/Exercise/UpdateExercise/UpdateExercise'

const page = observer(() => {


  useEffect(()=>{
    mobx.setPageName('Упражнения')
  },[])
  return (
<>
{mobx.addExercise&&<AddExercise/>}
{mobx.updateExercise&&<UpdateExercise/>}
{mobx.exerciseDetails&&<ExerciseDetails/>}
<div className={css.container}>
      <div  viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=>mobx.setAddExercise(true)}><span>+</span>Добавить упражнение</div>
          <div className={css.btn}>
            <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
          </div>
          <div className={css.btn}>
            <Image src={search} alt='Онлайн-Тренер' className={css.img}/>
          </div>
      </div>
      <Exercise/>
    </div>
</>
  )
})

export default page