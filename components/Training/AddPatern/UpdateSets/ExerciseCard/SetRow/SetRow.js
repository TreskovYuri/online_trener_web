import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import css from './SetRow.module.css'
import NumberInputGradientBorder from '@/components/widgets/INPUTS/NumberInputGradientBorder/NumberInputGradientBorder'

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
        <span className={css.flex1}>{set.set}</span>
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
    return <span className={css.diapazonBox}><span className={css.flex1}><NumberInputGradientBorder radius={0.5}/></span>-<span className={css.flex1}><NumberInputGradientBorder radius={0.5}/></span></span>
}


const _StateValue = () => {
    return <span className={css.flex1}>
        <RigthModalInput bacgroundFill={true} type='number'/>
        </span>
}