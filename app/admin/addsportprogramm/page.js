'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect} from 'react'
import css from './AddProgramm.module.css'
import { observer } from 'mobx-react-lite';
import moment from 'moment'
import ConsultationUtills from '@/http/ConsultationUtills';
import AddProgramm from '@/components/SportProgramm/AddProgramm/AddProgramm';

import TrainingUtills from '@/http/TrainingUtills';


export const dynamic = 'force-dynamic'


const page = observer(() => {

  useEffect(() => {
    mobx.setPageName('Спортивная программа')
    ConsultationUtills.getConsultations()
    ConsultationUtills.getConsultationsConnections()
    TrainingUtills.getExerciseGroups()
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