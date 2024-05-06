'use client'
import mobx from '@/mobx/mobx'
import css from './AddTests.module.css'
import {motion} from 'framer-motion'
import favorite from './img/favorite.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ErrorHandler } from '@/utils/ErrorHandler'
import arrow from './img/arrow.svg'
import TrainingUtills from '@/http/TrainingUtills'
import { observer } from 'mobx-react-lite'
import GroupUtills from '@/http/GroupUtills'


const AddTests = observer(() => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('кг')
  const [item, setItem] = useState('')
  const [typeModal, setTypeModal] = useState(false)
  const [groupModal, setGroupModal] = useState(false)
  const [group, setGroup] = useState([])
  const [groupId, setGroupId] = useState([])
  const [newGroup, setNewGroup] = useState([])
  const [addNewGroupModal, setAddNewGroupModal] = useState(false)


  useEffect(()=>{
    GroupUtills.getGroups()
    
  },[])

  useEffect(()=>{
    mobx.testGroups && setGroup(mobx.testGroups[0]?.name)
    mobx.testGroups && setGroupId(mobx.testGroups[0]?.id)
  },[mobx.testGroups])


  const AddGroup = async () => {
    if(newGroup){
      const formData = new FormData();
      formData.append('name', newGroup)
      mobx.user.id && formData.append('userId', mobx.user.id) 
      const data = await GroupUtills.createGroup(formData)
      if( data) {
        if(data === 'ok'){
          setAddNewGroupModal(false)
        }else if (data === 400){

        }else{
          ErrorHandler('Произошла ошибка!')
        }

      }
    }
  }

  const AddTest = async () => {
    if(!name || !description || !groupId){
      ErrorHandler('Заполните обязательные поля!')
      return
    }
    const formData = new FormData();
    name && formData.append('name', name) 
    description && formData.append('description', description) 
    type && formData.append('type', type) 
    item && formData.append('item', item) 
    groupId && formData.append('groupId', groupId)
    mobx.user.id && formData.append('userId', mobx.user.id)
    const data = await GroupUtills.createTest(formData)
  }




  return (
    <motion.div initial={{onPaste:0}} whileInView={{opacity:1}} className={css.container} onClick={()=>mobx.setAddTests(false)}>
        <motion.div initial={{x:200}} whileInView={{x:0}} transition={{duration:.2}} className={css.modalWind} onClick={e => e.stopPropagation()}>
            <div className={css.headerContainer}>
                 <h2 className={css.header}>Добавление теста / норматива</h2>
                 <div className={css.btn}>
                    <Image src={favorite} alt='Онлайн-Тренер' className={css.img}/>
                </div>
            </div>
            <div>
                <input type='text' className={`${css.input} ${css.name}`} placeholder='Название'  id="password" value={name} onChange={e => setName(e.target.value)} />
                <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние'  id="password" value={description} onChange={e => setDescription(e.target.value)} />
              </div>
              <h2 className={css.header}>Укажите значение норматива</h2>
              <div className={css.row}>
                <div className={css.inputColumn}>
                  <span className={css.miniInputLabel}>Единица измерения</span>
                  <div className={css.miniInput} onClick={()=>setTypeModal(!typeModal)}>
                      <span>{type}</span>
                      <Image src={arrow} className={css.arrowSvg} unoptimized />
                      {typeModal&&
                        <motion.div initial={{height:0,opacity:0,zIndex:0}} whileInView={{height:'auto',opacity:1,zIndex:99}} className={css.typeModal}>
                          <span onClick={()=>setType('кг')}>кг</span>
                          <span onClick={()=>setType('сек')}>сек</span>
                          <span onClick={()=>setType('мин')}>мин</span>
                          <span onClick={()=>setType('повторений')}>повторений</span>
                        </motion.div>
                      }
                  </div>
                </div>
                <div className={css.inputColumn}>
                  <span className={css.miniInputLabel}>Значение норматива</span>
                  <input type='text' className={`${css.miniInput}`} placeholder='40'  id="password" value={item} onChange={e => setItem(e.target.value)} />
                </div>
              </div>
              <h2 className={css.header}>Выберите группу</h2>
              <div className={`${css.miniInput} ${css.miniInput2}`} onClick={()=>setGroupModal(!groupModal)}>
                      <span>{group}</span>
                      <Image src={arrow} className={css.arrowSvg} unoptimized />
                      {groupModal&&
                        <motion.div initial={{height:0,opacity:0}} whileInView={{height:'auto',opacity:1}} className={css.typeModal}>
                         {mobx.testGroups.map(group => (
                            <span key={group.name} onClick={()=>{setGroup(group.name);setGroupId(group.id)}}>{group.name}</span>
                         ))}

                        </motion.div>
                      }
                  </div>
                  <span className={css.addNewGroup} onClick={()=>setAddNewGroupModal(!addNewGroupModal)}>Создать новую</span>
            <div className={css.btnSave} onClick={AddTest}>Сохранить</div>
            {addNewGroupModal&&
              <div className={css.addNewGroupModal}>
                 <input type='text' className={`${css.miniInput} ${css.miniInput2}`} placeholder='Название группы'  id="password" value={newGroup} onChange={e => setNewGroup(e.target.value)} />
                 <span className={css.addNewGroupButton} onClick={AddGroup}>Создать</span>
              </div>
            }

        </motion.div>
    </motion.div>
  )
})

export default AddTests