'use client'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import { useRouter } from 'next/navigation'
import SportProgrammHandlers from '@/utils/handlers/SportProgrammHandlers'

const Popular = observer(() => {
  const router = useRouter()

  useEffect(()=>{
    SportProgrammUtills.getProgramms()
    SportProgrammUtills.getExersices()
  },[])



  return (
    <div className={css.container}>
        <h2 className={css.header}>Популярное</h2>
        <div className={css.cardContainer}>
            {mobx.sportprogrammsSearch&&
              mobx.sportprogrammsSearch.map(card => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {router.push(`/admin/sportprogrammdetails/${card.id}`)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.count}>
                      {SportProgrammHandlers.trainingCounterByCard(card)} 
                    </span>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular