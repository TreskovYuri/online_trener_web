import RigthModalInput from '@/components/widgets/INPUTS/RigthModalInput/RigthModalInput'
import css from './SetRow.module.css'
import NumberInputGradientBorder from '@/components/widgets/INPUTS/NumberInputGradientBorder/NumberInputGradientBorder'
import { useEffect, useState } from 'react'
import { Debounced } from '@/utils/Debounced'
import addPatternHandlers from '@/app/admin/addtrainingpattern/addPatternHandlers'

const SetRow = ({set,exercise,sets,setSets}) => {

    const typeHandler = ({sp,pokazatelNum})=>{
        if(sp!=null && sp!=false){
            return <_Diapazon callback={Debounced(({diapazonOt,diapazonDo})=>{
                addPatternHandlers.updateSetsArray({sp:true,set:set,sets,setSets,pokazatelNum,diapazonOt,diapazonDo})
            },1500)} valueDo={set[`diapazonDo${pokazatelNum}`]} valueOt={set[`diapazonOt${pokazatelNum}`]}/>
        }else{
            return <_StateValue callback={Debounced(({pokazatel})=>{
                addPatternHandlers.updateSetsArray({sp:false,set:set,sets,setSets,pokazatelNum,pokazatel})
            },1500)} value={set[`pokazatel${pokazatelNum}`]}/>
        }
    }

  return (
    <div className={css.container}>
        <span className={css.flex1}>{set.set}</span>
        {[1,2,3,4,5].map(num =>exercise[`pocazatel${num}Name`]?typeHandler({sp:exercise[`pocazatel${num}SPFlag`],pokazatelNum:num}):null)}
    </div>
  )
}

export default SetRow



const _Diapazon = ({callback,valueOt,valueDo}) =>{
    const [diapazonOt, setDiapazonOt] = useState(valueOt)
    const [diapazonDo, setDiapazonDo] = useState(valueDo)
    const [flag,setFlag] = useState(false)

    useEffect(()=>{
        if(flag){callback({diapazonOt:diapazonOt,diapazonDo:diapazonDo})}else{setFlag(true)}
    },[diapazonOt,diapazonDo])

    return <span className={css.diapazonBox}>
             <span className={css.flex1}><NumberInputGradientBorder radius={0.5}input={diapazonOt}setInput={setDiapazonOt}/></span>
             -
             <span className={css.flex1}><NumberInputGradientBorder radius={0.5}input={diapazonDo}setInput={setDiapazonDo}/></span>
           </span>
}


const _StateValue = ({callback,value}) => {
    const [pokazatel, setPokazatel] = useState(value)
    const [flag,setFlag] = useState(false)


    useEffect(()=>{
        if(flag){callback({pokazatel:pokazatel})}else{setFlag(true)}
    },[pokazatel])


    return <span className={css.flex1}>
        <RigthModalInput bacgroundFill={true} type='number' input={pokazatel} setInput={setPokazatel}/>
        </span>
}