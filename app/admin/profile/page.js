"use client"
import mobx from '@/mobx/mobx'
import css from './profile.module.css'
import { observer } from 'mobx-react-lite'
import user from './img/user.jpg'
import Image from 'next/image'
import InputMask from 'react-input-mask';
import { useEffect, useState } from 'react'
import isEmail from 'validator/lib/isEmail'
import UserUtills from '@/http/UserUtills'
import {motion} from 'framer-motion'

export  const dynamic = 'force-dynamic'

const page = observer(() => {
  const [name, setName] = useState('')
  const [date, setDate] = useState('')
  const [post, setPost] = useState('')
  const [team, setTeam] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [file, setFile] = useState('')
  const [imageURL, setImageURL] = useState(null);

  useEffect(()=>{
    mobx.setPageName('Профиль')
    mobx.user.name && setName(mobx.user.name)
    mobx.user.date && setDate(mobx.user.date.split(' ')[0])
    mobx.user.post && setPost(mobx.user.post)
    mobx.user.team && setTeam(mobx.user.team)
    mobx.user.number && setNumber(mobx.user.number)
    mobx.user.email && setEmail(mobx.user.email)
    mobx.user.img? setImageURL(`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${mobx.user.img}`):null
},[mobx.user])

  // Функция для созддания временного юрл для вновь загруженого изображения
  const handleImageUpload = (event) => {
    const fileUpload = event.target.files[0]
    setFile(fileUpload)
    if (fileUpload) {
      const imageURL = URL.createObjectURL(fileUpload);
      setImageURL(imageURL);
    }
  };


  const update = async () => {
    const formData = new FormData();
    mobx.user.id && formData.append('id', mobx.user.id)
    name ? formData.append('name', name) : formData.append('name', 111)
    date ? formData.append('date', date) : formData.append('date', 111)
    post ? formData.append('post', post) : formData.append('post', 111)
    team ? formData.append('team', team) : formData.append('team', 111)
    number ? formData.append('number', number) : formData.append('number', 111)
    email && isEmail(email) ? formData.append('email', email) : formData.append('email', 111)
    file ? formData.append('img', file) : null
    const data = await UserUtills.userUpdate(formData)
    if(data){
      UserUtills.check()
    }
  }

  return (
    <div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.modalWind}>
        <div className={css.imgContainer}>
        <div className={css.fileInput}>
          <input type="file" id="file" onChange={handleImageUpload} className={css.file} required/>
          <label  htmlFor="file" className={css.labelFile}>
          {file&&
                <Image alt={`Аватар пользователя: ${name}`}  src={imageURL ? imageURL : user} className={css.userImg}  width={10} height={10}   unoptimized/>
            }
                {!file&&
                <Image alt={`Аватар пользователя: ${name}`}  src={imageURL ? imageURL: user} className={css.userImg}  width={10} height={10}  unoptimized/>
            }
          </label>
        </div>

          <div className={css.descrContainer}>
            {mobx.user.name ?
              <h2 className={css.Username}>{`${mobx.user.name}`}</h2> :
              <h2 className={css.Username}>Нет данных</h2>
            }
            <div className={css.row}>
              <div className={css.posts}>{mobx.user.post}</div>
              <div className={css.posts}>{mobx.user.team}</div>
            </div>
          </div>
        </div>
        <div className={css.formContainer}>
            <span className={css.formHeader}>Персональные данные</span>
            <div className={`${css.inputContainer}` }>
                <input type='text' style={{cursor:'pointer'}} className={css.input} value={name} onChange={e => setName(e.target.value)}  id="password" placeholder='нет данных' />
                <label className={css.label} htmlFor="password">ФИО</label>
            </div>
            <div className={`${css.inputContainer}` }>
                <input type='date'  className={css.input} value={date} onChange={e => setDate(e.target.value)}  id="password" placeholder='нет данных' />
                <label className={css.label} htmlFor="password">Дата рождения</label>
            </div>
            <div className={`${css.inputContainer}` }>
              <input type='text' className={css.input} value={post} onChange={e => setPost(e.target.value)}  id="password" placeholder='нет данных' disabled/>
              <label className={css.label} htmlFor="password">Должность</label>
            </div>
            <div className={`${css.inputContainer}` }>
              <input type='text' className={css.input} value={team} onChange={e => setTeam(e.target.value)}  id="password" placeholder='нет данных' />
              <label className={css.label} htmlFor="password">Команда</label>
            </div>
        </div>
        <div className={css.formContainer}>
            <span className={css.formHeader}>Безопасность и вход</span>
            <div className={`${css.inputContainer}` }>
              <InputMask   type='text' className={css.input} value={number} onChange={e => setNumber(e.target.value)} placeholder='нет данных' mask={'+7(999) 999-99-99'}  id="password" />
              <label className={css.label} htmlFor="password">Номер телефона</label>
            </div>
            <div className={`${css.inputContainer}` }>
              <input type='text' className={css.input} value={email} onChange={e => setEmail(e.target.value)} placeholder='нет данных' id="password" />
              <label className={css.label} htmlFor="password">Почта</label>
            </div>
            <div className={css.btnContainer}>
              <span className={css.save} onClick={update}>Сохранить</span>
              <span className={css.delete}>Удалить аккаунт</span>
            </div>
            
        </div>
      </motion.div>
    </div>
  )
})

export default page
