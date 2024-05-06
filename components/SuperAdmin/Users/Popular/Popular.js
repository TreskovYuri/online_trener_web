'use client'
import React, { useEffect } from 'react'
import css from './Popular.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'
import UserUtills from '@/http/UserUtills'
import Image from 'next/image'
import user from './img/user.jpg'

const Popular = observer(() => {

  useEffect(()=>{
    UserUtills.getUsers()
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
        <h2 className={css.header}>Пользователи</h2>
        <div className={css.cardContainer}>
            {mobx.users&&
              mobx.users.map(card=> (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {mobx.setUpdateUser(true); mobx.setOneUser(card)}}>
                  <div className={css.row}>
                    <div className={css.imgContainer}>
                      {
                        card.img?
                          <Image className={css.img} src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${card.img}`} unoptimized width={50} height={50}/>
                        :
                          <Image className={css.img} src={user} unoptimized width={50} height={50}/>
                      }
                        
                    </div>
                    <div className={css.textContainer}>
                      <h3 className={css.cardName}>{card.name}</h3>
                      <h3 className={css.cardEmail}>{card.email}</h3>
                    </div>

                  </div>
                  <div className={css.typesContainer}>
                      <span>{card.team}</span>
                      <span>{card.post}</span>
                    </div>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Popular