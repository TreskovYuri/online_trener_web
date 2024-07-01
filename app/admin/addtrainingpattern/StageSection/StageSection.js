import css from './StageSection.module.css'
import SessionBox from './SessionBox/SessionBox'
import { observer } from 'mobx-react-lite'
import addPatternHandlers from '../addPatternHandlers'
import { Plus } from 'lucide-react'



const StageSection = observer(({seria={}}) => {

    
    return (
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{ seria.title} <div className={css.addBtn} onClick={()=>addPatternHandlers.addBlockToSeries(seria.title)}><Plus  className={css.plus}/></div></h2>
          </div>
        <SessionBox seria={seria} />
      </div>
    )
})

export default StageSection