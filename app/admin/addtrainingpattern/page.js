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
import UpdateSets from '@/components/Training/AddPatern/UpdateSets/UpdateSets'
import ShiftHandler from '@/utils/ShiftHandler'
import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv'
import { ErrorHandler } from '@/utils/ErrorHandler'
import { useRouter } from 'next/navigation'


const page = observer(() => {
  const router = useRouter()
  const [addStage, setAddStage] = useState(false)
  const addExercise = TrainingMobx.addExercise
  const stages = TrainingMobx.stages
  const series = TrainingMobx.series
  const setSeries = TrainingMobx.setSeries
  const tests = TrainingMobx.addPatternTests
  const updateExerciseSets = TrainingMobx.updateExerciseSets
  const setIsShiftPressed = TrainingMobx.setIsShifted
  const [name,setName] = useState(TrainingMobx.trainingName)
  
  useEffect(()=>{
    mobx.setPageName('Шаблон тренировки')
    TrainingUtills.getExercise()
    GroupUtills.getTests()
    TrainingUtills.getExerciseGroups()
    // Создание обработчика для отслеживания нажатия Shift
    ShiftHandler.init(setIsShiftPressed);
    if(!TrainingMobx.trainingName){
      router.push('/admin/training')
    }

    return () => {
      ShiftHandler.cleanup();
      TrainingMobx.clearLists()
  };
  },[])


    const save = async ()=>{
      if(addPatternHandlers.isAllSetsReady(series)){
        const formData = new FormData()
        formData.append('name',name||TrainingMobx.trainingName)
        formData.append('stages',JSON.stringify(series))
        const data = await TrainingUtills.createPattern(formData)
        if(data == 'ok'){
          router.push('/admin/training')
        }
      }else{
        ErrorHandler('Заполните все сеты во всех упражнениях!')
      }
    }





  return (
    <div className={css.container}>
      {addStage&&<AddStage setModal={setAddStage} />}
      {addExercise&&<AddExercise />}
      {updateExerciseSets&&<UpdateSets/>}
      {!stages[0].title&&<div className={css.navBar}><HeaderAddButton callback={()=>setAddStage(!addStage)}  text={'Добавить этапы'}/></div>}
      {stages[0].title&& series.length === 0 &&<div className={css.navBarSeria}><HeaderAddButton  callback={()=>addPatternHandlers.stageToSeries(stages,setSeries)}  text={'Объеденить в серию'} isPlus={false} isicon={true} icon={seria}/></div>}
      {series.length > 0 && 
      <div className={css.seriesHeader}>
        <span className={css.chiftPlaceholder}>Для редактирования этапов и упражнений зажмите клавишу Shift</span>
        {series.length>0&&<OpacityDiv duration={1} className={css.saveBtn}><GradientButtonOval text='Сохранить шаблон' callback={save}/></OpacityDiv>}
      </div>
      }
      {series.length === 0?
      stages.map(stage => <StageSection stage={stage} type={'Этапы'} />):
      series.map(seria => <StageSection seria={seria} type={'Серии'}/>)
    }
    {tests.length>0 &&<TestsBox/>}
    </div>
  )
})

export default page


