import mobx from '@/mobx/mobx'
import DropCard from '../DropCard/DropCard'
import ExerciseCard from '../ExerciseCard/ExerciseCard'
import TestCard from '../TestCard/TestCard'
import css from './StageBox.module.css'
import { observer } from 'mobx-react-lite'
import addPatternHandlers from '../../addPatternHandlers'

const StageBox = observer(({stage,stages,setStages}) => {
  const exercises = stage.exercises
  const tests = stage.tests
  const handleDrop = addPatternHandlers.handleDrop;


  return (
    <div className={css.container}>
        {
            exercises.map((exercise, index) => <div key={exercise.id} className={css.dropZone}>
              <DropCard  dropCallback={()=>handleDrop(index,stages,stage,setStages)}/>
              <ExerciseCard exercise={exercise}/>
              <DropCard  dropCallback={()=>handleDrop(index+1,stages,stage,setStages)}/>
            </div>)
        }
        <DropCard  dropCallback={()=>handleDrop(exercises.length,stages,stage,setStages)}/>
        {
            tests.map(test => <TestCard/>)
        }
    </div>
  )
})
export default StageBox