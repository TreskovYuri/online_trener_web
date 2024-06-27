import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import SetRow from './SetRow/SetRow'
import SetsHeader from './SetsHeader/SetsHeader'
import { useEffect, useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'

const ExerciseCard = ({exercise,blockIndex, exerciseIndex,isMany,setCount}) => {
    const [sets,setSets] = useState([])



    const stages = JSON.parse(exercise.stage)
    const indexes = Array.from({ length: setCount }, (_, index) => index + 1)


    useEffect(()=>{
        if(exercise.sets.length>0){
            setSets(exercise.sets)
        }else{
            setSets(Array.from({ length: setCount }, (_, index) => addPatternHandlers.createSetsArray({set:index + 1,exercise:exercise})))
        }
    },[])
    useEffect(()=>{
        if(sets) console.log(sets)
    },[sets])

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
            sets.map(set => <SetRow set={set} exercise={exercise}/>)
        }
    </div>
  )
}

export default ExerciseCard