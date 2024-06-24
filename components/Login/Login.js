'use client'
import Image from 'next/image'
import css from './Login.module.css'
import ska from './img/ska.svg'
import km from './img/km.svg'
import mobx from '@/mobx/mobx'
import {motion} from 'framer-motion'
import { useEffect, useState } from 'react'
import UserUtills from '@/http/UserUtills'
import validator from 'validator'
import { useRouter } from 'next/navigation'
import { observer } from 'mobx-react-lite'
import { ErrorHandler } from '@/utils/ErrorHandler'

const Login = observer(() => {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const [checkbox, setCheckbox] = useState(true)

    useEffect(()=>{
        if(window.localStorage.getItem('email')){
            setEmail(window.localStorage.getItem('email'))
        }
        if(window.localStorage.getItem('password')){
            setPassword(window.localStorage.getItem('password'))
        }
    },[])

    const login = async () => {

        if(validator.isEmail(email) && password.length>4){
            mobx.setLoading(true)
            const formData = new FormData();
            email ? formData.append('email', email) : formData.append('email', 111)
            password ? formData.append('password', password) : formData.append('password', 111)
            const data = await UserUtills.login(formData)

            if(data){
                if(checkbox){
                    window.localStorage.setItem('email',email.trim())
                    window.localStorage.setItem('password',password.trim())
                }else{
                    window.localStorage.removeItem('email')
                    window.localStorage.removeItem('password')
                }
                
            }
            mobx.setLoading(false)
            if(data.post === 'Тренер'){
                router.push('/admin/nutrition')
            }else if(data.post === 'Супер тренер'){
                router.push('/superadmin')
            }else{
                ErrorHandler('У вас нет доступа к личному кабинету!')
            }
            
        }else{
            ErrorHandler('Заполните обязательные поля!')
            mobx.setLoading(false)
        }
    }


  return (
    <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.container}>
        <div className={css.imgContainer}>
            <Image src={ska} className={css.img} alt='Логотип СКА' />
            <Image src={km} className={css.img} alt='Логотип Красная машина юниор' />
        </div>
        <h1 className={css.trener}>Онлайн тренер</h1>
        <div className={css.modalWind}>
            <div className={css.header}>Вход</div>
            <div className={`${css.inputContainer}` }>
                <input className={css.input} type="email" id="email" value={email} onChange={e => setEmail(e.target.value)}/>
                <label className={css.label} htmlFor="email">Email</label>
            </div>
            <div className={`${css.inputContainer}` }>
                <input type='password' className={css.input}  id="password" value={password} onChange={e => setPassword(e.target.value)}/>
                <label className={css.label} htmlFor="password">Пароль</label>
            </div>
            <div className={css.checkboxContainer}>
                <div className={css.checkboxBox}>
                    <input type='checkbox' checked={checkbox} onChange={e => setCheckbox(e.target.checked)} className={css.checkbox}/>
                    <span className={css.remember}>Запомнить меня</span>
                </div>
                <div className={css.forgot} onClick={()=>mobx.setForgotPassword(true)}>Забыли пароль?</div>
            </div>
            <button className={css.btn} onClick={(login)}>Войти</button>
        </div>

    </motion.div>
  )
})

export default Login