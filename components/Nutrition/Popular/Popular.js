'use client'
import PatternUtills from '@/http/PatternUtills'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'

const Popular = observer(() => {

  useEffect(()=>{
    PatternUtills.getPopular()
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

const countHandler = (one, two, three, four, five, six, seven) => {
    let count = 0;
    one && count++;
    two && count++;
    three && count++;
    four && count++;
    five && count++;
    six && count++;
    seven && count++;
    return `${count} ${pluralize(count, 'прием', 'приема', 'приемов')} пищи`;
};


  return (
    <div className={css.container}>
        <h2 className={css.header}>Популярное</h2>
        <div className={css.cardContainer}>
            {mobx.popularPatternsSearch&&
              mobx.popularPatternsSearch.map((card,index) => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {mobx.setOnePattern(card);mobx.setPatternDetails(true)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.count}>
                      {countHandler(card.name1,card.name2,card.name3,card.name4,card.name5,card.name6,card.name7)} 
                    </span>
                    <span className={css.descrHeader}>Описание</span>
                    <span className={css.description}>{card.description}</span>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular