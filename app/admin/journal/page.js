'use client'


import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './journal.module.css'
import WeekCalendar from '@/components/Journal/WeekCalendar'
import JournalUtills from '@/http/JournalUtills'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import GroupUtills from '@/http/GroupUtills'
import FixUtllls from '@/http/FixUtllls'
import TrainingDetails from '@/components/Journal/TrainingDetails'
import TestDetails from '@/components/Journal/TestDetails'
import NutritionDetails from '@/components/Journal/NutritionDetails'

const Journal = () => {
  const [trainingModal, setTrainingModal] = useState(false)
  const [testModal, setTestModal] = useState(false)
  const [nutritionModal, setNutritionModal] = useState(false)
  useEffect(() => {
    JournalUtills.getJournal()
    SportProgrammUtills.getProgramms()
    GroupUtills.getTests()
    FixUtllls.getGFixTest()
    mobx.setPageName('Журнал')
  },[])
  return (
    <div className={css.container}>
      {trainingModal&&<TrainingDetails setModal={setTrainingModal}/>}
      {testModal&&<TestDetails setModal={setTestModal}/>}
      {nutritionModal&&<NutritionDetails setModal={setNutritionModal}/>}
      <WeekCalendar setTrainingModal={setTrainingModal} setTestModal={setTestModal} setNutritionModal={setNutritionModal}/>
    </div>
  )
}

export default Journal