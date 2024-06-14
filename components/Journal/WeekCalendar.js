'use client'
import css from "./WeekCalendar.module.css";
import { motion } from "framer-motion";
import moment from "moment";
import {  useState } from "react";
import { observer } from "mobx-react-lite";
import MonthEngStringToRusString from "@/utils/MonthEngStringToRusString";
import RuDaysWeekOnInt from "@/utils/RuDaysWeekOnInt";
import JournalHeader from "./JournalHeader";
import JournalCard from "./JournalCard";


const WeekCalendar = observer(({setTrainingModal,setNutritionModal,setTestModal,setFutureTrainingModal,}) => {
  const [count, setCount] = useState(0);
  let day = moment().subtract(1, "day").subtract(count, "week");
  const daysArray = [...Array(7)].map(() => day.add(1, "day").clone());
  const [filterValue, setFilterValue] = useState('Все')



 

  return (
    <div className={css.container}>
      <JournalHeader count={count}filterValue={filterValue} setFilterValue={setFilterValue} setCount={setCount}/>
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
                {dayItem.format("D")} {MonthEngStringToRusString({month:dayItem.format("MMMM")})}
              </span>
              <span className={css.headerWeek}>{RuDaysWeekOnInt({day:dayItem.day()})}</span>
            </div>
            <div className={css.cell} onDragOver={(e) => e.preventDefault()}>
              <JournalCard dayItem={dayItem.format("DD.MM.YYYY")}filterValue={filterValue} setTrainingModal={setTrainingModal} setTestModal={setTestModal} setNutritionModal={setNutritionModal} setFutureTrainingModal={setFutureTrainingModal}/>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
});

export default WeekCalendar;




