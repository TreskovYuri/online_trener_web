'use client'
import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './addtrainingpattern.module.css'
import { useEffect, useState } from 'react'
import AddStage from '@/components/Training/AddPatern/AddStage/AddStage'
import mobx from '@/mobx/mobx'
import StageSection from './StageSection/StageSection'
import AddExercise from '@/components/Training/AddPatern/AddExercise/AddExercise'
import TrainingUtills from '@/http/TrainingUtills'
import GroupUtills from '@/http/GroupUtills'
import { observer } from 'mobx-react-lite'


const page = observer(() => {
  const [addStage, setAddStage] = useState(false)
  const [addExercise, setAddExercise] = useState(false)
  const [stages, setStages] = useState([{'title':'','exercises':[],'tests':[]}])
  const [series, setSeries] = useState([])
  const [currentStage, setCurrentStage] = useState('adawd')
  
  useEffect(()=>{
    mobx.setPageName('Шаблон тренировки')
    TrainingUtills.getExercise()
    GroupUtills.getTests(0)
    
  },[])

  return (
    <div className={css.container}>
      {addStage&&<AddStage setModal={setAddStage} stages={stages} setStages={setStages}/>}
      {addExercise&&<AddExercise setModal={setAddExercise} currentStage={currentStage} stages={stages} setStages={setStages}/>}
      {!stages[0].title&&<div className={css.navBar}><HeaderAddButton callback={()=>setAddStage(!addStage)}  text={'Добавить этапы'}/></div>}
      {series.length === 0?
      stages.map(stage => <StageSection stage={stage} callback={()=>{setCurrentStage(stage.title);setAddExercise(true)}} type={'Этапы'} stages={stages} setStages={setStages}/>):
      stages.map(stage => <StageSection stage={stage} callback={()=>{setCurrentStage(stage.title);setAddExercise(true)}} type={'Серии'} stages={stages} setStages={setStages}/>)
    }
    </div>
  )
})

export default page


