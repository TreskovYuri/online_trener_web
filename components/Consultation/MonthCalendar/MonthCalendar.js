
import css from './MonthCalendar.module.css'
import {motion} from 'framer-motion'
import moment from 'moment'
const monthArray = {
  "January":"Январь",
  "February":"Февраль",
  "March":"Март",
  "April":"Апрель",
  "May":"Май",
  "June":"Июнь",
  "July":"Июль",
  "August":"Август",
  "September":"Сентябрь",
  "October":"Октябрь",
  "November":"Ноябрь",
  "December":"Декабрь"
}

const MonthCalendar = ({startDay}) => {
  const totalDay = 42
  let day = startDay.clone().subtract(1,'day');
  const daysArray = [...Array(42)].map(()=>day.add(1,'day').clone())



  return (
    <div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.header}>{monthArray[moment().format("MMMM")]},<span>{moment().format("YYYY")}</span></motion.div>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.calendarHeader}>
        <div className={css.day}><span>ПН</span></div>
        <div className={css.day}><span>ВТ</span></div>
        <div className={css.day}><span>СР</span></div>
        <div className={css.day}><span>ЧТ</span></div>
        <div className={css.day}><span>ПТ</span></div>
        <div className={css.day}><span>СБ</span></div>
        <div className={css.day}><span>ВС</span></div>
      </motion.div>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.calendar}>
        {
          daysArray.map((dayItem)=>(
            <div key={dayItem.format('DDMMYYYY')} className={css.cell}>
              {moment().format("D") === dayItem.format('D')?
              <div className={dayItem.day()===6 || dayItem.day()===0?`${css.dateNow} ${css.weekend}`:`${css.dateNow}`}><span>{dayItem.format('D')}</span></div>:
              <div className={dayItem.day()===6 || dayItem.day()===0?`${css.date} ${css.weekend}`:`${css.date}`}>{dayItem.format('D')}</div>

            }
              
            </div>
          ))
        }
      </motion.div>
    </div>

  )
}

export default MonthCalendar
