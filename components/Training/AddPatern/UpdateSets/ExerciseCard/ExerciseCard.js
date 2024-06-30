import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'
import css from './ExerciseCard.module.css'
import SetRow from './SetRow/SetRow'
import SetsHeader from './SetsHeader/SetsHeader'
import { useEffect, useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'
import { observer } from 'mobx-react-lite'
import TrainingMobx from '@/mobx/TrainingMobx'

const ExerciseCard = observer(({exercise,blockIndex, exerciseIndex,isMany,setCount}) => {
    const [sets,setSets] = useState([])
    const currentStage = TrainingMobx.currentStage
    const setCurrentStage = TrainingMobx.setCurrentStage
    const stage = exercise.stage



    useEffect(()=>{
        const result = currentStage.stages.map((stage,iterator) => {
            if(iterator == blockIndex-1){
                return {
                    ...stage,
                    exercises:stage.exercises.map((ex,iterator1)=> {
                        if(exerciseIndex-1 == iterator1){
                            return {
                                ...ex,  
                                sets:sets
                            }
                        }
                        return ex
                    })
                }
            }
            return stage
        })
        setCurrentStage({
            ...currentStage,
            stages:result
        })
    },[sets])




    useEffect(()=>{
        if(exercise.sets.length>0){
            setSets(exercise.sets.slice(0,setCount))
        }else{
            setSets(Array.from({ length: setCount }, (_, index) => addPatternHandlers.createSetsArray({set:index + 1,exercise:exercise})))
        }
    },[])

  return (
    <div className={css.container}>
        <h3 className={css.header}>{isMany&&<span>{blockIndex}.{exerciseIndex}</span>} {exercise.nameRu}<span className={css.eng}> / {exercise.nameEng}</span></h3>
        <div className={css.labelBox}>
            {
                <div  className={css.label}><GradientLabel text={stage}/></div>
            }
        </div>
        <SetsHeader exercise={exercise}/>
        {
            sets.map(set => <SetRow set={set} exercise={exercise} sets={sets} setSets={setSets}/>)
        }
    </div>
  )
})

export default ExerciseCard