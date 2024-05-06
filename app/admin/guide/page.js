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
import x from './img/x.svg'
import TestDetails from "@/components/Tests/TestDetails/TestDetails";
import UpdateTests from "@/components/Tests/UpdateTests/UpdateTests";
import UpdatePatern from "@/components/Training/UpdatePatern/UpdatePatern";
import TrainingUtills from "@/http/TrainingUtills";

const page = observer(() => {
  const [page, setPage] = useState("Упражнения");
  useEffect(() => {
    mobx.setPageName("Справочники");

  });
  return (
    <>

{mobx.addExercise&&<AddExercise/>}
{mobx.AddTests&&<AddTests/>}
{mobx.updateExercise&&<UpdateExercise/>}
{mobx.exerciseDetails&&<ExerciseDetails/>}
{mobx.testDetails&&<TestDetails/>}
{mobx.UpdateTests&&<UpdateTests/>}

      <div className={css.container}>
        <div className={css.menuContainer}>
          <span className={ page === "Упражнения" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem } onClick={() => setPage("Упражнения")}>Упражнения</span>
          <span  className={ page === "Тесты" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem }  onClick={() => setPage("Тесты")}>Тесты</span>
          <span  className={ page === "Показатели здоровья" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem }  onClick={() => setPage("Показатели здоровья")}>Показатели здоровья</span>
          <span  className={ page === "Медицинские анализы" ? `${css.menuItem} ${css.menuItemActice}` : css.menuItem }  onClick={() => setPage("Медицинские анализы")}>Медицинские анализы</span>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className={css.navbar}
        >
          {page === "Упражнения" &&
            <div className={css.add} onClick={()=>mobx.setAddExercise(true)}>
              <span>+</span>Добавить упражнение
            </div>
          }
          {page === "Тесты" &&
            <div className={css.add} onClick={()=>mobx.setAddTests(true)}>
              <span>+</span>Добавить тест
            </div>
          }

          <div className={css.btn}>
            <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
          </div>
          <div className={css.btn}>
            <Image src={filter} alt="Онлайн-Тренер" className={css.img} />
          </div>
          <div className={css.btn}>
            <Image src={filter1} alt="Онлайн-Тренер" className={css.img} />
          </div>
          <div className={css.btn}>
            <Image src={search} alt="Онлайн-Тренер" className={css.img} />
          </div>
        </motion.div>
        <div className={css.row}>
          
            {page === 'Упражнения' && <>
            <div className={css.cardContainer}><Exercise /></div><GroupExersices/> </>}
            {page === 'Тесты' && <><div className={css.cardContainer}><Tests /></div><GroupTest/> </>}
          
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




function CountTraining (id){
  let counter = 0
  if(mobx.tests){
    mobx.tests.forEach(test => {
      if(test.groupId == id){
        counter++
      }
    })
  }

  return `${counter} ${pluralize(counter, 'тест', 'теста', 'тестов')}`;

}

function CountExersices (id){
  let counter = 0
  if(mobx.tests){
    mobx.exercises.forEach(test => {
      if(test.groupId == id){
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
  useEffect(()=>{
    TrainingUtills.getExerciseGroups()
  },[])
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