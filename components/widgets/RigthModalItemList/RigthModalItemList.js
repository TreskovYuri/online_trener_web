import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers';
import ExerciseCard from './ExerciseCard/ExerciseCard';
import css from './RigthModalItemList.module.css'
import TestCard from './TestCard/TestCard';

const RigthModalItemList = ({type, list=[],stages, setStages, currentStage}) => {
    switch (type) {
        case 'Упражнения':
            return (
                <div className={css.container}>
                    {
                        list.map((item,index) => <ExerciseCard key={index} exercise={item} callback={()=>addPatternHandlers.addExerciseOnStages({currentStage:currentStage,exercise:item,setStages:setStages,stages:stages})}  />)
                    }
                </div>
              )
        case 'Тесты':
            return (
                <div className={css.container}>
                    {
                        list.map((item,index) => <TestCard key={index} test={item}/>)
                    }
                </div>
              )
        default:
            return;
    }
}

export default RigthModalItemList