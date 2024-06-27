import css from './SetRow.module.css'

const SetRow = ({set,exercise}) => {

    const typeHandler = ({sp})=>{
        if(sp!=null && sp!=false){
            return <_Diapazon />
        }else{
            return <_StateValue />
        }
    }

  return (
    <div className={css.container}>
        <span className={css.flex1}>{set}</span>
        {exercise.pocazatel1Name && typeHandler({sp:exercise.pocazatel1SPFlag})}
        {exercise.pocazatel2Name && typeHandler({sp:exercise.pocazatel2SPFlag})}
        {exercise.pocazatel3Name && typeHandler({sp:exercise.pocazatel3SPFlag})}
        {exercise.pocazatel4Name && typeHandler({sp:exercise.pocazatel4SPFlag})}
        {exercise.pocazatel5Name && typeHandler({sp:exercise.pocazatel5SPFlag})}
    </div>
  )
}

export default SetRow

const _Diapazon = () =>{
    return <span className={css.diapazonBox}><span className={css.flex1}></span>-<span className={css.flex1}></span></span>
}


const _StateValue = () => {
    return <span className={css.flex1}></span>
}