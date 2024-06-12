import Image from 'next/image'
import css from './CommentInput.module.css'
import arrow from './img/arrow.svg'

const CommentInput = ({input, setInput,callback}) => {
  
  return (
    <div className={css.container}>
        <input placeholder='Комментарий' value={input} onChange={e => setInput(e.target.value)} className={css.input}/>
        <div className={css.btn} onClick={callback}><Image src={arrow} unoptimized className={css.arrow}/></div>
    </div>
  )
}

export default CommentInput