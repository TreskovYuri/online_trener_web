import { Loader } from 'lucide-react'
import css from './GradientButtonOval.module.css'
import { useState } from 'react'

const GradientButtonOval = ({text='',callback,className='',delay=0}) => {
  const [isLoad,setIsload] = useState(false)

  const clickHandler = () => {
    if(delay){
      setIsload(true)
      setTimeout(()=>{
        callback()
        setIsload(false)
      },delay)

    }else{
      callback()
    }
  }

  return (
    <div onClick={clickHandler} className={`${css.btn} ${className}`}>{isLoad&&<Loader className={css.loader}/>}{text}</div>
  )
}

export default GradientButtonOval