import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './StageSection.module.css'

const StageSection = ({stage,callback}) => {
    if(!stage.title) return
  return (
    <div className={css.container}>
        <div className={css.header}><h2 className={css.title}>{stage.title}</h2><HeaderAddButton callback={callback} text={'Добавить упражнение'}/></div>
        
    </div>
  )
}

export default StageSection