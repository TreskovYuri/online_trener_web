'use client'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'
import SportProgrammUtills from '@/http/SportProgrammUtills'
import { useRouter } from 'next/navigation'

const Popular = observer(() => {
  const router = useRouter()

  useEffect(()=>{
    SportProgrammUtills.getProgramms()
    SportProgrammUtills.getExersices()
  },[])

  const pluralize = (number, one, two, five) => {
    if (number % 10 === 1 && number % 100 !== 11) {
        return one;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
        return two;
    } else {
        return five;
    }
};

const countHandler = (id) => {
    let count = 0;
    mobx.sportprogrammExersices.forEach(exersice => {
      if( exersice.programmId == id){
        count++
      }
    })
    return `${count} ${pluralize(count, 'тренировка', 'тренировки', 'тренировок')}`;
};


  return (
    <div className={css.container}>
        <h2 className={css.header}>Популярное</h2>
        <div className={css.cardContainer}>
            {mobx.sportprogrammsSearch&&
              mobx.sportprogrammsSearch.map((card,index) => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {router.push(`/admin/sportprogrammdetails/${card.id}`)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.count}>
                      {countHandler(card.id)} 
                    </span>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular