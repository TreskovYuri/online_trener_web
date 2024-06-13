import { motion } from "framer-motion"

const OpacityDiv = ({className='',children}) => {
  return (
    <motion.div className={className} initial={{opacity:0}} whileInView={{opacity:1}}>{children}</motion.div>
  )
}

export default OpacityDiv