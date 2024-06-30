import HeaderAddButton from '@/components/widgets/HeaderAddButton/HeaderAddButton'
import css from './StageSection.module.css'
import SessionBox from './SessionBox/SessionBox'
import { observer } from 'mobx-react-lite'
import addPatternHandlers from '../addPatternHandlers'



const StageSection = observer(({seria={}}) => {

    
    return (
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{ seria.title}</h2>
          </div>
        <SessionBox seria={seria} />
          <HeaderAddButton callback={()=>{addPatternHandlers.addBlockToSeries(seria.title)}} text={'Добавить блок'} isPlus={true} className={css.addBtn}/>
      </div>
    )
})

export default StageSection