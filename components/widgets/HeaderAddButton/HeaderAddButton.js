import Image from 'next/image'
import css from './HeaderAddButton.module.css'

const HeaderAddButton = ({text, callback,isPlus=true, isicon=false, icon=''}) => {
  return (
    <div onClick={callback} className={css.btn}>{isPlus&&<span>+</span>}{isicon&&<Image src={icon} unoptimized className={css.icon}/>} {text}</div>
  )
}

export default HeaderAddButton