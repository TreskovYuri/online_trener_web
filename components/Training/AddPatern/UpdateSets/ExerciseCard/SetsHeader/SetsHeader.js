import Sokrashattel from '@/utils/Sokrashatel'
import css from './SetsHeader.module.css'

const SetsHeader = ({exercise}) => {

    const typeHandler = ({sp,name,type}) => {
        if(sp != null && sp != false){
            return <_Diapazon name={name} type={type}/>
        }else{
            return <_StateValue name={name}/>
        }
    }

  return (
    <div className={css.container}>
            <span className={css.flex1}>Сет</span>
            {exercise.pocazatel1Name && typeHandler({name:exercise.pocazatel1Name,sp:exercise.pocazatel1SPFlag,type:exercise.pocazatel1Type})}
            {exercise.pocazatel2Name && typeHandler({name:exercise.pocazatel2Name,sp:exercise.pocazatel2SPFlag,type:exercise.pocazatel2Type})}
            {exercise.pocazatel3Name && typeHandler({name:exercise.pocazatel3Name,sp:exercise.pocazatel3SPFlag,type:exercise.pocazatel3Type})}
            {exercise.pocazatel4Name && typeHandler({name:exercise.pocazatel4Name,sp:exercise.pocazatel4SPFlag,type:exercise.pocazatel4Type})}
            {exercise.pocazatel5Name && typeHandler({name:exercise.pocazatel5Name,sp:exercise.pocazatel5SPFlag,type:exercise.pocazatel5Type})}

          </div>
  )
}

export default SetsHeader


const _Diapazon = ({name,type}) => {
    return <span className={css.flex2}>{name},{type}/диапазон`</span>
}


const _StateValue = ({name}) => {
    return <span className={css.flex1}>{name}</span>
}