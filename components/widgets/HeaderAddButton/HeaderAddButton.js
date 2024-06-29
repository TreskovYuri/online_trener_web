import Image from 'next/image'
import css from './HeaderAddButton.module.css'
import { Settings } from 'lucide-react'

const HeaderAddButton = ({text, callback,isPlus=true, isicon=false, icon='',isSettings=false,className=''}) => {
  return (
    <div onClick={callback} className={`${css.btn} ${className}`}>{isPlus&&<span>+</span>}{isSettings&&<Settings className={css.settings} />}{isicon&&<Image src={icon} unoptimized className={css.icon}/>} {text}</div>
  )
}

export default HeaderAddButton