import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './StageSection.module.css'
import StageBox from './StageBox/StageBox'
import SessionBox from './SessionBox/SessionBox'
import TrainingMobx from '@/mobx/TrainingMobx'

const StageSection = ({
  stage={},
  callback=()=>{},
  type='',
  stages=[],
  setStages=()=>{},
  seria={},
  series=[], 
  setSeries=()=>{},
  setAddExercise=()=>{},
  setCurrentStage=()=>{}
}) => {

    const tests = TrainingMobx.addPatternTests
    if(type === 'Этапы' && !stage.title) return
    return (
      <div className={css.container}>
        <div className={css.header}><h2 className={css.title}>{stage.title || seria.title}</h2>{type === 'Этапы'&&<HeaderAddButton callback={callback} text={'Добавить упражнение'}/>}</div>
        {type === 'Этапы'? <StageBox stage={stage} stages={stages} setStages={setStages} />:<SessionBox seria={seria} series={series} setSeries={setSeries} setAddExercise={setAddExercise} setCurrentStage={setCurrentStage}/>}
      </div>
    )
}

export default StageSection