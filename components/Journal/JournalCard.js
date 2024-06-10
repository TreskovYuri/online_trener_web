'use client'
import mobx from "@/mobx/mobx";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import css from './JournalCard.module.css'

const JournalCard = observer(({ dayItem, filterValue }) => {
    const [sportsmans, setSportsmans] = useState([])

    useEffect(()=>{
      if(mobx.journal.length>0){
        setSportsmans(mobx.journal)
      }
    },[mobx.journal])

    return (
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} >
        {
          sportsmans.map((e)=><_UserCard sportsman={e} date={dayItem}/>)
        }
      </motion.div>
    );
  });

export default JournalCard



const _UserCard = ({sportsman,date}) => {
  const exercices = sportsman.exercises.filter(el => el.date == date) 
  const nutritions = sportsman.nutrition.filter(el => el.date == date)  
  const tests = sportsman.tests.filter(el => el.date == date)  
  if(exercices.length || nutritions.length || tests.length){
    return <div className={css.container}>
    <span>{sportsman.name}</span>
    <span>{exercices.length}</span>
    <span>{nutritions.length}</span>
    <span>{tests.length}</span>
    </div>
  }

}