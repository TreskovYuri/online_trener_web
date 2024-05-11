'use client'
import React, { useEffect } from 'react'
import css from './Tests.module.css'
import mobx from '@/mobx/mobx'
import { observer } from 'mobx-react-lite'
import {motion} from 'framer-motion'

import GroupUtills from '@/http/GroupUtills'

const Tests = observer(({currentTestGroup}) => {

  useEffect(()=>{
    GroupUtills.getTests()
    GroupUtills.getGroups()
    // mobx.setPageName('Упражнения')
  },[])




  return (
    <div className={css.container}>
        <div className={css.cardContainer}>
            {mobx.testsSearch&&
              mobx.testsSearch.filter(e => e.groupId == currentTestGroup || currentTestGroup =='Все').map((card,index) => (
                <motion.div initial={{opacity:0}} whileInView={{opacity:1}} key={card.id} className={css.card} onClick={()=> {mobx.setOneTest(card);mobx.setTestDetails(true)}}>
                    <h3 className={css.cardName}>{card.name}</h3>
                    <span className={css.type}>{mobx.testGroups.find(el => el.id == card.groupId)?.name}</span>
                    <span className={css.label}>Описание</span>
                    <span className={css.description}>{TextWrang(card.description)}</span>
                    <span className={css.norm}>Норматив: {card.item} {card.type}</span>
                </motion.div>
              ))
            }
        </div>
    </div>
  )
})

export default Tests


function TextWrang (text){
  if (text.length <= 120) {
    return text;
} else {
    return text.slice(0, 120) + "...";
}
}
