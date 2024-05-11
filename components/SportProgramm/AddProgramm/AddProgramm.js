'use client'
import mobx from '@/mobx/mobx'
import css from './AddProgramm.module.css'
import { motion } from 'framer-motion'
import favorite from './img/favorite.svg'
import plus from './img/plus.svg'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ErrorHandler } from '@/utils/ErrorHandler'
import PatternUtills from '@/http/PatternUtills'
import { observer } from 'mobx-react-lite'
import TrainingUtills from '@/http/TrainingUtills'
import GroupUtills from '@/http/GroupUtills'
import WeekCalendar from '../WeekCalendar/WeekCalendar'
import UserUtills from '@/http/UserUtills'
import searchImg from './img/search.svg'
import checkOff from './img/checkOff.svg'
import checkOn from './img/checkOn.svg'
import user from './img/user.jpg'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import { useRouter } from 'next/navigation'
import Modal from './Modal'

export const dynamic = 'force-dynamic'

const pluralize = (number, one, two, five) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return two;
  } else {
    return five;
  }
};

const countHandler = (one, two, three, four, five, six, seven) => {
  let count = 0;
  one && count++;
  two && count++;
  three && count++;
  four && count++;
  five && count++;
  six && count++;
  seven && count++;
  return `${count} ${pluralize(count, 'прием', 'приема', 'приемов')} пищи`;
};

const countHandler1 = (id) => {
  let count = 0;
  mobx.trainingBelongs.forEach(belong => {
    if (belong.programmId == id) {
      count++
    }
  })
  return `${count} ${pluralize(count, 'упражнение', 'упражнения', 'упражнений')}`;
};






const AddProgramm = observer(() => {
  const router = useRouter()

  const [page, setPage] = useState(1)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')


  useEffect(() => {
    PatternUtills.getAllNutrition()
    TrainingUtills.getTrainingPattern()
    TrainingUtills.getTrainingBelongs()
    TrainingUtills.getExercise()
    GroupUtills.getTests()
    TrainingUtills.getTestTrainingPatternBelongs()
    GroupUtills.getGroups()
    UserUtills.getSportsmans()
    mobx.setFinalExersiceArrayOnDragAndDrop([])
    mobx.setFinalNutritionArrayOnDragAndDrop ([])
    mobx.setFinalTestsArrayOnDragAndDrop([])
    mobx.setFinalUsersArrayOnDragAndDrop([])
  }, [])


  const nextPage = () => {
    if (page === 2) {
      setPage(3)
    } else {
      setPage(2)
      mobx.setPageName(name)
    }
  }

  const prevPage = () => {
    if (page === 2) {
      setPage(1)
    } else {
      setPage(2)
    }
  }



  const save = async () => {
    // mobx.finalExersiceArrayOnDragAndDrop.forEach(el => {
    //   console.log(el.date)
    // })
    // mobx.finalNutritionArrayOnDragAndDrop.forEach(el => {
    //   console.log(el.date)
    // })
    // mobx.finalTestsArrayOnDragAndDrop.forEach(el => {
    //   console.log(el.date)
    // })

    const formData = new FormData();
    name && formData.append('name', name) 
    description && formData.append('description', description) 
    mobx.finalExersiceArrayOnDragAndDrop && formData.append('exersices', JSON.stringify(mobx.finalExersiceArrayOnDragAndDrop)) 
    mobx.finalNutritionArrayOnDragAndDrop && formData.append('nutritions', JSON.stringify(mobx.finalNutritionArrayOnDragAndDrop)) 
    mobx.finalTestsArrayOnDragAndDrop && formData.append('tests', JSON.stringify(mobx.finalTestsArrayOnDragAndDrop)) 
    mobx.finalUsersArrayOnDragAndDrop && formData.append('users', JSON.stringify(mobx.finalUsersArrayOnDragAndDrop)) 

    const data = await SportProgrammUtills.create(formData)
    if (data === 'ok') {
      router.push('/admin/sportprogramm')
    }
  }


  return (

    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setAddProgramm(false)}>
      <div className={css.body}>
        <WeekCalendar />
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.modalWind} onClick={e => e.stopPropagation()}>

        {page == 1 && <Page1 nextPage={nextPage} prevPage={prevPage} name={name} setName={setName} description={description} setDescription={setDescription} />}
        {page == 2 && <Page2 nextPage={nextPage} prevPage={prevPage} />}
        {page == 3 && <Page3 nextPage={nextPage} prevPage={prevPage} save={save}/>}

        {mobx.cardUpdateExerciseFlag&&<Modal/>}

      </motion.div>
    </motion.div>
  )
})

export default AddProgramm






function Page1({ name, setName, description, setDescription ,nextPage}) {

  const next = () => {
    if( name ){
      nextPage()
    }else{
      ErrorHandler('Введите название программы!')
    }
  }


  return (
    <motion>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Новыя программа</h2>
        <div className={css.btn}>
          <Image src={favorite} alt='Онлайн-Тренер' className={css.img} />
        </div>
      </div>
      <div>
        <input type='text' className={`${css.input} ${css.name}`} placeholder='Название' id="password" value={name} onChange={e => setName(e.target.value)} />
        <textarea type='text' className={`${css.input} ${css.descr}`} placeholder='Описние' id="password" value={description} onChange={e => setDescription(e.target.value)} />
      </div>
      <div className={css.btnSave} onClick={next}>Далее</div>
    </motion>

  )
}


const Page2 = observer(({ nextPage, prevPage }) => {
  const [page, setPage] = useState('Питание')
  const [time, setTime] = useState('')
  const [sets, setSets] = useState('')
  const [updateCard, setUpdateCard] = useState({})
  const [modalUpdateExercise, setModalUpdateExercise] = useState(false)
  const [search, setSearch] = useState('')

  const [setsObject, setSetsObject] = useState([])
  const [exesiceId, setExesiceId] = useState([])
  const [globalExersicesArray, setGlobalExersicesArray] = useState([])
  const [nutritions, setNutritions] = useState([])
  const [trainingPatterns, setTrainingPatterns] = useState([])
  const [exercises, setExercises] = useState([])
  const [tests, setTests] = useState([])




  const searchHandler = (e) => {
    setSearch(e)
    if (page === 'Питание'){
      if (e) {
        const results = mobx.nutritions.filter(nutrition =>
          nutrition.name?.toLowerCase().includes(e.toLowerCase())
        );
        setNutritions(results);
      } else {
        setNutritions(mobx.nutritions);
      }
    }else if (page === 'Тренировки'){
      if (e) {
        const results = mobx.trainingPatterns.filter(trainingPattern =>
          trainingPattern.name?.toLowerCase().includes(e.toLowerCase())
        );
        setTrainingPatterns(results);
      } else {
        setTrainingPatterns(mobx.trainingPatterns);
      }
    }else if (page === 'Упражнения'){
      if (e) {
        const results = mobx.exercises.filter(exercise =>
          exercise.nameRu?.toLowerCase().includes(e.toLowerCase())
        );
        setExercises(results);
      } else {
        setExercises(mobx.exercises);
      }
    }else if (page === 'Тесты'){
      if (e) {
        const results = mobx.tests.filter(test =>
          test.name?.toLowerCase().includes(e.toLowerCase())
        );
        setTests(results);
      } else {
        setTests(mobx.tests);
      }
    }
    
  }

  useEffect(()=>{
    setNutritions(mobx.nutritions)
  },[mobx.nutritions])
  useEffect(()=>{
    setTrainingPatterns(mobx.trainingPatterns)
  },[mobx.trainingPatterns])
  useEffect(()=>{
    setExercises(mobx.exercises)
  },[mobx.exercises])
  useEffect(()=>{
    setTests(mobx.tests)
  },[mobx.tests])

  const openUpdateModal = async (exercise) => {
    const obj = await setsObject.find(obj => obj.id === exercise.id)
    if (obj) {
      setSets(obj.sets)
      setTime(obj.time)
    } else {
      setSets('4x15')
      setTime('30 сек')
    }
    setModalUpdateExercise(true)
    setUpdateCard(exercise)
  }




  return (
    <>
      <span className={css.exit} onClick={prevPage}>{`< Назад`}</span>
      <div className={css.headerContainer}>

        <h2 className={css.header}>Заполните программу</h2>
        <div className={css.btn}>
          <Image src={favorite} alt='Онлайн-Тренер' className={css.img} />
        </div>
      </div>
      <div  viewport={{ once: true }} className={css.searchContainer}>
        <Image src={searchImg} className={css.search} alt='Онлайн-Тренер' />
        <input placeholder='Найти...' type='text' className={css.inputSearch} value={search} onChange={e => searchHandler(e.target.value)} />
      </div>
      <div className={css.navBarContainer}>
        <span className={page === 'Питание' ? css.activeNav : ''} onClick={() => setPage('Питание')}>Питание</span>
        <span className={page === 'Тренировки' ? css.activeNav : ''} onClick={() => setPage('Тренировки')}>Тренировки</span>
        <span className={page === 'Упражнения' ? css.activeNav : ''} onClick={() => setPage('Упражнения')}>Упражнения</span>
        <span className={page === 'Тесты' ? css.activeNav : ''} onClick={() => setPage('Тесты')}>Тесты</span>
      </div>
      {
        page === 'Питание' &&
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {
            nutritions.map(nutrition => (
              <div key={nutrition.id} className={css.card} draggable onDrag={e => { mobx.setDragNutritionFlag(true); mobx.setDropAndDropArrayNutrition(nutrition) }}>
                <h3 className={css.cardHeader}>{nutrition.name}</h3>
                <span className={css.count}>
                  {countHandler(nutrition.name1, nutrition.name2, nutrition.name3, nutrition.name4, nutrition.name5, nutrition.name6, nutrition.name7)}
                </span>
              </div>
            ))
          }
        </div>
      }
      {
        page === 'Тренировки' && (
          <div
            className={css.cardContainer}
            onDragOver={(e) => e.preventDefault()} // добавлен обработчик события onDragOver
          >
            {trainingPatterns &&
              trainingPatterns.map((card, index) => (
                <motion.div
                  draggable={true}
                  onDrag={(e) => {
                    mobx.setDragValue({
                      'training':mobx.trainingBelongs.filter(el => el.programmId == card.id),
                      "tests":mobx.testBelongs.filter(el => el.programmId == card.id)
                    }
                    );
                    mobx.setDragFlag(true)
                  }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  key={card.id}
                  className={css.card}
                  onClick={() => {
                    mobx.setOneTrainingPattern(card);
                    mobx.setTrainongDetails(true);
                  }}
                >
                  <h3 className={css.cardHeader}>{card.name}</h3>
                  <span className={css.count}>{countHandler1(card.id)}</span>
                </motion.div>
              ))}

          </div>
        )
      }

      {
        page === 'Упражнения' &&
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {
            exercises?.map(exercise => (
              <div key={exercise.id} className={exesiceId.includes(exercise.id) ? `${css.exerciseCard} ${css.exerciseCardAdded}` : `${css.exerciseCard}`} draggable={globalExersicesArray.find(el => el.exerciseId == exercise.id)?true:false} onDrag={(e) => {
                mobx.setDragExersicesValue(
                  globalExersicesArray.find(el => el.exerciseId == exercise.id)
                );
                mobx.setDragExersicesFlag(true)
              }}>
                
                <div className={css.row}>
                    <div className={css.imgBox}>
                      <Image src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${exercise.img}`} className={css.img1} width={20} height={20} unoptimized />
                    </div>
                    <div className={css.textContainer}>
                      <h2 className={css.exerciseName}>{TextWrang1(exercise.nameRu+ ' / ' + exercise.nameEng)}</h2>
                      {
                        globalExersicesArray.find(el => el.exerciseId == exercise.id) &&
                        <span className={css.cardPreHeader}>{globalExersicesArray.find(el => el.exerciseId == exercise.id)?.sets?.length}x{globalExersicesArray.find(el => el.exerciseId == exercise.id)?.sets[0]?.diapazonOt
                        }/{globalExersicesArray.find(el => el.exerciseId == exercise.id)?.sets[0]?.diapazonDo}</span>
                      }
                    </div>
                  </div>
                      <div className={css.buttonContainer}>
                        <span className={css.updateBtn} onClick={() => openUpdateModal(exercise)}>Изменить</span>
                        {globalExersicesArray.find(el => el.exerciseId == exercise.id)&&<span className={css.addBtn} >Добавить</span>}
                      </div>
              </div>
            ))
          }
        </div>
      }
      {
        page === 'Тесты' &&
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {tests &&
            tests.map((card, index) => (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={card.id} className={css.card} draggable onDrag={e => { mobx.setDragTestsFlag(true); mobx.setDropAndDropArrayTests(card) }}>
                <h3 className={css.cardHeader}>{card.name}</h3>
                <span className={css.count}>{mobx.testGroups.find(el => el.id == card.groupId)?.name}</span>
                <span className={css.norm}>Норматив: {card.item} {card.type}</span>
              </motion.div>
            ))
          }
        </div>
      }
        {modalUpdateExercise &&
          <SetsModalCard updateCard={updateCard} setModalUpdateExercise={setModalUpdateExercise} globalExersicesArray={globalExersicesArray} setGlobalExersicesArray={setGlobalExersicesArray} />
        }
      <div className={css.btnSave} onClick={nextPage}>Далее</div>
    </>

  )
})



function SetsModalCard({ updateCard, setModalUpdateExercise, globalExersicesArray, setGlobalExersicesArray }) {
  const [setCount, setSetCount] = useState(1)
  const [time, setTime] = useState('')

  const [diapazonOt1, setDiapazonOt1] = useState('')
  const [diapazonDo1, setDiapazonDo1] = useState('')
  const [pokazatel2_1, setPokazatel2_1] = useState('')
  const [pokazatel3_1, setPokazatel3_1] = useState('')
  const [pokazatel4_1, setPokazatel4_1] = useState('')
  const [pokazatel5_1, setPokazatel5_1] = useState('')

  const [diapazonOt2, setDiapazonOt2] = useState('')
  const [diapazonDo2, setDiapazonDo2] = useState('')
  const [pokazatel2_2, setPokazatel2_2] = useState('')
  const [pokazatel3_2, setPokazatel3_2] = useState('')
  const [pokazatel4_2, setPokazatel4_2] = useState('')
  const [pokazatel5_2, setPokazatel5_2] = useState('')

  const [diapazonOt3, setDiapazonOt3] = useState('')
  const [diapazonDo3, setDiapazonDo3] = useState('')
  const [pokazatel2_3, setPokazatel2_3] = useState('')
  const [pokazatel3_3, setPokazatel3_3] = useState('')
  const [pokazatel4_3, setPokazatel4_3] = useState('')
  const [pokazatel5_3, setPokazatel5_3] = useState('')

  const [diapazonOt4, setDiapazonOt4] = useState('')
  const [diapazonDo4, setDiapazonDo4] = useState('')
  const [pokazatel2_4, setPokazatel2_4] = useState('')
  const [pokazatel3_4, setPokazatel3_4] = useState('')
  const [pokazatel4_4, setPokazatel4_4] = useState('')
  const [pokazatel5_4, setPokazatel5_4] = useState('')

  const [diapazonOt5, setDiapazonOt5] = useState('')
  const [diapazonDo5, setDiapazonDo5] = useState('')
  const [pokazatel2_5, setPokazatel2_5] = useState('')
  const [pokazatel3_5, setPokazatel3_5] = useState('')
  const [pokazatel4_5, setPokazatel4_5] = useState('')
  const [pokazatel5_5, setPokazatel5_5] = useState('')

  const [diapazonOt6, setDiapazonOt6] = useState('')
  const [diapazonDo6, setDiapazonDo6] = useState('')
  const [pokazatel2_6, setPokazatel2_6] = useState('')
  const [pokazatel3_6, setPokazatel3_6] = useState('')
  const [pokazatel4_6, setPokazatel4_6] = useState('')
  const [pokazatel5_6, setPokazatel5_6] = useState('')

  const [diapazonOt7, setDiapazonOt7] = useState('')
  const [diapazonDo7, setDiapazonDo7] = useState('')
  const [pokazatel2_7, setPokazatel2_7] = useState('')
  const [pokazatel3_7, setPokazatel3_7] = useState('')
  const [pokazatel4_7, setPokazatel4_7] = useState('')
  const [pokazatel5_7, setPokazatel5_7] = useState('')

  const [diapazonOt8, setDiapazonOt8] = useState('')
  const [diapazonDo8, setDiapazonDo8] = useState('')
  const [pokazatel2_8, setPokazatel2_8] = useState('')
  const [pokazatel3_8, setPokazatel3_8] = useState('')
  const [pokazatel4_8, setPokazatel4_8] = useState('')
  const [pokazatel5_8, setPokazatel5_8] = useState('')

  const [diapazonOt9, setDiapazonOt9] = useState('')
  const [diapazonDo9, setDiapazonDo9] = useState('')
  const [pokazatel2_9, setPokazatel2_9] = useState('')
  const [pokazatel3_9, setPokazatel3_9] = useState('')
  const [pokazatel4_9, setPokazatel4_9] = useState('')
  const [pokazatel5_9, setPokazatel5_9] = useState('')

  const [diapazonOt10, setDiapazonOt10] = useState('')
  const [diapazonDo10, setDiapazonDo10] = useState('')
  const [pokazatel2_10, setPokazatel2_10] = useState('')
  const [pokazatel3_10, setPokazatel3_10] = useState('')
  const [pokazatel4_10, setPokazatel4_10] = useState('')
  const [pokazatel5_10, setPokazatel5_10] = useState('')

  const [diapazonOt11, setDiapazonOt11] = useState('')
  const [diapazonDo11, setDiapazonDo11] = useState('')
  const [pokazatel2_11, setPokazatel2_11] = useState('')
  const [pokazatel3_11, setPokazatel3_11] = useState('')
  const [pokazatel4_11, setPokazatel4_11] = useState('')
  const [pokazatel5_11, setPokazatel5_11] = useState('')

  const [diapazonOt12, setDiapazonOt12] = useState('')
  const [diapazonDo12, setDiapazonDo12] = useState('')
  const [pokazatel2_12, setPokazatel2_12] = useState('')
  const [pokazatel3_12, setPokazatel3_12] = useState('')
  const [pokazatel4_12, setPokazatel4_12] = useState('')
  const [pokazatel5_12, setPokazatel5_12] = useState('')

  const [diapazonOt13, setDiapazonOt13] = useState('')
  const [diapazonDo13, setDiapazonDo13] = useState('')
  const [pokazatel2_13, setPokazatel2_13] = useState('')
  const [pokazatel3_13, setPokazatel3_13] = useState('')
  const [pokazatel4_13, setPokazatel4_13] = useState('')
  const [pokazatel5_13, setPokazatel5_13] = useState('')

  const [diapazonOt14, setDiapazonOt14] = useState('')
  const [diapazonDo14, setDiapazonDo14] = useState('')
  const [pokazatel2_14, setPokazatel2_14] = useState('')
  const [pokazatel3_14, setPokazatel3_14] = useState('')
  const [pokazatel4_14, setPokazatel4_14] = useState('')
  const [pokazatel5_14, setPokazatel5_14] = useState('')

  const [diapazonOt15, setDiapazonOt15] = useState('')
  const [diapazonDo15, setDiapazonDo15] = useState('')
  const [pokazatel2_15, setPokazatel2_15] = useState('')
  const [pokazatel3_15, setPokazatel3_15] = useState('')
  const [pokazatel4_15, setPokazatel4_15] = useState('')
  const [pokazatel5_15, setPokazatel5_15] = useState('')

  const [diapazonOt16, setDiapazonOt16] = useState('')
  const [diapazonDo16, setDiapazonDo16] = useState('')
  const [pokazatel2_16, setPokazatel2_16] = useState('')
  const [pokazatel3_16, setPokazatel3_16] = useState('')
  const [pokazatel4_16, setPokazatel4_16] = useState('')
  const [pokazatel5_16, setPokazatel5_16] = useState('')

  const [diapazonOt17, setDiapazonOt17] = useState('')
  const [diapazonDo17, setDiapazonDo17] = useState('')
  const [pokazatel2_17, setPokazatel2_17] = useState('')
  const [pokazatel3_17, setPokazatel3_17] = useState('')
  const [pokazatel4_17, setPokazatel4_17] = useState('')
  const [pokazatel5_17, setPokazatel5_17] = useState('')

  const [diapazonOt18, setDiapazonOt18] = useState('')
  const [diapazonDo18, setDiapazonDo18] = useState('')
  const [pokazatel2_18, setPokazatel2_18] = useState('')
  const [pokazatel3_18, setPokazatel3_18] = useState('')
  const [pokazatel4_18, setPokazatel4_18] = useState('')
  const [pokazatel5_18, setPokazatel5_18] = useState('')

  const [diapazonOt19, setDiapazonOt19] = useState('')
  const [diapazonDo19, setDiapazonDo19] = useState('')
  const [pokazatel2_19, setPokazatel2_19] = useState('')
  const [pokazatel3_19, setPokazatel3_19] = useState('')
  const [pokazatel4_19, setPokazatel4_19] = useState('')
  const [pokazatel5_19, setPokazatel5_19] = useState('')

  const [diapazonOt20, setDiapazonOt20] = useState('')
  const [diapazonDo20, setDiapazonDo20] = useState('')
  const [pokazatel2_20, setPokazatel2_20] = useState('')
  const [pokazatel3_20, setPokazatel3_20] = useState('')
  const [pokazatel4_20, setPokazatel4_20] = useState('')
  const [pokazatel5_20, setPokazatel5_20] = useState('')
  



  const array = [
    [1, diapazonOt1, setDiapazonOt1, diapazonDo1, setDiapazonDo1, pokazatel2_1, setPokazatel2_1, pokazatel3_1, setPokazatel3_1, pokazatel4_1, setPokazatel4_1, pokazatel5_1, setPokazatel5_1],
    [2, diapazonOt2, setDiapazonOt2, diapazonDo2, setDiapazonDo2, pokazatel2_2, setPokazatel2_2, pokazatel3_2, setPokazatel3_2, pokazatel4_2, setPokazatel4_2, pokazatel5_2, setPokazatel5_2],
    [3, diapazonOt3, setDiapazonOt3, diapazonDo3, setDiapazonDo3, pokazatel2_3, setPokazatel2_3, pokazatel3_3, setPokazatel3_3, pokazatel4_3, setPokazatel4_3, pokazatel5_3, setPokazatel5_3],
    [4, diapazonOt4, setDiapazonOt4, diapazonDo4, setDiapazonDo4, pokazatel2_4, setPokazatel2_4, pokazatel3_4, setPokazatel3_4, pokazatel4_4, setPokazatel4_4, pokazatel5_4, setPokazatel5_4],
    [5, diapazonOt5, setDiapazonOt5, diapazonDo5, setDiapazonDo5, pokazatel2_5, setPokazatel2_5, pokazatel3_5, setPokazatel3_5, pokazatel4_5, setPokazatel4_5, pokazatel5_5, setPokazatel5_5],
    [6, diapazonOt6, setDiapazonOt6, diapazonDo6, setDiapazonDo6, pokazatel2_6, setPokazatel2_6, pokazatel3_6, setPokazatel3_6, pokazatel4_6, setPokazatel4_6, pokazatel5_6, setPokazatel5_6],
    [7, diapazonOt7, setDiapazonOt7, diapazonDo7, setDiapazonDo7, pokazatel2_7, setPokazatel2_7, pokazatel3_7, setPokazatel3_7, pokazatel4_7, setPokazatel4_7, pokazatel5_7, setPokazatel5_7],
    [8, diapazonOt8, setDiapazonOt8, diapazonDo8, setDiapazonDo8, pokazatel2_8, setPokazatel2_8, pokazatel3_8, setPokazatel3_8, pokazatel4_8, setPokazatel4_8, pokazatel5_8, setPokazatel5_8],
    [9, diapazonOt9, setDiapazonOt9, diapazonDo9, setDiapazonDo9, pokazatel2_9, setPokazatel2_9, pokazatel3_9, setPokazatel3_9, pokazatel4_9, setPokazatel4_9, pokazatel5_9, setPokazatel5_9],
    [10, diapazonOt10, setDiapazonOt10, diapazonDo10, setDiapazonDo10, pokazatel2_10, setPokazatel2_10, pokazatel3_10, setPokazatel3_10, pokazatel4_10, setPokazatel4_10, pokazatel5_10, setPokazatel5_10],
    [11, diapazonOt11, setDiapazonOt11, diapazonDo11, setDiapazonDo11, pokazatel2_11, setPokazatel2_11, pokazatel3_11, setPokazatel3_11, pokazatel4_11, setPokazatel4_11, pokazatel5_11, setPokazatel5_11],
    [12, diapazonOt12, setDiapazonOt12, diapazonDo12, setDiapazonDo12, pokazatel2_12, setPokazatel2_12, pokazatel3_12, setPokazatel3_12, pokazatel4_12, setPokazatel4_12, pokazatel5_12, setPokazatel5_12],
    [13, diapazonOt13, setDiapazonOt13, diapazonDo13, setDiapazonDo13, pokazatel2_13, setPokazatel2_13, pokazatel3_13, setPokazatel3_13, pokazatel4_13, setPokazatel4_13, pokazatel5_13, setPokazatel5_13],
    [14, diapazonOt14, setDiapazonOt14, diapazonDo14, setDiapazonDo14, pokazatel2_14, setPokazatel2_14, pokazatel3_14, setPokazatel3_14, pokazatel4_14, setPokazatel4_14, pokazatel5_14, setPokazatel5_14],
    [15, diapazonOt15, setDiapazonOt15, diapazonDo15, setDiapazonDo15, pokazatel2_15, setPokazatel2_15, pokazatel3_15, setPokazatel3_15, pokazatel4_15, setPokazatel4_15, pokazatel5_15, setPokazatel5_15],
    [16, diapazonOt16, setDiapazonOt16, diapazonDo16, setDiapazonDo16, pokazatel2_16, setPokazatel2_16, pokazatel3_16, setPokazatel3_16, pokazatel4_16, setPokazatel4_16, pokazatel5_16, setPokazatel5_16],
    [17, diapazonOt17, setDiapazonOt17, diapazonDo17, setDiapazonDo17, pokazatel2_17, setPokazatel2_17, pokazatel3_17, setPokazatel3_17, pokazatel4_17, setPokazatel4_17, pokazatel5_17, setPokazatel5_17],
    [18, diapazonOt18, setDiapazonOt18, diapazonDo18, setDiapazonDo18, pokazatel2_18, setPokazatel2_18, pokazatel3_18, setPokazatel3_18, pokazatel4_18, setPokazatel4_18, pokazatel5_18, setPokazatel5_18],
    [19, diapazonOt19, setDiapazonOt19, diapazonDo19, setDiapazonDo19, pokazatel2_19, setPokazatel2_19, pokazatel3_19, setPokazatel3_19, pokazatel4_19, setPokazatel4_19, pokazatel5_19, setPokazatel5_19],
    [20, diapazonOt20, setDiapazonOt20, diapazonDo20, setDiapazonDo20, pokazatel2_20, setPokazatel2_20, pokazatel3_20, setPokazatel3_20, pokazatel4_20, setPokazatel4_20, pokazatel5_20, setPokazatel5_20],


  ]

  const setSets = async (set) => {
    await array[set.set - 1][2](set.diapazonOt)
    await array[set.set - 1][4](set.diapazonDo)
    await set.pokazatel2 && array[set.set - 1][6](set.pokazatel2)
    await set.pokazatel3 && array[set.set - 1][8](set.pokazatel3)
    await set.pokazatel4 && array[set.set - 1][10](set.pokazatel4)
    await set.pokazatel5 && array[set.set - 1][12](set.pokazatel5)

  }

  useEffect(() => {
    const exercise = globalExersicesArray.find(el => el.exerciseId == updateCard.id)
    if(exercise && exercise.sets){

      (async () => {
        for (let i = 0; i < exercise.sets.length; i++) {
          await setSets(exercise.sets[i]);
        }
      })();
      setTime(exercise.time)
      setSetCount(exercise.sets.length+1)
    }

  }, [])

  const addExersicePokazaleli = () => {
    const newSets = []; // Создаем новый массив для новых объектов sets
    array.slice(0, setCount).forEach(card => {

      if (card[1] && card[3]) {
        const set = {};
        set.set = card[0];
        set.diapazonOt = card[1];
        set.diapazonDo = card[3];
        if (card[5]) set.pokazatel2 = card[5];
        if (card[7]) set.pokazatel3 = card[7];
        if (card[9]) set.pokazatel4 = card[9];
        if (card[11]) set.pokazatel5 = card[11];
        newSets.push(set); // Добавляем новый объект set в новый массив newSets
      }

    });

    if (globalExersicesArray.find(el => el.exerciseId == updateCard.id)) {
      setGlobalExersicesArray([...globalExersicesArray.filter(el => el.exerciseId != updateCard.id), {
        "exerciseId": updateCard.id,
        "sets": newSets, // Используем новый массив newSets для добавления в глобальный массив
        "time": time
      }]);
    } else {
      setGlobalExersicesArray([...globalExersicesArray, {
        "exerciseId": updateCard.id,
        "sets": newSets, // Используем новый массив newSets для добавления в глобальный массив
        "time": time
      }]);
    }
    setModalUpdateExercise(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.modalUpdateExercise} >

      <div className={css.modalUpdateWind} >
        <div className={css.exit} onClick={() => setModalUpdateExercise(false)}>{`< Назад`}</div>
        <h2 className={css.header}>Изменить упражнение</h2>
        <div className={css.modalHeaderNavCotainer}>
          <span className={css.flex1}>Сет</span>
          <span className={css.flex2}>{TextWrang(updateCard.pocazatel1Name)},{updateCard.pocazatel1Type}/диапазон</span>
          {updateCard.pocazatel2Name && <span className={css.flex1}>{TextWrang(updateCard.pocazatel2Name)}</span>}
          {updateCard.pocazatel3Name && <span className={css.flex1}>{TextWrang(updateCard.pocazatel3Name)}</span>}
          {updateCard.pocazatel4Name && <span className={css.flex1}>{TextWrang(updateCard.pocazatel4Name)}</span>}
          {updateCard.pocazatel5Name && <span className={css.flex1}>{TextWrang(updateCard.pocazatel5Name)}</span>}
        </div>

        {array.slice(0, setCount).map(card => (
          <SetsRow setNum={card[0]} updateCard={updateCard}
            diapazonOt={card[1]} setDiapazonOt={card[2]} diapazonDo={card[3]} setDiapazonDo={card[4]} pokazatel2={card[5]} setPokazatel2={card[6]}
            pokazatel3={card[7]} setPokazatel3={card[8]} pokazatel4={card[9]} setPokazatel4={card[10]} pokazatel5={card[11]} setPokazatel5={card[12]}
          />
        ))}

        <div className={css.AddSetsBtn} onClick={() => setSetCount(setCount>0 ?setCount - 1: 0)}><span>-</span>Удалить сет</div>
        <div className={`${css.AddSetsBtn} ${css.AddSetsBtn1}`} onClick={() => setSetCount(setCount>19 ?20: setCount + 1)}><span>+</span>Добавить сет</div>
        <span className={css.label}>Время отдыха</span>
        <input type='number' min={0} className={`${css.input} ${css.name} ${css.ipdateInput}`} placeholder='Продолжительность' id="password" value={time} onChange={e => setTime(e.target.value)} />
        <div className={css.buttonContainer}>
          <div className={css.btnSave} onClick={addExersicePokazaleli}>Сохранить</div>
        </div>
      </div>
    </motion.div>
  )
}

function SetsRow({ setNum, updateCard,
  diapazonOt, setDiapazonOt, diapazonDo, setDiapazonDo, pokazatel2, setPokazatel2, pokazatel3, setPokazatel3, pokazatel4, setPokazatel4, pokazatel5, setPokazatel5
}) {
  useEffect(()=>{
    return () => {
      setDiapazonDo('')
      setDiapazonOt('')
      setPokazatel2('')
      setPokazatel3('')
      setPokazatel4('')
      setPokazatel5('')
    }
  },[])
  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.rowContainer}>
      <span className={css.setNum}>{setNum}</span>
      <div className={css.diapazonContainer}>
        <input type='number' min={0} className={`${css.inputMiniInput}`} value={diapazonOt} onChange={e => setDiapazonOt(e.target.value)} />
        <span>-</span>
        <input type='number' mmin={0} className={`${css.inputMiniInput} `} value={diapazonDo} onChange={e => setDiapazonDo(e.target.value)} />
      </div>
      {updateCard.pocazatel2Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel2} onChange={e => setPokazatel2(e.target.value)} />}
      {updateCard.pocazatel3Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel3} onChange={e => setPokazatel3(e.target.value)} />}
      {updateCard.pocazatel4Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel4} onChange={e => setPokazatel4(e.target.value)} />}
      {updateCard.pocazatel5Name && <input type='number' min={0} className={`${css.inputMiniInput} ${css.flex1}`} value={pokazatel5} onChange={e => setPokazatel5(e.target.value)} />}
    </motion.div>
  )
}



function TextWrang(text) {
  if (text && text?.length <= 4) {
    return text;
  } else if (text) {
    return text?.slice(0, 4) + "..";
  } else return ''
}

function TextWrang1(text) {
  if (text && text?.length <= 28) {
    return text;
  } else if (text) {
    return text?.slice(0, 28) + "..";
  } else return ''
}






const  Page3 = observer(({ nextPage, prevPage,save }) => {
  const [search, setSearch] = useState('')
  const [userArray, setUserArray] = useState([])
  const [userAllArray, setUserAllArray] = useState([])

  useEffect(() => {
    setUserAllArray(mobx.sportsmans)
  }, [mobx.sportsmans])

  const addUser = (user) => {
    setUserArray([...userArray, user])
  }

  const deleteUser = (user) => {
    setUserArray(userArray.filter(el => el.id !== user.id))
  }

  const searchUsers = (e) => {
    setSearch(e)
    if (e) {
      // Фильтрация пользователей по полю name
      const results = mobx.sportsmans.filter(user =>
        user.name?.toLowerCase().includes(e.toLowerCase())
      );
      setUserAllArray(results);
    } else {
      setUserAllArray(mobx.sportsmans);
    }
  }


  const preSave = () => {
    mobx.setFinalUsersArrayOnDragAndDrop(userArray)
    save()
  }

  return (
    <div>
      <span className={css.exit} onClick={prevPage}>{`< Назад`}</span>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Выберите спортсменов</h2>
        <div className={css.btn}>
          <Image src={favorite} alt='Онлайн-Тренер' className={css.img} />
        </div>
      </div>
      <div className={css.finalUserContainer}>
        {userArray.slice(0, 10).map(man => (
              man.img ?
                <Image alt='' src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man.img}`} width={10} height={10} unoptimized className={css.userImg} /> :
                <Image alt='' src={user} width={10} height={10} unoptimized className={css.userImg} />
        ))}
        
      </div>
      <div  viewport={{ once: true }} className={css.searchContainer}>
        <Image src={searchImg} className={css.search} alt='Онлайн-Тренер' />
        <input placeholder='Найти...' type='text' className={css.inputSearch} value={search} onChange={e => searchUsers(e.target.value)} />
      </div>
      <div className={css.searchUserCOntainer}>
        {userAllArray.map(man => (
          <div key={man.id} className={css.searcgUserCard}>
            {userArray.find(el => el.id == man.id) ?
              <Image src={checkOn} onClick={() => deleteUser(man)} className={css.checkImg} /> :
              <Image src={checkOff} onClick={() => addUser(man)} className={css.checkImg} />}
            {
              man.img ?
                <Image alt='' src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man.img}`} width={10} height={10} unoptimized className={css.userImg} /> :
                <Image alt='' src={user} width={10} height={10} unoptimized className={css.userImg} />
            }

            <span>{man.name}</span>
          </div>
        ))}
      </div>
      <div className={css.btnSave} onClick={preSave}>Сохранить</div>
    </div>

  )
})





