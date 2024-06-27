import css from './RigthModalPush.module.css'
import {motion} from 'framer-motion'
import gsap from 'gsap'
import { useEffect, useRef } from 'react'

const RigthModalPush = ({text='Перетяните карточку или нажмите кнопку добавить'}) => {
    const textRef = useRef(null)
    useEffect(()=>{
        setTimeout(()=>{
            gsap.to(textRef.current,{opacity:0, duration:1})
        },[2000])
    },[])
  return (
    <motion.div  className={css.container}>
        <motion.div ref={textRef} initial={{y:100,scale:.6}} whileInView={{y:0,scale:1}} className={css.text}>{text}</motion.div>
    </motion.div>
  )
}

export default RigthModalPush