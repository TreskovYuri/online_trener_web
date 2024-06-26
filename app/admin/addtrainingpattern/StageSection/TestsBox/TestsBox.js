import TrainingMobx from '@/mobx/TrainingMobx';
import css from './TestsBox.module.css'
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import TestCard from '../TestCard/TestCard';

const TestsBox = observer(() => {
    const tests = TrainingMobx.addPatternTests;
  return (
    <AnimatePresence mode={"sync"}>
    <motion.div className={css.container}>
        <h2 className={css.header}>Тесты</h2>
        <div className={css.wrapBox}>
            {tests.map((test, index) => (
            <motion.div key={tests.id} className={css.dropZone}>
            {/* <DropCard  /> */}
            <TestCard test={test}/>
            {/* <DropCard /> */}
            </motion.div>
        ))}
        </div>
      {/* <DropCard  /> */}
    </motion.div>
  </AnimatePresence>
  )
})

export default TestsBox