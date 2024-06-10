'use client'
import css from './WeekCalendar.module.css'
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";
import {  useState } from "react";
import leftArrow from "./img/leftArrow.svg";
import rightArrow from "./img/rightArrow.svg";
import filter from './img/filter.svg'
import update from './img/update.svg'
import MonthEngStringToRusString from "@/utils/MonthEngStringToRusString";

const JournalHeader = ({count,filterValue,setFilterValue,setCount}) => {
    const [filterModal, setFilterModal] = useState(false)
    return       <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className={css.header}
  >
    {MonthEngStringToRusString({month:moment().subtract(count, "week").format("MMMM")})},
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
  }

export default JournalHeader