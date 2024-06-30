import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './UpdateSets.module.css'
import { observer } from 'mobx-react-lite'
import TrainingMobx from '@/mobx/TrainingMobx'
import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import Sklonatel from '@/utils/Sklonatel'
import ExerciseCard from './ExerciseCard/ExerciseCard'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'



const UpdateSets = observer(() => {
    const setUpdateExerciseSets = TrainingMobx.setUpdateExerciseSets
    const currentStage = TrainingMobx.currentStage
    const blockIndex = currentStage.stageIndex
    const stage = currentStage.stages[blockIndex]
    const exercises = stage.exercises
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries

    const save =() => {

        addPatternHandlers.saveSets({series,setSeries,currentStage})
        setUpdateExerciseSets(false)
    }
    

  return (
    <RigthModalWind setModal={setUpdateExerciseSets} initialOpacity={1} isModal={false}>
        <div className={css.container}>
          <div className={css.scrollBox}>
            <h2 className={css.header}>{blockIndex+1} блок. {Sklonatel({count:stage.setCount,one:'сет',many:'сетов',rodit:'сета'})}</h2>
            {
              exercises.map((exercise,index) => <ExerciseCard key={exercise.id} exercise={exercise} blockIndex={blockIndex+1} exerciseIndex={index+1} isMany={exercises.length>1} setCount={stage.setCount}/>)
            }
          </div>
             <div className={css.btn}><GradientButtonOval  text='Сохранить' callback={save} delay={500}/></div>
        </div>
    </RigthModalWind>
  )
})

export default UpdateSets