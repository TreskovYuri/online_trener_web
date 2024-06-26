import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './StageSection.module.css'
import StageBox from './StageBox/StageBox'
import SessionBox from './SessionBox/SessionBox'
import TrainingMobx from '@/mobx/TrainingMobx'
import { observer } from 'mobx-react-lite'



const StageSection = observer(({stage={},type='',seria={},}) => {
  const setAaddExercise = TrainingMobx.setAaddExercise
  const setCurrentStage = TrainingMobx.setCurrentStage


    if(type === 'Этапы' && !stage.title) return
    
    return (
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{stage.title || seria.title}</h2>
          {type === 'Этапы'&&<HeaderAddButton callback={()=>{setAaddExercise(true);setCurrentStage(stage.title)}} text={'Добавить упражнение'}/>}
          </div>
        {type === 'Этапы'? <StageBox stage={stage} />:<SessionBox seria={seria} />}
      </div>
    )
})

export default StageSection