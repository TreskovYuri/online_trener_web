import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import addPatternHandlers from '../../addPatternHandlers';

const ExerciseCard = observer(({exercise}) => {
  const stage = JSON.parse(exercise.stage)
  const [shiftClicked, setShiftClicked] = useState(false);
  const [isDrag, setIsDrag] = useState(false)



  const handleMouseDown = (event) => {
    if (event.shiftKey) {
      setShiftClicked(true);

    } else {
      setShiftClicked(false);
    }
  };




  return (
    <div className={`${css.container} ${shiftClicked?css.currentSery:''} ${isDrag?css.isDrag:''}`} 
    onMouseDown={handleMouseDown} 
    draggable
    onDrag={()=>addPatternHandlers.handleDrag(setIsDrag,exercise)}
    onMouseOut={()=>setIsDrag(false)}
    > 
        <div className={css.header}>{exercise.nameRu}<span> / {exercise.nameEng}</span></div>
        <div className={css.stages}>
          {
           stage.map(st => <div className={css.stageItem}><GradientLabel text={st}/></div>)
          }
        </div>
    </div>
  )
})

export default ExerciseCard