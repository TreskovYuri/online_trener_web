'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './consultation.module.css'
import Image from 'next/image';
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import MonthCalendar from '@/components/Consultation/MonthCalendar/MonthCalendar';
import {motion} from 'framer-motion'
import moment from 'moment'
import WeekCalendar from '@/components/Consultation/WeekCalendar/WeekCalendar';
import AddConsultation from '@/components/Consultation/AddConsultation/AddConsultation';
import ConsultationUtills from '@/http/ConsultationUtills';



const page = observer(() => {
  const [typeModal, setTypeModal] = useState(false)
  useEffect(() => {
    mobx.setPageName('Консультации')
    ConsultationUtills.getConsultations()
    ConsultationUtills.getConsultationsConnections()
  })
  moment.updateLocale('ru', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week')
  // const endDay = moment().endOf('month').endOf('day'


  return (
<>
{mobx.addComsultation&&<AddConsultation/>}
<div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=> mobx.setAddConsultation(true)} ><span>+</span>Создать консультацию</div>
          <div className={`${css.add} ${css.addWeek}`} onClick={()=>setTypeModal(!typeModal)}>
          {mobx.consultationWeekYear}
            <Image src={favorite} alt='Онлайн-Тренер' className={typeModal?`${css.img} ${css.imgActive}`:`${css.img}`}/>
            {typeModal&&
              <motion.div initial={{opacity:0}} whileInView={{opacity:1}} className={css.typeModal}>
                <span className={mobx.consultationWeekYear==='Неделя'?`${css.type} ${css.activeType}`:`${css.type}`} onClick={()=> mobx.setConsultationWeekYear('Неделя')}>Неделя</span>
                <span className={mobx.consultationWeekYear==='Месяц'?`${css.type} ${css.activeType}`:`${css.type}`} onClick={()=> mobx.setConsultationWeekYear('Месяц')}>Месяц</span>
              </motion.div>
            }

          </div>
          <div className={css.btn}>
            <Image src={search} alt='Онлайн-Тренер' className={css.img}/>
          </div>
      </motion.div>
      {mobx.consultationWeekYear === 'Месяц'?
      <MonthCalendar startDay={startDay}/>:
      <WeekCalendar />
    }
      
    </div>
</>

  )
})

export default page