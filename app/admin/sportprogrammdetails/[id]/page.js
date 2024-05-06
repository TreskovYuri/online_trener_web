'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './AddProgramm.module.css'
import { observer } from 'mobx-react-lite';
import ConsultationUtills from '@/http/ConsultationUtills';
import WeekCalendar from '@/components/SportProgramm/Details/WeekCalendar/WeekCalendar';
import SportProgrammUtills from '@/http/SportProgrammUtills';
import PatternUtills from '@/http/PatternUtills';
import TrainingUtills from '@/http/TrainingUtills';
import GroupUtills from '@/http/GroupUtills';
import UserUtills from '@/http/UserUtills';


export const dynamic = 'force-dynamic'


const page = observer(({params}) => {

  useEffect(() => {
    mobx.setPageName('Спортивная программа')

    SportProgrammUtills.getOneProgramm(params.id)
    SportProgrammUtills.getExersicesById(params.id)
    SportProgrammUtills.getNutritionsById(params.id)
    SportProgrammUtills.getTestsById(params.id)
    SportProgrammUtills.getUsersById(params.id)
    PatternUtills.getAllNutrition()
    TrainingUtills.getExercise()
    GroupUtills.getTests()
    UserUtills.getSportsmans()
    
    return ()=>{
      mobx.setSportprogrammUsers([])
      mobx.setSportprogrammNutritions([])
      mobx.setSportprogrammTests([])
      mobx.setSportprogrammExersices([])
      mobx.setOneSprotProgramm([])
    }
  },[])

  useEffect(()=>{
    mobx.setPageName(mobx.oneSprotProgramm.name)
  },[mobx.oneSprotProgramm])



  return (
<>
<div className={css.container}>
    <WeekCalendar id={params.id}/>
</div>
</>

  )
})

export default page