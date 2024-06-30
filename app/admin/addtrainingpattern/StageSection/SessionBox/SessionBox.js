import NumberInputGradientBorder from '@/components/widgets/INPUTS/NumberInputGradientBorder/NumberInputGradientBorder'
import ExerciseCard from '../ExerciseCard/ExerciseCard'
import css from './SessionBox.module.css'
import { useEffect, useState } from 'react'
import addPatternHandlers from '../../addPatternHandlers'
import { Debounced } from '@/utils/Debounced'
import DropCard from '../DropCard/DropCard'
import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import { observer } from 'mobx-react-lite'
import TrainingMobx from '@/mobx/TrainingMobx'


const SessionBox = observer(({seria}) => {
  const setCurrentStage = TrainingMobx.setCurrentStage
  const setAddExercise = TrainingMobx.setAaddExercise




  return (
    <div className={css.container}>

      {
        seria.stages.map((sra,index) => <_OneSeria key={index} stage={seria} seria={sra} index={index} title={seria.title}  addExercise={()=>{
          setAddExercise(true)
          setCurrentStage({
            'seria':seria,
            'stageIndex':index,
            'title':seria.title
          })
        }} />)
      }
    </div>
  )
})

export default SessionBox



const _OneSeria = observer(({seria,index, title ,stage,addExercise}) => {
  const series = TrainingMobx.series
  const setSeries = TrainingMobx.setSeries
  const exercises = seria?.exercises || []
  const [setCount, setSetCount] = useState(0)
  const [timeout, setTimeout] = useState(0)
  const [firstFlag, setFirstFlag] = useState(true)
  const handleDrop = addPatternHandlers.handleDropSeries;
  const isShifted = TrainingMobx.isShifted
  const setUpdateExerciseSets = TrainingMobx.setUpdateExerciseSets
  const setCurrentStage = TrainingMobx.setCurrentStage

  useEffect(()=>{
    setSetCount(seria.setCount)
    setTimeout(seria.timeout)
  },[seria.setCount,seria.timeout])



  const debouncedSetCountAndTimout = Debounced(() => {addPatternHandlers.setCountAndTimout(setCount,timeout,index, title ,series, setSeries, )},200);
 useEffect(()=>{ if(!firstFlag){debouncedSetCountAndTimout()}setFirstFlag(false)},[setCount,timeout])


  return (
    <div className={css.card}>
      <div className={css.CardHeader}>
        <h3 className={css.CardTitle}>{index+1} блок.{seria.setCount} сетов</h3>
        <span>Кол-во сетов<div className={css.input}><NumberInputGradientBorder input={setCount} setInput={setSetCount}/></div></span>
        <span>Отдых между  сетами<div className={css.input}><NumberInputGradientBorder input={timeout} setInput={setTimeout} label={"сек"}/></div></span>
        <div className={css.addExerciseBtn}>

         <div className={css.addBtn}>
         <HeaderAddButton 
        className={css.addBtn}
        callback={()=>{addExercise()}} text={'Добавить упражнение'}/>
          </div>

          <div className={css.addBtn}><HeaderAddButton 
        
        isSettings={true}
        isPlus={false}
        callback={()=>{
            setCurrentStage({...stage,stageIndex:index,})
            setUpdateExerciseSets(true)
        }} text={'Настроить сеты'}/></div>

        </div>
      </div>
      <div className={css.wrapBox}>
      {
        exercises.map((exercise,indx) => (
          <div className={css.dropZone} key={indx}>
            <DropCard dropCallback={() => handleDrop(indx,series,stage,setSeries,index)} />
            <ExerciseCard 
            exercise={exercise} 
            series={series} 
            setSeries={setSeries} 
            seria={stage} 
            isMany={exercises.length>1} 
            blockIndex={index+1} 
            exerciseIndex={indx+1} 
            index={index} 
            setCount={setCount}
            timeout={timeout}
            />
            <DropCard dropCallback={() => handleDrop(indx+1,series,stage,setSeries,index)} />
          </div>
        ))
      }
      <DropCard dropCallback={() => handleDrop(exercises.length,series,stage,setSeries,index)} />
      </div>
    </div>
  )
})

                                                                           