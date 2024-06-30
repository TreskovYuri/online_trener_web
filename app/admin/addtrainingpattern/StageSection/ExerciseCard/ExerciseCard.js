import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import addPatternHandlers from '../../addPatternHandlers';
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv';
import {  Pencil, Trash2 } from 'lucide-react';
import Sklonatel from '@/utils/Sklonatel';


const ExerciseCard = observer(({
  exercise,
  seria={},
  isMany=false,
  blockIndex=0,
  exerciseIndex=0,
  index,
  timeout
}) => {
  const stage = exercise.stage
  const [isDrag, setIsDrag] = useState(false)
  const formulaFlag = exercise.sets?.length>0? addPatternHandlers.isSetsReady({set:exercise.sets[0]}):false


  const handleDrag = () => {
      addPatternHandlers.handleDragSeries(setIsDrag, exercise, seria,index);
  
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
           <div className={css.stageItem}><GradientLabel text={stage}/></div>
          }
        </div>
        {exercise.sets?.length>0 && formulaFlag &&
          <div className={css.formula}>
            <span>{exercise.sets.length}x{exercise.sets[0].pokazatel2?exercise.sets[0].pokazatel2:exercise.sets[0].pokazatelOt2}</span> • 
            <span>{exercise.sets[0].pokazatel1?exercise.sets[0].pokazatel1:exercise.sets[0].pokazatelOt1} {exercise.pocazatel1Type}</span> • 
            <span>{Sklonatel({count:timeout,many:'секунд',one:'секунда',rodit:'секунды'})} отдыха</span>
            </div>
        }
        <div className={css.btnBox}>
          <div className={css.delBtn} onClick={()=>{
            addPatternHandlers.handleDragSeries(()=>{}, exercise, seria,index)
            addPatternHandlers.deleteExerciseOnSeries()
          }}><Trash2 className={css.delete}/></div>
          <div className={css.delBtn} onClick={()=>{
          }}><Pencil className={css.delete}/></div>
        </div>
        
    </OpacityDiv>
  )
})

export default ExerciseCard