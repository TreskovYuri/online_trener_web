import Image from 'next/image'
import css from './RigthModalInputCurrentItem.module.css'
import arrow from './img/arrow.svg'
import { useState } from 'react'
import { motion } from 'framer-motion'

const RigthModalInputCurrentItem = ({list,item,setItem}) => {
    const [modal, setModal] = useState(false)
  return (
    <div className={css.container} onClick={()=>setModal(!modal)}>
        {item}
        <Image src={arrow} className={`${css.arrow} ${modal?css.active:''}`} />
        {
            modal&& <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.modalWind}>
                        {list.map(e => <span key={e} className={css.modalItem} onClick={()=>setItem(e)}>{e}</span>)}
                    </motion.div>
        }
    </div>
  )
}

export default RigthModalInputCurrentItem