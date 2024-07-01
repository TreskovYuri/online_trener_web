import TrainingMobx from '@/mobx/TrainingMobx';
import css from './TestsBox.module.css'
import { observer } from 'mobx-react-lite';
import { AnimatePresence, motion } from 'framer-motion';
import TestCard from '../TestCard/TestCard';
import DropCard from '../DropCard/DropCard';
import { useState } from 'react';
import mobx from '@/mobx/mobx';
import _ from 'lodash'

const TestsBox = observer(() => {
    const tests = TrainingMobx.addPatternTests;
    const [isDrag,setIsDarg] = useState(false)

    const handleDrop = () => {
      const dragValue = mobx.dragValue
      const flag = _.find(TrainingMobx.addPatternTests,{'name':dragValue.test.name})
      if(dragValue.type === 'Тест' && !flag){
        TrainingMobx.setAddPatternTests(dragValue.test)
      }
    }
  return (
    <AnimatePresence mode={"sync"}>
    <motion.div className={css.container}>
        <h2 className={css.header}>Тесты</h2>
        <div className={css.wrapBox}>
            {tests.map((test, index) => (
            <motion.div key={tests.id} className={`${css.dropZone}`}
            
            >
            <DropCard  dropCallback={handleDrop}/>
            <TestCard test={test}/>
            <DropCard  dropCallback={handleDrop}/>
            </motion.div>
        ))}
        </div>
      {tests.length==0&&<DropCard   dropCallback={handleDrop}/>}
    </motion.div>
  </AnimatePresence>
  )
})

export default TestsBox