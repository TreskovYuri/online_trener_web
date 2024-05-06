'use client'
import mobx from '@/mobx/mobx'
import css from './AddPatern.module.css'
import {motion} from 'framer-motion'
import favorite from './img/favorite.svg'
import plus from './img/plus.svg'
import Image from 'next/image'
import { useState } from 'react'
import { ErrorHandler } from '@/utils/ErrorHandler'
import PatternUtills from '@/http/PatternUtills'


const AddPatern = () => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [recomendation, setRecomendation] = useState('')

  const [name1Flag, setName1Flag] = useState(true)
  const [name1, setName1] = useState('')
  const [description1, setDescription1] = useState('')
  const [name2Flag, setName2Flag] = useState(false)
  const [name2, setName2] = useState('')
  const [description2, setDescription2] = useState('')
  const [name3Flag, setName3Flag] = useState(false)
  const [name3, setName3] = useState('')
  const [description3, setDescription3] = useState('')
  const [name4Flag, setName4Flag] = useState(false)
  const [name4, setName4] = useState('')
  const [description4, setDescription4] = useState('')
  const [name5Flag, setName5Flag] = useState(false)
  const [name5, setName5] = useState('')
  const [description5, setDescription5] = useState('')
  const [name6Flag, setName6Flag] = useState(false)
  const [name6, setName6] = useState('')
  const [description6, setDescription6] = useState('')
  const [name7Flag, setName7Flag] = useState(false)
  const [name7, setName7] = useState('')
  const [description7, setDescription7] = useState('')


  const add = () => {
    if(name2Flag){
      if(name2Flag){
        if(name4Flag){
          if(name5Flag){
            if(name6Flag){
              setName7Flag(true)
            }else{setName6Flag(true)}
          }else{setName5Flag(true)}
        }else{setName4Flag(true)}
      }else{setName3Flag(true)}
    }else{setName2Flag(true)}
  }

  const save = async() => {
    if(!name || !description){
      ErrorHandler('Заполните обязательные поля!')
      return
    }
    const formData = new FormData();
    name ? formData.append('name', name) : formData.append('name', 111)
    description ? formData.append('description', description) : formData.append('description', 111)
    recomendation ? formData.append('recomendation', recomendation) : formData.append('recomendation', 111)
    name1 ? formData.append('name1', name1) : formData.append('name1', 111)
    description1 ? formData.append('description1', description1) : formData.append('description1', 111)
    name2 ? formData.append('name2', name2) : formData.append('name2', 111)
    description2 ? formData.append('description2', description2) : formData.append('description2', 111)
    name3 ? formData.append('name3', name3) : formData.append('name3', 111)
    description3 ? formData.append('description3', description3) : formData.append('description3', 111)
    name4 ? formData.append('name4', name4) : formData.append('name4', 111)
    description4 ? formData.append('description4', description4) : formData.append('description4', 111)
    name5 ? formData.append('name5', name5) : formData.append('name5', 111)
    description5 ? formData.append('description5', description5) : formData.append('description5', 111)
    name6 ? formData.append('name6', name6) : formData.append('name6', 111)
    description6 ? formData.append('description6', description6) : formData.append('description6', 111)
    name7 ? formData.append('name7', name7) : formData.append('name7', 111)
    description7 ? formData.append('description7', description7) : formData.append('description7', 111)
    const data = await PatternUtills.create(formData)
    if(data === 'ok'){
      mobx.setAddPattern(false)
    }
  }


  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setAddPattern(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>Новый шаблон</h2>
                 <div className={css.btn}>
                    <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
                </div>
            </div>
            <div>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name} onChange={e => setName(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description} onChange={e => setDescription(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Рекомендации'  id="password" value={recomendation} onChange={e => setRecomendation(e.target.value)} />
              </div>
              <div className={css.headerContainer}>
                 <h2 className={css.header}>Приемы пищи</h2>
                 <div className={css.btn} onClick={add}>
                    <Image src={plus} alt='Онлайн-Тренер' className={css.img}  />
                </div>
            </div>
            {name1Flag&&
              <div className={css.cardContainer1}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name1} onChange={e => setName1(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description1} onChange={e => setDescription1(e.target.value)} />
              </div>
            }
            {name2Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name2} onChange={e => setName2(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description2} onChange={e => setDescription2(e.target.value)} />
              </motion.div>
            }
            {name3Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name3} onChange={e => setName3(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description3} onChange={e => setDescription3(e.target.value)} />
              </motion.div>
            }
            {name4Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name4} onChange={e => setName4(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description4} onChange={e => setDescription4(e.target.value)} />
              </motion.div>
            }
            {name5Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name5} onChange={e => setName5(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description5} onChange={e => setDescription5(e.target.value)} />
              </motion.div>
            }
            {name6Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name6} onChange={e => setName6(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description6} onChange={e => setDescription6(e.target.value)} />
              </motion.div>
            }
            {name7Flag&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.cardContainer}>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name7} onChange={e => setName7(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description7} onChange={e => setDescription7(e.target.value)} />
              </motion.div>
            }
            <div className={css.btnSave} onClick={save}>Сохранить</div>

        </motion.div>
    </motion.div>
  )
}

export default AddPatern