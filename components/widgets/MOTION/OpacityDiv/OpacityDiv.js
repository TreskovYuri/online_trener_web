import { motion } from "framer-motion"

const OpacityDiv = ({className='',children,onClick=()=>{}, ref=null}) => {
  return (
    <motion.div ref={ref} className={className} initial={{opacity:0}} whileInView={{opacity:1}} onClick={onClick}>{children}</motion.div>
  )
}

export default OpacityDiv