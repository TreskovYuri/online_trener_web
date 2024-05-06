import Image from "next/image";
import css from "./WeekCalendar.module.css";
import arrow from "./img/arrow.svg";
import { motion } from "framer-motion";
import moment from "moment";
import mobx from "@/mobx/mobx";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import leftArrow from "./img/leftArrow.svg";
import rightArrow from "./img/rightArrow.svg";
import deleteImg from "./img/delete.svg";

const monthArray = {
  January: "Январь",
  February: "Февраль",
  March: "Март",
  April: "Апрель",
  May: "Май",
  June: "Июнь",
  July: "Июль",
  August: "Август",
  September: "Сентябрь",
  October: "Октябрь",
  November: "Ноябрь",
  December: "Декабрь",
};
const monthArray2 = {
  January: "января",
  February: "февраля",
  March: "марта",
  April: "апреля",
  May: "мая",
  June: "июня",
  July: "июля",
  August: "августа",
  September: "сентября",
  October: "октября",
  November: "ноября",
  December: "декабря",
};
const days = ["вс", "пн", "вт", "ср", "чт", "пт", "сб"];

const WeekCalendar = observer(() => {
  const [count, setCount] = useState(0);
  let day = moment().subtract(1, "day").subtract(count, "week");
  // let day2 = moment().subtract(1, 'week');
  const daysArray = [...Array(7)].map(() => day.add(1, "day").clone());
  const daysArray2 = [...Array(7)].map(() => day.add(1, "day").clone());

  useEffect(() => {
    mobx.consultations.forEach((c) => {
      console.log(new Date(c.date));
      console.log(new Date(c.date).getDate());
    });
  }, []);

  return (
    <div className={css.container}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={css.header}
      >
        {monthArray[moment().format("MMMM")]},
        <span>{moment().format("YYYY")}</span>
        <div className={css.arrowContainer}>
          <Image
            src={leftArrow}
            className={css.arrows}
            onClick={() => setCount(count + 1)}
          />
          <Image
            src={rightArrow}
            className={css.arrows}
            onClick={() => setCount(count - 1)}
          />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={css.calendar}
      >
        {daysArray.map((dayItem) => (
          <div className={css.card} key={dayItem.format("DDMMYYYY")}>
            <div className={css.dateContainer}>
              <span
                className={
                  moment().format("DDMMYYYY") === dayItem.format("DDMMYYYY")
                    ? `${css.headerDay} ${css.headerDayActive}`
                    : `${css.headerDay}`
                }
              >
                {dayItem.format("D")} {monthArray2[dayItem.format("MMMM")]}
              </span>
              <span className={css.headerWeek}>{days[dayItem.day()]}</span>
            </div>
            <div className={css.cell} onDragOver={(e) => e.preventDefault()}>
            <Card dayItem={dayItem.format("DD.MM.YYYY")} exercicesArray={mobx.finalExersiceArrayOnDragAndDrop.filter(el=> el.date == dayItem.format("DD.MM.YYYY"))} testsArray={mobx.finalTestsArrayOnDragAndDrop.filter(el=> el.date == dayItem.format("DD.MM.YYYY"))}
              nutritionsArray={mobx.finalNutritionArrayOnDragAndDrop.find(el=> el.date == dayItem.format("DD.MM.YYYY"))}  />
            </div>
          </div>
        ))}
        {daysArray2.map((dayItem) => (
          <div className={css.card} key={dayItem.format("DDMMYYYY")}>
            <div className={css.dateContainer}>
              <span
                className={
                  moment().format("DDMMYYYY") === dayItem.format("DDMMYYYY")
                    ? `${css.headerDay} ${css.headerDayActive}`
                    : `${css.headerDay}`
                }
              >
                {dayItem.format("D")} {monthArray2[dayItem.format("MMMM")]}
              </span>
              <span className={css.headerWeek}>{days[dayItem.day()]}</span>
            </div>
            <div className={css.cell} onDragOver={(e) => e.preventDefault()}>
              <Card dayItem={dayItem.format("DD.MM.YYYY")} exercicesArray={mobx.finalExersiceArrayOnDragAndDrop.filter(el=> el.date == dayItem.format("DD.MM.YYYY"))} testsArray={mobx.finalTestsArrayOnDragAndDrop.filter(el=> el.date == dayItem.format("DD.MM.YYYY"))}
              nutritionsArray={mobx.finalNutritionArrayOnDragAndDrop.find(el=> el.date == dayItem.format("DD.MM.YYYY"))}  />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default WeekCalendar;

const Card = observer(({ dayItem,exercicesArray,testsArray,nutritionsArray }) => {
  const [showDrop, setShowDrop] = useState(false);
  const [allExesice, setAllExersice] = useState(false);
  const [allTests, setAllTests] = useState(false);

  const pluralize = (number, one, two, five) => {
    if (number % 10 === 1 && number % 100 !== 11) {
      return one;
    } else if (
      [2, 3, 4].includes(number % 10) &&
      ![12, 13, 14].includes(number % 100)
    ) {
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
    return `${count} ${pluralize(count, "прием", "приема", "приемов")} пищи`;
  };





  const drop = () => {
    if (mobx.dragFlag) {
      let array = [];
      mobx.dragValue?.training?.forEach((el) => {
        const id = Math.floor(Math.random() * 100001);
        array.push({ ...el, id: id });
        mobx.setFinalExersiceArrayOnDragAndDrop([...mobx.finalExersiceArrayOnDragAndDrop,{id: id,date: dayItem, body: el,},]);
      });
      mobx.dragValue?.tests.forEach((el) => {
        const id = Math.floor(Math.random() * 100001);
        array.push({ ...el, id: id });
        mobx.setFinalTestsArrayOnDragAndDrop([...mobx.finalTestsArrayOnDragAndDrop,{id: id,date: dayItem,body: mobx.tests.find(obj => obj.id == el.testId)},]);
      });
      mobx.setDragValue({});
      mobx.setDropValue({});
      setShowDrop(false);
      mobx.setDragFlag(false);
    }
    if (mobx.dragExersicesFlag) {
      const id = Math.floor(Math.random() * 100001);
      console.log(mobx.dragExersicesValue)
      mobx.setFinalExersiceArrayOnDragAndDrop([...mobx.finalExersiceArrayOnDragAndDrop,{id: id,date: dayItem,body: mobx.dragExersicesValue,},]);
      mobx.setDropValue({});
      mobx.setDragExersicesValue({});
      mobx.setDragExersicesFlag(false);
      setShowDrop(false);
    }
    if (mobx.dragNutritionFlag) {
      const id = Math.floor(Math.random() * 100001);
      mobx.setFinalNutritionArrayOnDragAndDrop([...mobx.finalNutritionArrayOnDragAndDrop.filter( (el) => el.date != dayItem ),{id: id,date: dayItem,body: mobx.dropAndDropArrayNutrition},]);
      mobx.setDragNutritionFlag(false);
      mobx.setDropAndDropArrayNutrition({});
      setShowDrop(false);
    }
    if (mobx.dragTestsFlag) {
      const id = Math.floor(Math.random() * 100001);
      mobx.setFinalTestsArrayOnDragAndDrop([...mobx.finalTestsArrayOnDragAndDrop,{id: id,date: dayItem,body: mobx.dropAndDropArrayTests},]);
      mobx.setDragTestsFlag(false);
      mobx.setDropAndDropArrayTests({});
      setShowDrop(false);
    }
  };

  const deleteExercises = (id) => {mobx.setFinalExersiceArrayOnDragAndDrop(mobx.finalExersiceArrayOnDragAndDrop.filter((el) => el.id != id));};

  const deleteNutritions = (id) => { mobx.setFinalNutritionArrayOnDragAndDrop(mobx.finalNutritionArrayOnDragAndDrop.filter((el) => el.id != id));};

  const deleteTests = (id) => {mobx.setFinalTestsArrayOnDragAndDrop(mobx.finalTestsArrayOnDragAndDrop.filter((el) => el.id != id));};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={showDrop ? `${css.userCard} ${css.active}` : css.userCard}
      onDrop={() => drop()}
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
    >
      {allExesice && exercicesArray?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <span className={css.type}>
            Упражнения <Image src={arrow} alt="" className={css.arrow} />
          </span>
          {exercicesArray?.map((item, index) => (
            <div key={index} className={css.trainingCard}>
              <Image
                src={deleteImg}
                className={css.deleteImg}
                onClick={() => deleteExercises(item.id)}
              />
              <span className={css.cardHeader}>
                {TextWrang(
                  mobx.exercises?.find((el) => el.id == item.body?.exerciseId)
                    ?.nameRu +
                    " / " +
                    TextWrang(
                      mobx.exercises?.find((el) => el.id == item.body?.exerciseId)?.nameEng
                    )
                )}
                
              </span>

            </div>
          ))}
          {exercicesArray?.length > 2 && (
            <span
              className={css.cardOver}
              onClick={() => setAllExersice(!allExesice)}
            >
              Скрыть
            </span>
          )}
        </motion.div>
      )}
      {!allExesice && exercicesArray?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <span className={css.type}>
            Упражнения <Image src={arrow} alt="" className={css.arrow} />
          </span>
          {exercicesArray?.slice(0, 2)?.map(item => (
            <div key={item.id} className={css.trainingCard}>
              <Image
                src={deleteImg}
                className={css.deleteImg}
                onClick={() => deleteExercises(item.id)}
              />

              <span className={css.cardHeader}>
                {TextWrang(
                  mobx.exercises?.find((el) => el?.id == item?.body?.exerciseId)?.nameRu +
                    " / " +
                    TextWrang(
                      mobx.exercises?.find((el) => el.id == item.body?.exerciseId)?.nameEng
                    )
                )}
              </span>
              <span className={css.cardTypes}>{item.body?.sets?.length}x{item.body?.sets[0]?.diapazonOt}/{item.body?.sets[0]?.diapazonDo}</span>
            </div>
          ))}
          {exercicesArray?.length > 2 && (
            <span
              className={css.cardOver}
              onClick={() => setAllExersice(!allExesice)}
            >
              {exercicesArray?.length - 2}+ Упражнений
            </span>
          )}
        </motion.div>
      )}
      {nutritionsArray && (
        <>
          <span className={css.type}>
            Питание <Image src={arrow} alt="" className={css.arrow} />
          </span>
          <div className={css.trainingCard}>
            <Image
            alt=""
              src={deleteImg}
              className={css.deleteImg}
              onClick={() => deleteNutritions(nutritionsArray.id)}
            />
            <span className={css.cardHeader}>
              {TextWrang(nutritionsArray?.body?.name)}
            </span>
            <span className={css.cardTypes}>
              {countHandler(
                nutritionsArray.body?.name1,
                nutritionsArray.body?.name2,
                nutritionsArray.body?.name3,
                nutritionsArray.body?.name4,
                nutritionsArray.body?.name5,
                nutritionsArray.body?.name6,
                nutritionsArray.body?.name7
              )}{" "}
            </span>
          </div>
        </>
      )}
      {!allTests && testsArray?.length>0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <span className={css.type}>
            Тесты <Image src={arrow} alt="" className={css.arrow} />
          </span>
          {testsArray?.slice(0, 1)?.map((item, index) => (
            <div className={css.trainingCard}>
            <Image
              src={deleteImg}
              className={css.deleteImg}
              onClick={() => deleteTests(item.id)}
              key={item.id}
            />
            <span className={css.cardHeader}>{TextWrang(item.body?.name)}</span>
            <span className={css.cardTypes}>
              Норматив: {item.body?.item} {item.body?.type}
            </span>
          </div>
          ))}
          {testsArray?.length > 1 && (
            <span
              className={css.cardOver}
              onClick={() => setAllTests(!allExesice)}
            >
              {testsArray?.length - 1}+ Тестов
            </span>
          )}
        </motion.div>
      )}
      {allTests && testsArray?.length>0 && (
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}>
          <span className={css.type}>
            Тесты <Image src={arrow} alt="" className={css.arrow} />
          </span>
          {testsArray?.map((item, index) => (
            <div className={css.trainingCard}>
              <Image
                src={deleteImg}
                className={css.deleteImg}
                onClick={() => deleteTests(item.id)}
                key={item.id}
              />
              <span className={css.cardHeader}>{TextWrang(item.body?.name)}</span>
              <span className={css.cardTypes}>
                Норматив: {item.item} {item.type}
              </span>
            </div>
          ))}
          {testsArray?.length > 1 && (
            <span
              className={css.cardOver}
              onClick={() => setAllTests(!allTests)}
            >
              Скрыть
            </span>
          )}
        </motion.div>
      )}
    </motion.div>
  );
});

function TextWrang(text) {
  if (text && text?.length <= 22) {
    return text;
  } else if (text) {
    return text?.slice(0, 22) + "...";
  } else return "";
}