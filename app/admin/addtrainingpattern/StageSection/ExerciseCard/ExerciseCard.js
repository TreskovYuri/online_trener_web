import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import addPatternHandlers from '../../addPatternHandlers';
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv';
import TrainingMobx from '@/mobx/TrainingMobx';
import {  Trash2 } from 'lucide-react';


const ExerciseCard = observer(({
  exercise,
  stg={},
  seria={},
  type='',
  isMany=false,
  blockIndex=0,
  exerciseIndex=0,
  index
}) => {
  const stage = JSON.parse(exercise.stage)
  const [isDrag, setIsDrag] = useState(false)
  const stages = TrainingMobx.stages
  const setStages = TrainingMobx.setStages
  const isShifted = TrainingMobx.isShifted






  const handleDrag = () => {
    if (type=='Этапы') {
      addPatternHandlers.handleDragStage(setIsDrag, exercise, stages, setStages, stg);
    } else {
      addPatternHandlers.handleDragSeries(setIsDrag, exercise, seria,index);
    }
  };




  return (
    <OpacityDiv className={`${css.container} ${isDrag?css.isDrag:''}`} 
    draggable
    onDrag={handleDrag}
    onMouseOut={()=>setIsDrag(false)}
    duration={.7}
    > 
        <div className={css.header}>{isMany&&`${blockIndex}.${exerciseIndex} `}{exercise.nameRu}<span> / {exercise.nameEng}</span></div>
        <div className={css.stages}>
          {
           stage.map(st => <div className={css.stageItem}><GradientLabel text={st}/></div>)
          }
        </div>
        {exercise.sets.length>0&&
          <div>{exercise.sets.length}</div>
        }
        {isShifted&&<div className={css.delBtn} onClick={()=>{
          addPatternHandlers.handleDragSeries(()=>{}, exercise, seria,index)
          addPatternHandlers.deleteExerciseOnSeries()
        }}><Trash2 className={css.delete}/></div>}
    </OpacityDiv>
  )
})

export default ExerciseCard