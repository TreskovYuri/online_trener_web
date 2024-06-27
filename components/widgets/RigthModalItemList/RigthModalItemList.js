import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers';
import ExerciseCard from './ExerciseCard/ExerciseCard';
import css from './RigthModalItemList.module.css'
import TestCard from './TestCard/TestCard';
import TrainingMobx from '@/mobx/TrainingMobx';
import { observer } from 'mobx-react-lite';
import RigthModalPush from '../MODALS/RigthModalPush/RigthModalPush';

const RigthModalItemList = observer(({type, list=[]}) => {
    const currentStage = TrainingMobx.currentStage
    const stages = TrainingMobx.stages
    const setStages = TrainingMobx.setStages
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries

    const addHandler = (item) => {
        if(!currentStage.seria){
            addPatternHandlers.addExerciseOnStages({currentStage:currentStage,exercise:item,setStages:setStages,stages:stages})
        }else{
            addPatternHandlers.addExerciseOnSeriesStages({currentStage:currentStage,exercise:item,series:series,setSeries:setSeries})
        }
    }


    switch (type) {
        case 'Упражнения':
            return (
                <div className={css.container}>
                    <div className={css.modalPush}><RigthModalPush /></div>
                    {
                        list.map((item,index) => <ExerciseCard key={index} exercise={item} callback={addHandler}  />)
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
})

export default RigthModalItemList