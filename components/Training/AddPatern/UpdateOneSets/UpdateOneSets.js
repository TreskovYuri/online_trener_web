import RigthModalWind from '@/components/widgets/RigthModalWind/RigthModalWind'
import css from './UpdateOneSets.module.css'
import TrainingMobx from '@/mobx/TrainingMobx'
import { observer } from 'mobx-react-lite'
import GradientButtonOval from '@/components/widgets/BUTTONS/GradientButtonOval/GradientButtonOval'
import SetsHeader from '../UpdateSets/ExerciseCard/SetsHeader/SetsHeader'
import SetRow from '../UpdateSets/ExerciseCard/SetRow/SetRow'
import { useEffect, useState } from 'react'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'
import { ArrayIndexOnCountInt } from '@/utils/ArrayIndexOnCountInt'
import GradientLabel from '@/components/widgets/GradientLabel/GradientLabel'

const UpdateOneSets = observer(() => {
    const setUpdateOneExerciseSets = TrainingMobx.setUpdateOneExerciseSets
    const exercise = TrainingMobx.currentExercise.exercise
    const setCount = TrainingMobx.currentExercise.setCount
    const [sets,setSets] = useState([])

    useEffect(()=>{
        if(!exercise.sets || exercise.sets.length==0){
            exercise.sets = ArrayIndexOnCountInt(setCount).map(
                set => addPatternHandlers.createSetsArray({set:set,exercise})
            )
        }else if(exercise.sets.length<setCount){
            exercise.sets = [
                ...exercise.sets,
                ...exercise.sets = ArrayIndexOnCountInt(setCount).slice(exercise.sets.length,setCount).map(
                    set => addPatternHandlers.createSetsArray({set:set,exercise})
                )
            ]
        }else if (exercise.sets){
            exercise.sets = exercise.sets.slice(0,setCount)
        }
        setSets(exercise.sets)
    },[])

    const save = () => {
        addPatternHandlers.saveSetsByOneExercise({currentExercise:TrainingMobx.currentExercise, sets})
        setUpdateOneExerciseSets(false)
    }


  return (
    <RigthModalWind setModal={setUpdateOneExerciseSets} initialOpacity={1} isModal={false}>
    <div className={css.container}>
      <div className={css.scrollBox}>
        <h2 className={css.header}>{exercise.nameRu} <span>{'/ '+ exercise.nameEng}</span></h2>
        <div  className={css.label}><GradientLabel text={exercise.stage}/></div>
        <SetsHeader exercise={exercise}/>

        {
            exercise.sets.map(set => <SetRow key={set.set} set={set} exercise={exercise} sets={sets} setSets={setSets}/>)
        }
      </div>
         <div className={css.btn}><GradientButtonOval  text='Сохранить' callback={save} delay={500}/></div>
    </div>
</RigthModalWind>
  )
})

export default UpdateOneSets