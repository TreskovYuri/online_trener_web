import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './StageSection.module.css'
import StageBox from './StageBox/StageBox'
import SessionBox from './SessionBox/SessionBox'

const StageSection = ({stage,callback,type,stages,setStages}) => {
    if(type === 'Этапы' && !stage.title) return
    return (
      <div className={css.container}>
        <div className={css.header}><h2 className={css.title}>{stage.title}</h2><HeaderAddButton callback={callback} text={'Добавить упражнение'}/></div>
        {type === 'Этапы'? <StageBox stage={stage} stages={stages} setStages={setStages} />:<SessionBox />}
      </div>
    )
}

export default StageSection