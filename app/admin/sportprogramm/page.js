'use client'
import mobx from '@/mobx/mobx'
import React, { useEffect, useState } from 'react'
import css from './sportprogramm.module.css'
import Image from 'next/image';
import search from './img/search.svg'
import { observer } from 'mobx-react-lite';
import {motion} from 'framer-motion'
import moment from 'moment'
import { useRouter } from 'next/navigation';
import Popular from '@/components/SportProgramm/Popular/Popular';

export const dynamic = 'force-dynamic'

const page = observer(() => {
  const router = useRouter()
  const [typeModal, setTypeModal] = useState(false)
  useEffect(() => {
    mobx.setPageName('Спортивная программа')

  })
  moment.updateLocale('ru', { week: { dow: 1 } });
  const startDay = moment().startOf('month').startOf('week')
  // const endDay = moment().endOf('month').endOf('day'


  return (
<>
<div className={css.container}>
      <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className={css.navbar}>
          <div className={css.add} onClick={()=> router.push('/admin/addsportprogramm')} ><span>+</span>Новая программа</div>
          <div className={css.btn}>
            <Image src={search} alt='Онлайн-Тренер' className={css.img}/>
          </div>
      </motion.div>
      <Popular/>
</div>
</>

  )
})

export default page