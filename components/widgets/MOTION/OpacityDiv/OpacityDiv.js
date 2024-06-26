import { motion } from "framer-motion"

const OpacityDiv = ({
  className='',
  children,onClick=()=>{}, 
  ref=null,
  duration=0.1,
  once=false,
  onMouseDown=()=>{},
  draggable=false,
  onDrag=()=>{},
  onMouseOut=()=>{}

}) => {
  return (
    <motion.div 
    viewport={{once:once}}
    ref={ref} 
    className={className} 
    initial={{opacity:0}} 
    whileInView={{opacity:1}} 
    onClick={onClick}
    transition={{duration:duration}}
    onMouseDown={onMouseDown} 
    draggable={draggable}
    onDrag={onDrag}
    onMouseOut={onMouseOut}
    >
      {children}
    </motion.div>
  )
}

export default OpacityDiv