import { motion } from 'framer-motion'
import css from './RigthModalWind.module.css'



const RigthModalWind = ({setModal,children,isModal=true}) => {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={isModal?css.container:css.container1} onClick={()=>setModal(false)}>
        <motion.div initial={{x:100}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            {children }
        </motion.div>
    </motion.div>
  )
}

export default RigthModalWind