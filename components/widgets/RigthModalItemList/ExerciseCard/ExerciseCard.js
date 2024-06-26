import { ChevronRight } from 'lucide-react'
import css from './ExerciseCard.module.css'
import { useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'

const ExerciseCard = ({exercise, callback, type='', seria={}}) => {
  const [isDrag, setIsDrag] = useState(false)
  

  const handleDrag = () => {
    if(type == 'Этапы'){
      addPatternHandlers.handleDragStage(setIsDrag,exercise)
    }else{
      addPatternHandlers.handleDragSeries(setIsDrag,exercise,seria)
    }
  }





  return (
    <div className={`${css.container} ${isDrag?css.isDrag:''}`} draggable onDrag={handleDrag} onMouseOut={()=>setIsDrag(false)} >
      <div className={css.textContainer}>
        <h2 className={css.header}>{exercise.nameRu}</h2>
        <div className={css.btn} onClick={()=>callback(exercise)}>Добавить</div>
      </div>
      <ChevronRight className={css.arrow}/>
    </div>
  )
}

export default ExerciseCard