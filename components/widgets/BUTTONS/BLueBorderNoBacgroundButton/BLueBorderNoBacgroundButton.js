import { useState } from 'react'
import css from './BLueBorderNoBacgroundButton.module.css'
import { Loader } from 'lucide-react'

const BLueBorderNoBacgroundButton = ({
  callback,
  title,
  className,
  isPlus=false,
  delay=0
}) => {
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
    <div className={`${css.container} ${className}`} onClick={clickHandler}>
        {isPlus&&<span className={css.plus}>+</span>}
        {isLoad&&<Loader className={css.loader}/>}
        {title}
    </div>
  )
}

export default BLueBorderNoBacgroundButton