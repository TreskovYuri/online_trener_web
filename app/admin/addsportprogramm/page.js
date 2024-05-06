'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './AddProgramm.module.css'
import Image from 'next/image';
import favorite from './img/favorite.svg'
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import MonthCalendar from '@/components/Consultation/MonthCalendar/MonthCalendar';
import {motion} from 'framer-motion'
import moment from 'moment'
import AddConsultation from '@/components/Consultation/AddConsultation/AddConsultation';
import ConsultationUtills from '@/http/ConsultationUtills';
import WeekCalendar from '@/components/SportProgramm/WeekCalendar/WeekCalendar';
import AddProgramm from '@/components/SportProgramm/AddProgramm/AddProgramm';
import { useRouter } from 'next/navigation';


export const dynamic = 'force-dynamic'


const page = observer(() => {
  const router = useRouter()
  const [typeModal, setTypeModal] = useState(false)
  useEffect(() => {
    mobx.setPageName('Спортивная программа')
    ConsultationUtills.getConsultations()
    ConsultationUtills.getConsultationsConnections()
  })
  moment.updateLocale('ru', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week')
  // const endDay = moment().endOf('month').endOf('day'


  return (
<>
<div className={css.container}>
    <AddProgramm/>
</div>
</>

  )
})

export default page