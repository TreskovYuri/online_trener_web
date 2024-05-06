'use client'
import mobx from '@/mobx/mobx'
import css from './ErrorModal.module.css'
import {motion} from 'framer-motion'
import { observer } from 'mobx-react-lite'
import close from './img/close.svg'
import Image from 'next/image'

const ErrorModal = observer(() => {


  return (
    <>
        {mobx.error&&
        <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setError(false)}>
            <div className={css.modalWind} onClick={(e)=>e.stopPropagation()}>
            <Image src={close} alt='Close' className={css.close} onClick={()=>mobx.setError(false)}/>
                <span className={css.message}>{mobx.errorMessage}</span>
            </div>
        </motion.div>
        }
    </>

  )
})

export default ErrorModal