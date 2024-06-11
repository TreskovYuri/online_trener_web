
import Image from 'next/image';
import css from './WeekCalendar.module.css'
import img from '../../Header/img/user.jpg'
import {motion} from 'framer-motion'
import moment from 'moment'
import mobx from '@/mobx/mobx';
import { useEffect } from 'react';

const monthArray = {
  "January": "Январь",
  "February": "Февраль",
  "March": "Март",
  "April": "Апрель",
  "May": "Май",
  "June": "Июнь",
  "July": "Июль",
  "August": "Август",
  "September": "Сентябрь",
  "October": "Октябрь",
  "November": "Ноябрь",
  "December": "Декабрь"
}
const monthArray2 = {
  "January": "января",
  "February": "февраля",
  "March": "марта",
  "April": "апреля",
  "May": "мая",
  "June": "июня",
  "July": "июля",
  "August": "августа",
  "September": "сентября",
  "October": "октября",
  "November": "ноября",
  "December": "декабря"
}
const days = ['вс','пн','вт','ср','чт','пт','сб',]

const WeekCalendar = () => {
  const totalDay = 42
  let day = moment().subtract(1, 'day');
  const daysArray = [...Array(7)].map(() => day.add(1, 'day').clone())




  return (
    <div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.header}>{monthArray[moment().format("MMMM")]},<span>{moment().format("YYYY")}</span></motion.div>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.calendar}>
        {
          daysArray.map((dayItem) => (
            <div className={css.card} key={dayItem.format('DDMMYYYY')}>
                <div className={css.dateContainer}>
                  <span className={moment().format('D')===dayItem.format('D')? `${css.headerDay} ${css.headerDayActive}`: `${css.headerDay}`}>{dayItem.format('D')} {monthArray2[dayItem.format('MMMM')]}</span>
                  <span className={css.headerWeek}>{days[dayItem.day()]}</span>
                </div>
              <div  className={css.cell}>
                <span className={css.clock}>08:00</span>
                {mobx.consultations&& mobx.consultations.some(con => new Date(con.date).getHours()===8) && mobx.consultations.some(con => new Date(con.date).getDaеу()===dayItem.format('D')) &
                <div className={css.userCard}>
                  {/* <Image src={img} className={css.userImg} />
                  <span className={css.userName}>Иванов И.И.</span>
                  <span className={css.userDesxr}>Консультация по тренировочному плану</span> */}
                </div> 
              }

              </div>
              <div  className={css.cell}>
                <span className={css.clock}>09:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>10:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>11:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>12:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>13:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>14:00</span>
                {mobx.consultations&& mobx.consultations.some(con => new Date(con.date).getHours()===14) && mobx.consultations.some(con => new Date(con.date).getDate()===parseInt(dayItem.format('D'))) &&
                <div className={css.userCard}>
                  <Image src={img} className={css.userImg} />
                  <span className={css.userName}>Иванов И.И.</span>
                  <span className={css.userDesxr}>Консультация по тренировочному плану</span>
                </div> 
              }
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>15:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>16:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>17:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>18:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>19:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>20:00</span>
              </div>
              <div  className={css.cell}>
                <span className={css.clock}>21:00</span>
                {mobx.consultations&& mobx.consultations.some(con => new Date(con.date).getHours()===21) && mobx.consultations.some(con => new Date(con.date).getDay()===21) &&
                <div className={css.userCard}>
                  <Image src={img} className={css.userImg} />
                  <span className={css.userName}>Иванов И.И.</span>
                  <span className={css.userDesxr}>Консультация по тренировочному плану</span>
                </div> 
              }
              </div>
            </div>

          ))
        }
      </motion.div>
    </div>

  )
}

export default WeekCalendar
