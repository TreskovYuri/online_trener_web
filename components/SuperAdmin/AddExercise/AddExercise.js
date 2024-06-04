'use client'
import mobx from '@/mobx/mobx'
import css from './AddExercise.module.css'
import { motion } from 'framer-motion'
import favorite from './img/favorite.svg'
import plus from './img/plus.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ErrorHandler } from '@/utils/ErrorHandler'
import user from './img/img.png'
import TrainingUtills from '@/http/TrainingUtills'
import arrow from './img/arrow.svg'
import arrow1 from './img/arrow1.svg'
import Frame from './img/Frame.svg'
import frame_press from './img/frame_press.svg'
import frame_shea from './img/frame_shea.svg'
import frame_nogi from './img/frame_nogi.svg'
import frame_ikri from './img/frame_ikri.svg'
import frame_ruki from './img/frame_ruki.svg'
import frame_plechi from './img/frame_plechi.svg'
import frame_grud from './img/frame_grud.svg'
import frame_biceps from './img/frame_biceps.svg'
import frame_tricebs from './img/frame_tricebs.svg'
import frame_spina from './img/frame_spina.svg'
import frame_bedra from './img/frame_bedra.svg'
import frame_golen from './img/frame_golen.svg'
import frame_kisti from './img/frame_kisti.svg'
import noimg from './img/noimg.svg'
import novideo from './img/novideo.svg'
import spOff from './img/spOff.svg'
import spOn from './img/spOn.svg'
import { observer } from 'mobx-react-lite'


const AddExercise = () => {
  const [nameRu, setNameRu] = useState('')
  const [descriptionRu, setDescriptionRu] = useState('')
  const [nameEng, setNameEng] = useState('')
  const [descriptionEng, setDescriptionEng] = useState('')
  const [link, setLink] = useState('')
  const [file, setFile] = useState('')
  const [videofile, setVideoFile] = useState('')
  const [imageURL, setImageURL] = useState(null);
  const [videoURL, setVideoURL] = useState(null);
  const [equipments, setEquipments] = useState(['коврик', 'стул', 'роллер', 'гантели', 'стена', 'гири', 'штанги', 'медболы', 'фитболы', 'резиновые эспандеры'])
  const [finalEquipments, setFinalEquipments] = useState([])
  const [stage, setStage] = useState([])
  const [page, setPage] = useState(1)
  const [finalMuscleGrous, setFinalMuscleGrous] = useState([])

  const [pocazatel1Name, setPocazatel1Name] = useState('')
  const [pocazatel1Type, setPocazatel1Type] = useState('кг')
  const [pocazatel1SPFlag, setPocazatel1SPFlag] = useState(false)
  const [pocazatel2Name, setPocazatel2Name] = useState('')
  const [pocazatel2Type, setPocazatel2Type] = useState('кг')
  const [pocazatel2SPFlag, setPocazatel2SPFlag] = useState(false)
  const [pocazatel2Flag, setPocazatel2Flag] = useState(false)
  const [pocazatel3Name, setPocazatel3Name] = useState('')
  const [pocazatel3Type, setPocazatel3Type] = useState('кг')
  const [pocazatel3SPFlag, setPocazatel3SPFlag] = useState(false)
  const [pocazatel3Flag, setPocazatel3Flag] = useState(false)
  const [pocazatel4Name, setPocazatel4Name] = useState('')
  const [pocazatel4Type, setPocazatel4Type] = useState('кг')
  const [pocazatel4SPFlag, setPocazatel4SPFlag] = useState(false)
  const [pocazatel4Flag, setPocazatel4Flag] = useState(false)
  const [pocazatel5Name, setPocazatel5Name] = useState('')
  const [pocazatel5Type, setPocazatel5Type] = useState('кг')
  const [pocazatel5SPFlag, setPocazatel5SPFlag] = useState(false)
  const [pocazatel5Flag, setPocazatel5Flag] = useState(false)
  const [groupId, setGroupId] = useState([])

  useEffect(()=>{
    TrainingUtills.getExerciseGroups()
  },[])


  const addPocazatel = () => {
    if(pocazatel2Flag){
      if(pocazatel3Flag){
        if(pocazatel4Flag){
          setPocazatel5Flag(true)
        }else{
          setPocazatel4Flag(true)
        }
      }else{
        setPocazatel3Flag(true)
      }
    }else{
      setPocazatel2Flag(true)
    }
  }

  // Функция для созддания временного юрл для вновь загруженого изображения
  const handleImageUpload = (event) => {
    const fileUpload = event.target.files[0]
    setFile(fileUpload)
    if (fileUpload) {
      const imageURL = URL.createObjectURL(fileUpload);
      setImageURL(imageURL);
    }
  };
  // Функция для созддания временного юрл для вновь загруженого изображения
  const handleVideoUpload = (event) => {
    const fileUpload = event.target.files[0]
    setVideoFile(fileUpload)
    if (fileUpload) {
      const videoURL = URL.createObjectURL(fileUpload);
      setVideoURL(videoURL);
    }
  };

  const next = () => {
    setPage(page+1)
  }

  const save = async () => {
    if (!nameRu || !nameEng) {
      ErrorHandler('Заполните обязательные поля!')
      return
    }
    const formData = new FormData();
    nameRu && formData.append('nameRu', nameRu) 
    descriptionRu && formData.append('descriptionRu', descriptionRu) 
    nameEng && formData.append('nameEng', nameEng) 
    descriptionEng && formData.append('descriptionEng', descriptionEng) 
    link && formData.append('link', link) 
    file && formData.append('img', file) 
    videofile && formData.append('video', videofile) 
    stage && formData.append('stage', JSON.stringify(stage)) 
    finalEquipments && formData.append('equipments', JSON.stringify(finalEquipments)) 
    groupId && formData.append('groupId', groupId) 
    finalMuscleGrous && formData.append('musclegroups', JSON.stringify(finalMuscleGrous)) 
    pocazatel1Name && formData.append('pocazatel1Name', pocazatel1Name) 
    pocazatel1Type && formData.append('pocazatel1Type', pocazatel1Type) 
    pocazatel1SPFlag && formData.append('pocazatel1SPFlag', pocazatel1SPFlag) 
    pocazatel2Name && formData.append('pocazatel2Name', pocazatel2Name) 
    pocazatel2Type && formData.append('pocazatel2Type', pocazatel2Type) 
    pocazatel2SPFlag && formData.append('pocazatel2SPFlag', pocazatel2SPFlag) 
    pocazatel3Name && formData.append('pocazatel3Name', pocazatel3Name) 
    pocazatel3Type && formData.append('pocazatel3Type', pocazatel3Type) 
    pocazatel3SPFlag && formData.append('pocazatel3SPFlag', pocazatel3SPFlag) 
    pocazatel4Name && formData.append('pocazatel4Name', pocazatel4Name) 
    pocazatel4Type && formData.append('pocazatel4Type', pocazatel4Type) 
    pocazatel4SPFlag && formData.append('pocazatel4SPFlag', pocazatel4SPFlag) 
    pocazatel5Name && formData.append('pocazatel5Name', pocazatel5Name) 
    pocazatel5Type && formData.append('pocazatel5Type', pocazatel5Type) 
    pocazatel5SPFlag && formData.append('pocazatel5SPFlag', pocazatel5SPFlag) 

    


    const data = await TrainingUtills.createExercise(formData)
    if (data === 'ok') {
      mobx.setAddPattern(false)
    }
  }


  return (
    <motion.div initial={{ onPaste: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setAddExercise(false)}>
      <motion.div initial={{ x: 200 }} whileInView={{ x: 0 }} transition={{ duration: .2 }} className={css.modalWind} onClick={e => e.stopPropagation()}>
        {page>1 && <div className={css.exit} onClick={()=>setPage(page-1)}>{`< Назад`}</div>}
        <div className={css.headerContainer}>

          {page == 4 ?
            <h2 className={css.header}>Добавьте показатели</h2> :
            <h2 className={css.header}>Добавление упражнения</h2>
          }
          <div className={css.btnContainer}>
          {
              page == 4 &&
              <div className={css.btn} onClick={addPocazatel}>
                <Image src={plus} alt='Онлайн-Тренер' className={css.img} />
              </div>
            }
            <div className={css.btn}  >
              <Image src={favorite} alt='Онлайн-Тренер' className={css.img} />
            </div>


          </div>

        </div>
        {
          page == 1 &&
          <Page1 nameRu={nameRu} setNameRu={setNameRu} descriptionRu={descriptionRu} setDescriptionRu={setDescriptionRu}
          nameEng={nameEng} setNameEng={setNameEng} descriptionEng={descriptionEng} setDescriptionEng={setDescriptionEng}
           next={next} equipments={equipments} setEquipments={setEquipments}
            stage={stage} setStage={setStage} finalEquipments={finalEquipments} setFinalEquipments={setFinalEquipments} />
        }
        {
          page == 2 &&
          <Page2 next={next} finalMuscleGrous={finalMuscleGrous} setFinalMuscleGrous={setFinalMuscleGrous} />
        }
        {
          page == 3 &&
          <Page3 next={next} handleImageUpload={handleImageUpload} handleVideoUpload={handleVideoUpload} imageURL={imageURL} videoURL={videoURL} file={file} videofile={videofile}
            link={link} setLink={setLink}/>
        }
        {
          page == 4 &&
          <Page4 next={next}
            pocazatel1Name={pocazatel1Name} setPocazatel1Name={setPocazatel1Name} pocazatel1Type={pocazatel1Type} setPocazatel1Type={setPocazatel1Type} pocazatel1SPFlag={pocazatel1SPFlag} setPocazatel1SPFlag={setPocazatel1SPFlag}
            pocazatel2Name={pocazatel2Name} setPocazatel2Name={setPocazatel2Name} pocazatel2Type={pocazatel2Type} setPocazatel2Type={setPocazatel2Type} pocazatel2SPFlag={pocazatel2SPFlag} setPocazatel2SPFlag={setPocazatel2SPFlag}
            pocazatel3Name={pocazatel3Name} setPocazatel3Name={setPocazatel3Name} pocazatel3Type={pocazatel3Type} setPocazatel3Type={setPocazatel3Type} pocazatel3SPFlag={pocazatel3SPFlag} setPocazatel3SPFlag={setPocazatel3SPFlag}
            pocazatel4Name={pocazatel4Name} setPocazatel4Name={setPocazatel4Name} pocazatel4Type={pocazatel4Type} setPocazatel4Type={setPocazatel4Type} pocazatel4SPFlag={pocazatel4SPFlag} setPocazatel4SPFlag={setPocazatel4SPFlag}
            pocazatel5Name={pocazatel5Name} setPocazatel5Name={setPocazatel5Name} pocazatel5Type={pocazatel5Type} setPocazatel5Type={setPocazatel5Type} pocazatel5SPFlag={pocazatel5SPFlag} setPocazatel5SPFlag={setPocazatel5SPFlag}
            pocazatel2Flag={pocazatel2Flag} setPocazatel2Flag={setPocazatel2Flag} pocazatel3Flag={pocazatel3Flag} setPocazatel3Flag={setPocazatel3Flag} pocazatel4Flag={pocazatel4Flag} setPocazatel4Flag={setPocazatel4Flag}
            pocazatel5Flag={pocazatel5Flag} setPocazatel5Flag={setPocazatel5Flag} groupId={groupId} setGroupId={setGroupId} save={save}
          />
        }




      </motion.div>
    </motion.div>
  )
}

export default AddExercise



const Page1 = ({ nameRu, setNameRu, descriptionRu, setDescriptionRu,nameEng, setNameEng, descriptionEng, setDescriptionEng, next, equipments, setEquipments, stage, setStage, finalEquipments, setFinalEquipments }) => {
  const [inputTypeFlag, setInputTypeFlag] = useState(true)
  const [modal, setModal] = useState(false)
  const [addEqInput, setAddEqInput] = useState('')

  const addDelEquipments = (eq) => {
    if (stage.includes(eq)) {
      setStage(stage.filter(el => el != eq))
    } else {
      setStage([...stage, eq])
    }
  }

  const includesEq = (eq) => {
    if (finalEquipments.includes(eq)) {
      setFinalEquipments(finalEquipments.filter(el => el != eq))
    } else {
      setFinalEquipments([...finalEquipments, eq])
    }
  }

  const addNewEq = () => {
    setModal(false)
    if (!equipments.includes(addEqInput) && addEqInput) {
      setEquipments([...equipments, addEqInput])
    } else {
      ErrorHandler('Такой элемент уже есть в списке!')
    }
    setAddEqInput("")
  }

  return (
    <div>
      <div className={css.inputTypeContainer}>
        <span className={inputTypeFlag ? `${css.inputTypeLabel} ${css.activeInputTypeLabel}` : css.inputTypeLabel} onClick={() => setInputTypeFlag(!inputTypeFlag)}>Русский</span>
        <span className={!inputTypeFlag ? `${css.inputTypeLabel} ${css.activeInputTypeLabel}` : css.inputTypeLabel} onClick={() => setInputTypeFlag(!inputTypeFlag)}>English</span>
      </div>
      {
        inputTypeFlag ?
          <>
            <input type='text' className={`${css.input} ${css.name}`} placeholder='Название' id="password" value={nameRu} onChange={e => setNameRu(e.target.value)} />
            <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние' id="password" value={descriptionRu} onChange={e => setDescriptionRu(e.target.value)} />
          </> :
          <>
            <input type='text' className={`${css.input} ${css.name}`} placeholder='Title' id="password" value={nameEng} onChange={e => setNameEng(e.target.value)} />
            <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Description' id="password" value={descriptionEng} onChange={e => setDescriptionEng(e.target.value)} />
          </>
      }
      <h2 className={css.equipmentLabel}>Выберите этап</h2>
      <div className={css.equipmentContainner}>
        <span className={css.equipment} onClick={() => addDelEquipments('Разминка')}>Разминка{stage.includes('Разминка') && <Image src={arrow} />}</span>
        <span className={css.equipment} onClick={() => addDelEquipments('Упражнение')}>Упражнение{stage.includes('Упражнение') && <Image src={arrow} />}</span>
        <span className={css.equipment} onClick={() => addDelEquipments('Заминка')}>Заминка{stage.includes('Заминка') && <Image src={arrow} />}</span>
      </div>
      <h2 className={css.equipmentLabel}>Выберите оборудование</h2>
      <div className={css.stageContainer}>
        {
          equipments.map(el => (
            <div className={finalEquipments.includes(el) ? `${css.stage} ${css.stageActive}` : css.stage} onClick={() => includesEq(el)} key={el}>{el}</div>
          ))
        }
        <div className={css.stage} onClick={() => setModal(true)}>+</div>
      </div>
      {
        modal &&
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.addEqModalContainer} onClick={() => setModal(false)}>
          <div className={css.addEqModal} onClick={e => e.stopPropagation()}>
            <input type='text' className={`${css.input} ${css.name}`} placeholder='Название оборудования' id="password" value={addEqInput} onChange={e => setAddEqInput(e.target.value)} />
            <div className={css.btnAddEq} onClick={addNewEq}>Добавить</div>
          </div>
        </motion.div>
      }
      <div className={css.btnSave} onClick={next}>Далее</div>
    </div>
  )
}

const Page2 = ({ finalMuscleGrous, setFinalMuscleGrous, next }) => {
  const [group, seyGroup] = useState(['Пресс', 'Шея', 'Ноги', 'Икры', 'Руки', 'Плечи', 'Грудь', 'Бицепс', 'Трицепс', 'Спина', 'Бедра', 'Голень', 'Кисти'])

  const addDelEquipments = (eq) => {
    if (finalMuscleGrous.includes(eq)) {
      setFinalMuscleGrous(finalMuscleGrous.filter(el => el != eq))
    } else {
      setFinalMuscleGrous([...finalMuscleGrous, eq])
    }
  }

  return (
    <div>
      <h2 className={css.equipmentLabel}>Выберите группу мыщц</h2>
      <div className={css.frameContainer}>
        <Image src={Frame} className={css.frame} />
        {finalMuscleGrous.includes('Пресс') && <Image src={frame_press} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Шея') && <Image src={frame_shea} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Ноги') && <Image src={frame_nogi} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Икры') && <Image src={frame_ikri} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Руки') && <Image src={frame_ruki} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Плечи') && <Image src={frame_plechi} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Грудь') && <Image src={frame_grud} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Бицепс') && <Image src={frame_biceps} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Трицепс') && <Image src={frame_tricebs} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Спина') && <Image src={frame_spina} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Бедра') && <Image src={frame_bedra} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Голень') && <Image src={frame_golen} className={css.frameAbs} />}
        {finalMuscleGrous.includes('Кисти') && <Image src={frame_kisti} className={css.frameAbs} />}

      </div>
      <div className={css.groupCatdContainer}>
        {
          group.map(el => (
            <div className={finalMuscleGrous.includes(el) ? `${css.groupCard} ${css.groupCardActive}` : css.groupCard} key={el} onClick={() => addDelEquipments(el)}>{el}</div>
          ))
        }
      </div>

      <div className={css.btnSave} onClick={next}>Далее</div>
    </div>
  )
}


const Page3 = ({ handleImageUpload, handleVideoUpload, imageURL, videoURL, file, videofile, link, next, setLink }) => {




  return (
    <div>

      <h2 className={css.equipmentLabel}>Добавьте изображение и видео</h2>
      <div className={css.fileInput}>
              <input type="file" id="file" onChange={handleImageUpload} className={css.file} required/>
              <label  htmlFor="file" className={css.labelFile}>
              {file&&
                    <Image alt={`Аватар пользователя: `}  src={imageURL ? imageURL : noimg} className={css.trainingImg}  width={10} height={10}   unoptimized/>
                }
                    {!file&&
                    <Image alt={`Аватар пользователя: `}  src={imageURL ? imageURL: noimg} className={css.novideImg}  width={10} height={10}  unoptimized/>
                }
              </label>
            </div>
      <div className={css.fileInput}>
        <input type="file" id="file1" onChange={handleVideoUpload} className={css.file} required />
        <label htmlFor="file1" className={css.labelFile}>
          {videofile &&
            <video alt={`Аватар пользователя: ${name}`} className={css.trainingVideo} width={10} height={10} unoptimized><source src={videoURL ? videoURL : `${process.env.NEXT_PUBLIC_STATIC_URL}/assets/video.aca`} type="video/mp4" /></video>
          }
          {!videofile &&
            <Image src={novideo} className={css.novideImg} alt='' />
          }
        </label>
      </div>
      <span className={css.preHeader}>или</span>
      <input type='text' className={`${css.input} ${css.name}`} placeholder='Добавьте ссылку YouTube' id="password" value={link} onChange={e => setLink(e.target.value)} />

      <div className={css.btnSave} onClick={next}>Далее</div>
    </div>
  )
}
const Page4 = observer(({
  pocazatel1Name, setPocazatel1Name, pocazatel1Type, setPocazatel1Type, pocazatel1SPFlag, setPocazatel1SPFlag,
  pocazatel2Name, setPocazatel2Name, pocazatel2Type, setPocazatel2Type, pocazatel2SPFlag, setPocazatel2SPFlag,
  pocazatel3Name, setPocazatel3Name, pocazatel3Type, setPocazatel3Type, pocazatel3SPFlag, setPocazatel3SPFlag,
  pocazatel4Name, setPocazatel4Name, pocazatel4Type, setPocazatel4Type, pocazatel4SPFlag, setPocazatel4SPFlag,
  pocazatel5Name, setPocazatel5Name, pocazatel5Type, setPocazatel5Type, pocazatel5SPFlag, setPocazatel5SPFlag,
  pocazatel2Flag, setPocazatel2Flag, pocazatel3Flag, setPocazatel3Flag, pocazatel4Flag, setPocazatel4Flag, pocazatel5Flag, setPocazatel5Flag,
  groupId, setGroupId, save
}) => {
  const [group, setGroup] = useState([])
  const [groupModal, setGroupModal] = useState(false)
  const [addNewGroupModal, setAddNewGroupModal] = useState(false)
  const [newGroup, setNewGroup] = useState([])
  

  const addGroup = () => {
    const formData = new FormData();
    newGroup && formData.append('name', newGroup)

    TrainingUtills.createExerciseGroups(formData)
    setNewGroup('')
    setAddNewGroupModal(false)
  }

  return (
    <div className={css.pageContainer}>
      <CardPokazatel name={pocazatel1Name} setName={setPocazatel1Name} pocazatelType={pocazatel1Type} setPocazatelType={setPocazatel1Type} pocazatelSPFlag={pocazatel1SPFlag} setPocazatelSPFlag={setPocazatel1SPFlag}/>  
      {
        pocazatel2Flag && 
        <CardPokazatel name={pocazatel2Name} setName={setPocazatel2Name} pocazatelType={pocazatel2Type} setPocazatelType={setPocazatel2Type} pocazatelSPFlag={pocazatel2SPFlag} 
        setPocazatelSPFlag={setPocazatel2SPFlag}/>
      }
      {
        pocazatel3Flag && 
        <CardPokazatel name={pocazatel3Name} setName={setPocazatel3Name} pocazatelType={pocazatel3Type} setPocazatelType={setPocazatel3Type} pocazatelSPFlag={pocazatel3SPFlag} 
        setPocazatelSPFlag={setPocazatel3SPFlag}/>
      }
      {
        pocazatel4Flag && 
        <CardPokazatel name={pocazatel4Name} setName={setPocazatel4Name} pocazatelType={pocazatel4Type} setPocazatelType={setPocazatel4Type} pocazatelSPFlag={pocazatel4SPFlag} 
        setPocazatelSPFlag={setPocazatel4SPFlag}/>
      }
      {
        pocazatel5Flag && 
        <CardPokazatel name={pocazatel5Name} setName={setPocazatel5Name} pocazatelType={pocazatel5Type} setPocazatelType={setPocazatel5Type} pocazatelSPFlag={pocazatel5SPFlag} 
        setPocazatelSPFlag={setPocazatel5SPFlag}/>
      }
       <h2 className={css.header}>Выберите группу</h2>
              <div className={`${css.miniInput} ${css.miniInput2}`} onClick={()=>setGroupModal(!groupModal)}>
                      <span>{group}</span>
                      <Image src={arrow1} className={css.arrowSvg} unoptimized />
                      {groupModal&&
                        <motion.div initial={{height:0,opacity:0}} whileInView={{height:'auto',opacity:1}} className={css.typeModal}>
                         {mobx.ExerciseGrpupss.map(group => (
                            <span key={group.name} onClick={()=>{setGroup(group.name);setGroupId(group.id)}}>{group.name}</span>
                         ))}

                        </motion.div>
                      }
                  </div>
                  <span className={css.addNewGroup} onClick={()=>setAddNewGroupModal(!addNewGroupModal)}>Создать новую</span>
            <div className={css.btnSave} onClick={()=>{}}>Сохранить</div>
            {addNewGroupModal&&
              <div className={css.addNewGroupModal}>
                 <input type='text' className={`${css.miniInput} ${css.miniInput2}`} placeholder='Название группы'  id="password" value={newGroup} onChange={e => setNewGroup(e.target.value)} />
                 <span className={css.addNewGroupButton} onClick={addGroup}>Создать</span>
              </div>
            }
      <div className={css.btnSave} onClick={save}>Сохранить</div>



    </div>
  )
})


function CardPokazatel ({name,setName,pocazatelType,setPocazatelType,pocazatelSPFlag,setPocazatelSPFlag}){
  const [typesLst, setTypesLst] = useState(['кг', 'сек', 'мин', 'раз','шт','см','процентов','км/ч',])
  const [type1Modal, setType1Modal] = useState(false)

  return (
    <>
    <div className={css.label1}></div>
    <input type='text' className={`${css.input} ${css.name}`} placeholder='Название' id="password" value={name} onChange={e => setName(e.target.value)} />
    <span className={css.label1}>Единица измерения</span>
    <div className={`${css.input} ${css.burgerContainer}`} onClick={() => setType1Modal(!type1Modal)}>
      {pocazatelType}
      {type1Modal && <div className={css.modalUpdateType}>
        {
          typesLst.map(el => (
            <span key={el} onClick={() => setPocazatelType(el)}>{el}</span>
          ))
        }
      </div>}
      <Image src={arrow1} className={css.arrow} /></div>
    <div className={css.spContainer}>
      <span>Свободный показатель</span>
      {pocazatelSPFlag ?
        <Image src={spOn} className={css.spFlagImg} onClick={() => setPocazatelSPFlag(!pocazatelSPFlag)} /> :
        <Image src={spOff} className={css.spFlagImg} onClick={() => setPocazatelSPFlag(!pocazatelSPFlag)} />
      }
    </div>
  </>
  )
}