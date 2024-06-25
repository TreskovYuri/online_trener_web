import { motion } from "framer-motion"

const OpacityDiv = ({className='',children,onClick=()=>{}, ref=null,duration=0.1,once=false}) => {
  return (
    <motion.div 
    viewport={{once:once}}
    ref={ref} 
    className={className} 
    initial={{opacity:0}} 
    whileInView={{opacity:1}} 
    onClick={onClick}
    transition={{duration:duration}}
    >
      {children}
    </motion.div>
  )
}

export default OpacityDiv