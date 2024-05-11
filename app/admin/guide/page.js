"use client";
import mobx from "@/mobx/mobx";
import React, { useEffect, useState } from "react";
import css from "./guide.module.css";
import Image from "next/image";
import favorite from "./img/favorite.svg";
import search from "./img/search.svg";
import AddExercise from '@/components/SuperAdmin/AddExercise/AddExercise'
import { observer } from 'mobx-react-lite'
import ExerciseDetails from '@/components/SuperAdmin/Exercise/ExerciseDetails/ExerciseDetails'
import UpdateExercise from '@/components/SuperAdmin/Exercise/UpdateExercise/UpdateExercise'
import { motion } from "framer-motion";
import Exercise from '@/components/SuperAdmin/Exercise/Exercise'
import AddTests from "@/components/Tests/AddTests/AddTests";
import Tests from "@/components/Tests/Tests";
import arrow from './img/arrow.svg'
import filter from './img/filter.svg'
import filter1 from './img/filter1.svg'
import TestDetails from "@/components/Tests/TestDetails/TestDetails";
import UpdateTests from "@/components/Tests/UpdateTests/UpdateTests";
import TrainingUtills from "@/http/TrainingUtills";
import x from './img/x.svg'

const page = observer(() => {
  const [page, setPage] = useState("Упражнения");
  const [currentStage, setCurrentStage] = useState('Все')
  const [currentStageModalFlag, setCurrentStageModalFlag] = useState(false)
  const [equipmentArray, setEquipmentArray] = useState([])
  const [filter1ModalFlag, setFilter1ModalFlag] = useState(false)
  const [filter2ModalFlag, setFilter2ModalFlag] = useState(false)
  const [filter3ModalFlag, setFilter3ModalFlag] = useState(false)
  const [testsModalFlag, setTestsModalFlag] = useState(false)
  const muscleGroupArray = ['Пресс', 'Шея', 'Ноги', 'Икры', 'Руки', 'Плечи', 'Грудь', 'Бицепс', 'Трицепс', 'Спина', 'Бедра', 'Голень', 'Кисти']
  const [currentMuscleGroup, setCurrentMuscleGroup] = useState('Все')
  const [currentEquipment, setCurrentEquipment] = useState('Все')
  const [currentTestGroup, setCurrentTestGroup] = useState('Все')


  useEffect(() => {
    mobx.setPageName("Справочники");
  });

  useEffect(() => {
    if (mobx.exercises) {
      mobx.exercises.forEach(e => JSON.parse(e.equipment)?.forEach(el => {
        if (!equipmentArray.includes(el)) {
          setEquipmentArray([...equipmentArray, el])
        }
      }))
    }
  }, [mobx.exercises])

  const handleFilter1Click = () => {
    setCurrentStageModalFlag(!currentStageModalFlag)
    setFilter1ModalFlag(false)
    setFilter2ModalFlag(false)
  }
  const handleTestClick = () => {
    setCurrentStageModalFlag(false)
    setFilter1ModalFlag(false)
    setFilter2ModalFlag(false)
    setTestsModalFlag(!testsModalFlag)
  }


  const handleFilter2Click = (type) => {
    setCurrentStageModalFlag(false)
    if (type == 'Оборудование') {
      setFilter1ModalFlag(false)
      setFilter2ModalFlag(true)
    } else if (type == 'Оборудование назад') {
      setFilter1ModalFlag(true)
      setFilter2ModalFlag(false)
    } else if (type == 'Группа мышц') {
      setFilter1ModalFlag(false)
      setFilter2ModalFlag(false)
      setFilter3ModalFlag(true)
    } else if (type == 'Группа мышц назад') {
      setFilter1ModalFlag(true)
      setFilter3ModalFlag(false)
    }
  }

  const exitAll = () => {
    setFilter1ModalFlag(false)
    setFilter2ModalFlag(false)
    setFilter3ModalFlag(false)
    setCurrentStageModalFlag(false)
  }

  const throwHandler = () => {
    setCurrentEquipment('Все')
    setCurrentMuscleGroup('Все')
  }

  return (
    <>

      {mobx.addExercise && <AddExercise />}
      {mobx.AddTests && <AddTests />}
      {mobx.updateExercise && <UpdateExercise />}
      {mobx.exerciseDetails && <ExerciseDetails />}
      {mobx.testDetails && <TestDetails />}
      {mobx.UpdateTests && <UpdateTests />}

      <div className={css.container}>
        <div className={css.menuContainer}>
          <span className={page === "Упражнения" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem} onClick={() => setPage("Упражнения")}>Упражнения</span>
          <span className={page === "Тесты" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem} onClick={() => setPage("Тесты")}>Тесты</span>
          <span className={page === "Показатели здоровья" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem} onClick={() => setPage("Показатели здоровья")}>Показатели здоровья</span>
          <span className={page === "Медицинские анализы" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem} onClick={() => setPage("Медицинские анализы")}>Медицинские анализы</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={css.navbar}
        >
          {page === "Упражнения" &&
            <div className={css.add} onClick={() => mobx.setAddExercise(true)}>
              <span>+</span>Добавить упражнение
            </div>
          }
          {page === "Тесты" &&
            <div className={css.add} onClick={() => mobx.setAddTests(true)}>
              <span>+</span>Добавить тест
            </div>
          }
          {
            page === "Упражнения" &&
            <div className={css.btn}>
              <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
            </div>
          }

          {
            page === "Упражнения" &&
            <div className={css.btn} onClick={handleFilter1Click}>
              <Image src={currentStageModalFlag ? x : filter} alt="Онлайн-Тренер" className={css.img} />
              {
                currentStageModalFlag &&
                <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
                  <span className={currentStage == 'Разминка' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentStage('Разминка'); setCurrentStageModalFlag(false) }}>Разминка</span>
                  <span className={currentStage == 'Упражнение' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentStage('Упражнение'); setCurrentStageModalFlag(false) }}>Упражнение</span>
                  <span className={currentStage == 'Заминка' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentStage('Заминка'); setCurrentStageModalFlag(false) }}>Заминка</span>
                  <span className={currentStage == 'Все' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentStage('Все'); setCurrentStageModalFlag(false) }}>Все</span>
                </motion.div>
              }
            </div>
          }
          {
            page === "Тесты" &&
            <div className={css.btn} onClick={handleTestClick}>
              <Image src={testsModalFlag ? x : filter} alt="Онлайн-Тренер" className={css.img} />
              {
                testsModalFlag &&
                <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
                  {
                    mobx.testGroups.map(e => (
                      <span key={e.id} className={currentTestGroup == e?.id ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentTestGroup(e?.id); setTestsModalFlag(false) }}>{e?.name}</span>
                    ))
                  }
                  <span className={currentTestGroup == 'Все' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setCurrentTestGroup('Все'); setCurrentStageModalFlag(false) }}>Все</span>
                </motion.div>
              }
            </div>
          }
          {
            page === "Упражнения" &&
            <div className={css.btn} onClick={() => { setFilter1ModalFlag(!filter1ModalFlag), setCurrentStageModalFlag(false) }}>
              <Image src={filter1ModalFlag || filter2ModalFlag || filter3ModalFlag ? x : filter1} alt="Онлайн-Тренер" className={css.img} />
              {
                filter1ModalFlag &&
                <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
                  <span className={`${css.filterSpan} ${css.filterSpanBetween}`} onClick={() => handleFilter2Click('Оборудование')}>Оборудование <Image src={arrow} className={css.arrow} /></span>
                  <span className={`${css.filterSpan} ${css.filterSpanBetween}`} onClick={() => handleFilter2Click('Группа мышц')}>Группа мышц <Image src={arrow} className={css.arrow} /></span>
                  <span className={`${css.filterSpan} ${css.filterSpanEnd}`} onClick={throwHandler}>Сбросить </span>

                </motion.div>
              }
              {
                filter2ModalFlag &&
                <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
                  <span className={`${css.filterSpan}`} onClick={() => handleFilter2Click('Оборудование назад')}><Image src={arrow} className={css.arrowEnd} /> Оборудование</span>
                  {
                    equipmentArray.map(e => (
                      <span key={e} className={`${css.filterSpan}`} onClick={() => setCurrentEquipment(e)}>{e}</span>
                    ))
                  }
                </motion.div>
              }
              {
                filter3ModalFlag &&
                <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
                  <span className={`${css.filterSpan}`} onClick={() => handleFilter2Click('Группа мышц назад')}><Image src={arrow} className={css.arrowEnd} /> Группа мышц</span>
                  {
                    muscleGroupArray.map(e => (
                      <span key={e} className={`${css.filterSpan}`} onClick={() => setCurrentMuscleGroup(e)}>{e}</span>
                    ))
                  }
                </motion.div>
              }
            </div>
          }

          <div className={css.btn}>
            <Image src={search} alt="Онлайн-Тренер" className={css.img} />
          </div>

        </motion.div>
        <div className={css.row}>

          {page === 'Упражнения' && <>
            <div className={css.cardContainer} onClick={exitAll}><Exercise currentStage={currentStage} currentMuscleGroup={currentMuscleGroup} currentEquipment={currentEquipment} /></div><GroupExersices /> </>}
          {page === 'Тесты' && <><div className={css.cardContainer}><Tests currentTestGroup={currentTestGroup}/></div><GroupTest /> </>}

        </div>



      </div>
    </>
  );
});

export default page;


const pluralize = (number, one, two, five) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return two;
  } else {
    return five;
  }
};




function CountTraining(id) {
  let counter = 0
  if (mobx.tests) {
    mobx.tests.forEach(test => {
      if (test.groupId == id) {
        counter++
      }
    })
  }

  return `${counter} ${pluralize(counter, 'тест', 'теста', 'тестов')}`;

}

function CountExersices(id) {
  let counter = 0
  if (mobx.tests) {
    mobx.exercises.forEach(test => {
      if (test.groupId == id) {
        counter++
      }
    })
  }

  return `${counter} ${pluralize(counter, 'упражнение', 'упражнения', 'упражнений')}`;

}


const GroupTest = observer(() => {
  return (
    <div className={css.groupContainer}>
      <span className={css.label}>Мои группы</span>
      {mobx.testGroups.map(group => (
        <div key={group.id} className={css.groupCard}>
          <div className={css.cardHeaaderContainer}>
            <h3 className={css.cardHeader}>{group.name}</h3>
            <Image src={arrow} unoptimized className={css.arrow} />
          </div>
          <span className={css.counter}>{CountTraining(group.id)}</span>
        </div>
      ))}
    </div>
  );
});

const GroupExersices = observer(() => {
  useEffect(() => {
    TrainingUtills.getExerciseGroups()
  }, [])
  return (
    <div className={css.groupContainer}>
      <span className={css.label}>Мои группы</span>
      {mobx.ExerciseGrpupss.map(group => (
        <div key={group.id} className={css.groupCard}>
          <div className={css.cardHeaaderContainer}>
            <h3 className={css.cardHeader}>{group.name}</h3>
            <Image src={arrow} unoptimized className={css.arrow} />
          </div>
          <span className={css.counter}>{CountExersices(group.id)}</span>
        </div>
      ))}
    </div>
  );
});