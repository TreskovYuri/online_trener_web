import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './UpdateSets.module.css'
import { observer } from 'mobx-react-lite'
import TrainingMobx from '@/mobx/TrainingMobx'
import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import Sklonatel from '@/utils/Sklonatel'
import ExerciseCard from './ExerciseCard/ExerciseCard'
import SizedBox from '@/components/widgets/SizedBox/SizedBox'

const UpdateSets = observer(() => {
    const setUpdateExerciseSets = TrainingMobx.setUpdateExerciseSets
    const currentStage = TrainingMobx.currentStage
    const blockIndex = currentStage.stageIndex
    const stage = currentStage.stages[blockIndex]
    const exercises = stage.exercises
    console.log(currentStage)

  return (
    <RigthModalWind setModal={setUpdateExerciseSets} initialOpacity={1} isModal={false}>
        <div className={css.container}>
          <h2 className={css.header}>{blockIndex+1} блок. {Sklonatel({count:stage.setCount,one:'сет',many:'сетов',rodit:'сета'})}</h2>
          {
            exercises.map((exercise,index) => <ExerciseCard exercise={exercise} blockIndex={blockIndex+1} exerciseIndex={index+1} isMany={exercises.length>1} setCount={stage.setCount}/>)
          }
             <div className={css.btn}><GradientButtonOval text='Сохранить' callback={()=>setUpdateExerciseSets(false)}/></div>
        </div>
    </RigthModalWind>
  )
})

export default UpdateSets