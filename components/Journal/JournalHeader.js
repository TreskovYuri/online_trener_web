'use client'
import css from './WeekCalendar.module.css'
import Image from "next/image";
import { motion } from "framer-motion";
import moment from "moment";
import {  useState } from "react";
import leftArrow from "./img/leftArrow.svg";
import rightArrow from "./img/rightArrow.svg";
import filter from './img/filter.svg'
import arrow from './img/arrow.svg'
import filter1 from './img/filter1.svg'
import MonthEngStringToRusString from "@/utils/MonthEngStringToRusString";
import ListConstants from '@/constants/lists';




const JournalHeader = ({count,filterValue,setFilterValue,setCount}) => {
    const [filter2Modal, setFilter2Modal] = useState(false)
    const [filter2_Amplua_Modal, setFilter2_Amplua_Modal] = useState(false)
    const [filter2_Comands_Modal, setFilter2_Comands_Modal] = useState(false)
    const [filter1Modal, setFilter1Modal] = useState(false)
    const [currentFilter1, setCurrentFiler1] = useState('Все')
    const [currentFilter2, setCurrentFiler2] = useState('Все')
    const [currentAmlua, setCurrenAmlua] = useState('Все')


    const handleFilter1Click = (text) => {
      setCurrentFiler1(text)
      setFilter1Modal(false)
    }

    const handleFilter2Click = (text) => {
      switch (text) {
        case 'Амплуа':
          setCurrentFiler2(text)
          setFilter2_Amplua_Modal(true)
          break;
        case 'Команда':
          setCurrentFiler2(text)
          setFilter2_Comands_Modal(true)
          break;
        case 'Назад':
          setFilter2_Amplua_Modal(false)
          setFilter2_Comands_Modal(false)
          break;
      
        default:
          break;
      }
    }

    return       <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    className={css.header}
  >
    {MonthEngStringToRusString({month:moment().subtract(count, "week").format("MMMM")})},
    <span>{moment().subtract(count, "week").format("YYYY")}</span>
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
      <div className={css.filterBox} onClick={() => setFilter1Modal(!filter1Modal)} >
        <Image
          src={filter1}
          className={css.filter}
  
        />
  
      </div>
      <div className={css.filterBox} onClick={() => setFilter2Modal(!filter2Modal)}>
        <Image
          src={filter}
          className={css.filter}
        />
  
      </div>
      {filter1Modal && <FilterModalWind handleFilter1Click={handleFilter1Click} current={currentFilter1}  list={["Выполненные","Пропущенные","Все",]}/> }
      {filter2Modal && <FilterModalWind handleFilter1Click={handleFilter2Click} type={2}  list={["Амплуа","Группа","Команда",]}/> }
      {filter2_Amplua_Modal && <FilterModalWind handleFilter1Click={handleFilter2Click} current={currentFilter2} type={11}  list={ListConstants.Amplua}/> }
      {filter2_Comands_Modal && <FilterModalWind handleFilter1Click={handleFilter2Click} current={currentFilter2} type={11}  list={ListConstants.Comands}/> }
    </div>
  </motion.div>
  }

export default JournalHeader


const FilterModalWind = ({handleFilter1Click, list, type = 1, current}) => {
  return  <motion.div initial={{ opacity: 1 }} whileInView={{ opacity: 1 }} className={css.filterModal}>
    {type==11&& <div className={`${css.filterSpanEx}`} onClick={() => handleFilter1Click('Назад')}><Image src={arrow} className={css.arrowFilter1} />{current}</div>}
    {
      list.map(el => <span key={el} className={`${css.filterSpan} ${css.filterSpanBetween} ${el == current&&css.filterSpanActive}`} onClick={() => handleFilter1Click(el)}>{el}{type>1&&<Image src={arrow} className={css.arrowFilter} />}</span>)
    }
  {type>1&& <span className={`${css.filterSpan} ${css.filterSpanEnd}`} onClick={handleFilter1Click}>Сбросить </span>}

</motion.div>
}