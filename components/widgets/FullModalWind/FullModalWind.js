import css from './FullModalWind.module.css';
import {motion} from 'framer-motion'

const FullModalWind = ({ closeModal, children }) => {
  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.container} onClick={closeModal}>
      <div className={css.modalWind} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </motion.div>
  );
};

export default FullModalWind;