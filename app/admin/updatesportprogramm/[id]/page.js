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
import SportProgrammUtills from '@/http/SportProgrammUtills';
import PatternUtills from '@/http/PatternUtills';
import TrainingUtills from '@/http/TrainingUtills';
import GroupUtills from '@/http/GroupUtills';
import UserUtills from '@/http/UserUtills';
import UpdateProgramm from '@/components/SportProgramm/UpdateProgramm/UpdateProgramm';


export const dynamic = 'force-dynamic'


const page = observer(({params}) => {
  const router = useRouter()
  const [typeModal, setTypeModal] = useState(false)

  useEffect(() => {
    mobx.setPageName('Спортивная программа')

    SportProgrammUtills.getOneProgramm(params.id)
    SportProgrammUtills.getExersicesById(params.id)
    SportProgrammUtills.getNutritionsById(params.id)
    SportProgrammUtills.getTestsById(params.id)
    SportProgrammUtills.getUsersById(params.id)
    PatternUtills.getAllNutrition()
    TrainingUtills.getExercise()
    GroupUtills.getTests()
    UserUtills.getSportsmans()
    
    return ()=>{
      mobx.setSportprogrammUsers([])
      mobx.setSportprogrammNutritions([])
      mobx.setSportprogrammTests([])
      mobx.setSportprogrammExersices([])
      mobx.setOneSprotProgramm([])
    }
  },[])

  
  moment.updateLocale('ru', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week')
  // const endDay = moment().endOf('month').endOf('day'


  return (
<>
<div className={css.container}>
    <UpdateProgramm/>
</div>
</>

  )
})

export default page