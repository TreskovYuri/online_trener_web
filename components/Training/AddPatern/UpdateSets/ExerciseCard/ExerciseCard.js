import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import SetRow from './SetRow/SetRow'
import SetsHeader from './SetsHeader/SetsHeader'

const ExerciseCard = ({exercise,blockIndex, exerciseIndex,isMany,setCount}) => {
    const stages = JSON.parse(exercise.stage)
    const indexes = Array.from({ length: setCount }, (_, index) => index + 1)
  return (
    <div className={css.container}>
        <h3 className={css.header}>{isMany&&<span>{blockIndex}.{exerciseIndex}</span>} {exercise.nameRu}<span className={css.eng}> / {exercise.nameEng}</span></h3>
        <div className={css.labelBox}>
            {
                stages.map(stage => <div key={stage} className={css.label}><GradientLabel text={stage}/></div>)
            }
        </div>
        <SetsHeader exercise={exercise}/>
        {
            indexes.map(inx => <SetRow set={inx} exercise={exercise}/>)
        }
    </div>
  )
}

export default ExerciseCard