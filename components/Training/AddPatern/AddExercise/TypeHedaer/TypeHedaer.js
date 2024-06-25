
import css from './TypeHedaer.module.css'


const TypeHedaer = ({type,setType,typeList}) => {
  return (
    <div className={css.container}>
            {typeList.map(tp => (
                <div key={tp} className={`${css.item} ${type == tp? css.active:'' }`} onClick={()=>setType(tp)}>{tp}</div>
            ))}
    </div>
  )
}

export default TypeHedaer