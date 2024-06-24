'use client'
import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './addtrainingpattern.module.css'
import { useEffect, useState } from 'react'
import AddStage from '@/components/Training/AddPatern/AddStage/AddStage'
import mobx from '@/mobx/mobx'
import StageSection from './StageSection/StageSection'
import AddExercise from '@/components/Training/AddPatern/AddExercise/AddExercise'


const page = () => {
  const [addStage, setAddStage] = useState(false)
  const [addExercise, setAddExercise] = useState(false)
  const [stages, setStages] = useState([{'title':''}])
  const [currentStage, setCurrentStage] = useState('')
  useEffect(()=>{
    mobx.setPageName('Шаблон тренировки')
    
  },[])

  return (
    <div className={css.container}>
      {addStage&&<AddStage setModal={setAddStage} stages={stages} setStages={setStages}/>}
      {addExercise&&<AddExercise setModal={setAddExercise} currentStage={currentStage}/>}
      {!stages[0].title&&<div className={css.navBar}><HeaderAddButton callback={()=>setAddStage(!addStage)}  text={'Добавить этапы'}/></div>}
      {stages.map(stage => <StageSection stage={stage} callback={()=>{setAddExercise(true)}}/>)}
    </div>
  )
}

export default page


