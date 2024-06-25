import { ChevronRight } from 'lucide-react'
import css from './TestCard.module.css'

const TestCard = ({test, callback}) => {
  return (
    <div className={css.container}>
      <div className={css.textContainer}>
        <h2 className={css.header}>{test.name}</h2>
        <div className={css.btn} onClick={()=>callback(test)}>Добавить</div>
      </div>
      <ChevronRight className={css.arrow}/>
    </div>
  )
}

export default TestCard 