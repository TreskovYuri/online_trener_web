"use client"
import mobx from '@/mobx/mobx'
import css from './addUser.module.css'
import { useEffect, useState } from 'react'
import arrow from './img/arrow.svg'
import Image from 'next/image'
import {motion} from 'framer-motion'
import { ErrorHandler } from '@/utils/ErrorHandler'
import isEmail from 'validator/lib/isEmail'
import UserUtills from '@/http/UserUtills'

export  const dynamic = 'force-dynamic'

const AddUser = () => {



    useEffect(()=>{
        UserUtills.getTreners()
    },[])


    useEffect(()=>{
        if( mobx.treners){
            setTrenerId(mobx.treners[0]?.id)
            setTrener(mobx.treners[0]?.name)
        }
    },[mobx.treners])


    const [email, setEmail] = useState('')
    const [post, setPost] = useState('Спортсмен')
    const [trener, setTrener] = useState('Тренер')
    const [trenerId, setTrenerId] = useState(0)
    const [trenerModal, setTrenerModal] = useState(false)

    const [postModal, setPostModal] = useState(false)




    const registration = async () => {
        if(email|| isEmail(email)){
            const formData = new FormData();
            formData.append('email', email)
            formData.append('post', post)
            let data;
            if(post != 'Спортсмен'){
                const data = await UserUtills.registration(formData)
            }else{
                if(trenerId){
                    formData.append('trenerId', trenerId)
                    data = await UserUtills.registration(formData)
                }else{
                    ErrorHandler('Заполните обязательные поля!')
                }
            }
           
            
            if (data && data.email){
                ErrorHandler(`Данные для входа отправлены на ${email}`)
            }
        }else{
            ErrorHandler('Не корректный Email!')
        }
    }


  return (
    <div className={css.container} onClick={()=>mobx.setAddUser(false)}>
        <div className={css.modalWind} onClick={e => e.stopPropagation()}>
         <input type='text' className={css.input} value={email} onChange={e => setEmail(e.target.value)} placeholder='Email' id="password" />
         <span className={css.input} onClick={()=>setPostModal(!postModal)}>
            {post} 
            <Image src={arrow} className={css.arrow}/>
            {postModal&&
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.postModal}>
                    <span onClick={()=>{setPostModal(false); setPost('Спортсмен')}}>Спортсмен</span>
                    <span onClick={()=>{setPostModal(false); setPost('Тренер')}}>Тренер</span>
                    {mobx.user.post == 'Супер тренер'&&<span onClick={()=>{setPostModal(false); setPost('Супер тренер')}}>Супер тренер</span>}
                </motion.div>
            }
            </span>
            {post === 'Спортсмен' &&
                     <span className={css.input} onClick={()=>setTrenerModal(!trenerModal)}>
                     {trener} 
                     <Image src={arrow} className={css.arrow}/>
                     {trenerModal&&
                         <motion.div initial={{opacity:0, height:'.1vw'}} whileInView={{opacity:1,height:'5vw'}} className={css.postModal}>
                            {mobx.treners.map(trener => (
                             <span onClick={()=>{setPostModal(false); setTrener(trener.name); setTrenerId(trener.id)}}>{trener.name}</span>
                            ))}


                         </motion.div>
                     }
                     </span>
            }

         <span className={css.btnSave} onClick={registration}>Зарегистрировать</span>
        </div>
    </div>
  )
}

export default AddUser