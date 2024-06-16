import { motion } from "framer-motion"

const OpacityDiv = ({className='',children,onClick=()=>{}}) => {
  return (
    <motion.div className={className} initial={{opacity:0}} whileInView={{opacity:1}} onClick={onClick}>{children}</motion.div>
  )
}

export default OpacityDiv