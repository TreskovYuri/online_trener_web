import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import { useState } from 'react';
import { observer } from 'mobx-react-lite';
import addPatternHandlers from '../../addPatternHandlers';
import OpacityDiv from '@/components/widgets/MOTION/OpacityDiv/OpacityDiv';


const ExerciseCard = observer(({
  exercise,
  stages={},
  setStages=()=>{},
  stg={},
  series=[],
  setSeries=()=>{},
  seria={},
  type='',
  isMany=false,
  blockIndex=0,
  exerciseIndex=0
}) => {
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


  const handleDrag = () => {
    if (type=='Этапы') {
      addPatternHandlers.handleDragStage(setIsDrag, exercise, stages, setStages, stg);
    } else {
      addPatternHandlers.handleDragSeries(setIsDrag, exercise, seria);
    }
  };




  return (
    <OpacityDiv className={`${css.container} ${shiftClicked?css.currentSery:''} ${isDrag?css.isDrag:''}`} 
    onMouseDown={handleMouseDown} 
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
    </OpacityDiv>
  )
})

export default ExerciseCard