'use client'
import mobx from '@/mobx/mobx'
import css from './TestDetails.module.css'
import {motion} from 'framer-motion'
import plus from './img/plus.svg'
import Image from 'next/image'
import { observer } from 'mobx-react-lite'



const TestDetails = observer(() => {



  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setTestDetails(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>{mobx.oneTest.name}</h2>
                 <div className={css.btnRow}>

                    <div className={css.btn} onClick={()=> {mobx.setUpdateTests(true);mobx.setTestDetails(false)}}>
                        <Image src={plus} alt='Онлайн-Тренер' className={css.img}/>
                    </div>
                 </div>
            </div>
            <span className={css.label}>Описание</span>
            <span className={css.description}>{mobx.oneTest.description}</span>
            <span className={css.label}>Норматив</span>
            <span>{mobx.oneTest.item} {mobx.oneTest.type}</span>
        </motion.div>
    </motion.div>
  )
})

export default TestDetails