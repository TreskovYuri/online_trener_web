'use client'
import Image from 'next/image'
import css from './ForgotPassword.module.css'
import ska from './img/ska.svg'
import km from './img/km.svg'
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import { isEmail } from 'validator'
import UserUtills from '@/http/UserUtills'
import MyTimer from '../MyTimer/MyTimer'
import { observer } from 'mobx-react-lite'
import mobx from '@/mobx/mobx'

const ForgotPassword = observer(() => {
    const [email, setEmail] = useState('')
    const [code, setCode] = useState('')
    const time = new Date();
    time.setSeconds(time.getSeconds() + 120);

    const fetchCode = async() => {
        if(email && isEmail(email.trim())){
            await UserUtills.refreshCodeToEmail(email.trim())
            mobx.setRestartTimer()
            mobx.setTimerOnOff(true)
        }
    }

    const forgot = async () => {
        if(email && isEmail(email.trim()) && code.length>4 ){
            await UserUtills.forgotPassword(email.trim(),code.trim())
        }
    }

    useEffect(()=>{
        if(window.localStorage.getItem('email')){
            setEmail(window.localStorage.getItem('email'))
        }
    },[])

  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.container}>
        <div className={css.imgContainer}>
            <Image src={ska} className={css.img} alt='Логотип СКА' />
            <Image src={km} className={css.img} alt='Логотип Красная машина юниор' />
        </div>
        <h1 className={css.trener}>Онлайн тренер</h1>
        <div className={css.modalWind}>
            <div className={css.header}>Забыли пароль?</div>
            <span className={css.description}>Для восстановления пароля, введите почту, указанную при регистрации</span>
            <div className={`${css.inputContainer}` }>
                <input className={css.input} type="email" id="email" placeholder='Email' value={email} onChange={e => setEmail(e.target.value)}/>
            </div>
            {mobx.timerOnOff?
            <span className={css.forgot}>Отправить код повторно через <MyTimer  expiryTimestamp={time}/></span>:
            <span className={css.forgot} onClick={fetchCode}>Отправить код подтверждения</span>
            }
            <div className={`${css.inputContainer}` }>
                <input type='text' className={css.input} value={code} onChange={e => setCode(e.target.value)}  id="password"  placeholder='Код подтверждения'/>
            </div>
            <button className={css.btn} onClick={forgot}>Восстановить пароль</button>
        </div>

    </motion.div>
  )
})

export default ForgotPassword