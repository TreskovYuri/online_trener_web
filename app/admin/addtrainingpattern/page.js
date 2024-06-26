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
import addPatternHandlers from './addPatternHandlers'
import seria from './img/seria.svg'
import TrainingMobx from '@/mobx/TrainingMobx'
import TestsBox from './StageSection/TestsBox/TestsBox'


const page = observer(() => {
  const [addStage, setAddStage] = useState(false)
  const [addExercise, setAddExercise] = useState(false)
  const [stages, setStages] = useState([{'title':'','exercises':[]}])
  const [series, setSeries] = useState([])
  const [currentStage, setCurrentStage] = useState('')
  const tests = TrainingMobx.addPatternTests
  
  useEffect(()=>{
    mobx.setPageName('Шаблон тренировки')
    TrainingUtills.getExercise()
    GroupUtills.getTests(0)
  },[])

  return (
    <div className={css.container}>
      {addStage&&<AddStage setModal={setAddStage} stages={stages} setStages={setStages}/>}
      {addExercise&&<AddExercise setModal={setAddExercise} currentStage={currentStage} stages={stages} setStages={setStages} series={series} setSeries={setSeries}/>}
      {!stages[0].title&&<div className={css.navBar}><HeaderAddButton callback={()=>setAddStage(!addStage)}  text={'Добавить этапы'}/></div>}
      {stages[0].title&& series.length === 0 &&<div className={css.navBarSeria}><HeaderAddButton  callback={()=>addPatternHandlers.stageToSeries(stages,setSeries)}  text={'Объеденить в серию'} isPlus={false} isicon={true} icon={seria}/></div>}
      {series.length === 0?
      stages.map(stage => <StageSection stage={stage} callback={()=>{setCurrentStage(stage.title);setAddExercise(true)}} type={'Этапы'} stages={stages} setStages={setStages} />):
      series.map(seria => <StageSection seria={seria} setCurrentStage={setCurrentStage} setAddExercise={setAddExercise}  type={'Серии'}series={series} setSeries={setSeries}/>)
    }
    {tests.length>0 &&<TestsBox/>}
    </div>
  )
})

export default page


