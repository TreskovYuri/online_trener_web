import Image from "next/image";
import css from "./WeekCalendar.module.css";
import { motion } from "framer-motion";
import moment from "moment";
import mobx from "@/mobx/mobx";
import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import leftArrow from "./img/leftArrow.svg";
import rightArrow from "./img/rightArrow.svg";
import userImg from './img/user.jpg'
import filter from './img/filter.svg'
import update from './img/update.svg'
import { useRouter } from "next/navigation";

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
  const router = useRouter()
  const [count, setCount] = useState(0);
  let day = moment().subtract(1, "day").subtract(count, "week");
  const daysArray = [...Array(7)].map(() => day.add(1, "day").clone());
  const [users, setUsers] = useState([])
  const [filterModal, setFilterModal] = useState(false)
  const [filterValue, setFilterValue] = useState('Все')





  return (
    <div className={css.container}>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className={css.header}
      >
        {monthArray[moment().subtract(count, "week").format("MMMM")]},
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
        <div className={css.userImgContainer}>
          {
            users.map(user => (
              user?.img ?
                <Image src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${user?.img}`} width={20} height={20} unoptimized className={css.userHeaderImg} /> :
                <Image src={userImg} width={20} height={20} unoptimized className={css.userHeaderImg} />
            ))
          }
        </div>
        <div className={css.filterContainer}>
          <div className={css.filterBox} onClick={() => {}} >
            <Image
              src={update}
              className={css.filter}

            />

          </div>
          <div className={css.filterBox} onClick={() => setFilterModal(!filterModal)}>
            <Image
              src={filter}
              className={css.filter}
            />

          </div>
          {
            filterModal &&
            <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
              <span className={filterValue == 'Питание' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setFilterValue('Питание'); setFilterModal(false) }}>Питание</span>
              <span className={filterValue == 'Упражнения' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setFilterValue('Упражнения'); setFilterModal(false) }}>Упражнения</span>
              <span className={filterValue == 'Тесты' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setFilterValue('Тесты'); setFilterModal(false) }}>Тесты</span>
              <span className={filterValue == 'Все' ? `${css.filterSpan} ${css.filterSpanActive}` : `${css.filterSpan}`} onClick={() => { setFilterValue('Все'); setFilterModal(false) }}>Все</span>
            </motion.div>
          }
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
              <Card dayItem={dayItem.format("DD.MM.YYYY")} exercicesArray={mobx.finalExersiceArrayOnDragAndDrop.filter(el => el.date == dayItem.format("DD.MM.YYYY"))} testsArray={mobx.finalTestsArrayOnDragAndDrop.filter(el => el.date == dayItem.format("DD.MM.YYYY"))}
                nutritionsArray={mobx.finalNutritionArrayOnDragAndDrop.find(el => el.date == dayItem.format("DD.MM.YYYY"))} filterValue={filterValue} />
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default WeekCalendar;

const Card = observer(({ dayItem, exercicesArray, testsArray, nutritionsArray, filterValue }) => {


  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
    >

    </motion.div>
  );
});


