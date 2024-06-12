"use client";
import mobx from "@/mobx/mobx";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import css from "./JournalCard.module.css";
import NameSokrashatel from "@/utils/NameSokrashatel";

const JournalCard = observer(({ dayItem, filterValue, setTrainingModal,setNutritionModal,setTestModal }) => {
  const [sportsmans, setSportsmans] = useState([]);

  useEffect(() => {
    if (mobx.journal.length > 0) {
      setSportsmans(mobx.journal);
    }
  }, [mobx.journal]);

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{width:'100%'}}>
      {sportsmans.map((e) => (
        <_UserCard sportsman={e} date={dayItem} setTrainingModal={setTrainingModal}  setTestModal={setTestModal} setNutritionModal={setNutritionModal}/>
      ))}
    </motion.div>
  );
});

export default JournalCard;

const _UserCard = observer(({ sportsman, date, setTrainingModal,setNutritionModal,setTestModal }) => {
  const exercices = sportsman.exercises.filter((el) => el.date == date);
  const nutrition = sportsman.nutrition.find((el) => el.date == date);
  const [programmId, setProgrammId] = useState(0)
  const sportprogramm = mobx.sportprogramms.find(
    (el) => el.id == programmId
  );
  const tests = sportsman.tests.filter((el) => el.date == date);

  useEffect(()=>{
    if(exercices.length>0){
      setProgrammId(exercices[0]?.programmId)
      return
    }
    if(nutrition){
      setProgrammId(nutrition?.programmId)
      return
    }
    if(tests.length>0){
      setProgrammId(tests[0]?.programmId)
      return
    }
  })

  if (exercices.length || nutrition|| tests.length) {
    return (
      <div className={css.container}>
        <span className={css.name}>
          {NameSokrashatel({ text: sportsman.name })}
        </span>
        <div className={css.amluaContainer}>
          <span className={css.amluaItem}>{sportsman.team}</span>
          <span className={css.amluaItem}>{sportsman.post}</span>
        </div>
        {sportprogramm && <_CardRow callback={()=>{
          mobx.setCurrentTraining(sportprogramm)
          mobx.setCurrentDate(date)
          setTrainingModal(true);
          }} isFlag={true} flag={mobx.trainingFix.find(el => el?.programmId == sportprogramm?.id && el?.userId == sportprogramm?.id && el?.date == date )?true:false} text={sportprogramm?.name} />}
        {tests?.map((el) => (
          <_CardRow  callback={()=>{

            mobx.setCurrentTest(mobx.tests.find(e => e.id == el.testId))
            setTestModal(true);
          }}  text={mobx.tests.find(e => e.id == el.testId)?.name} 
           isFlag={true} flag={mobx.testFix.find(el => el?.programmId == sportprogramm?.id && el?.date == date && el?.sportsmanId == sportsman?.id)?true:false}
          />
        ))
        }
        {
        nutrition&&<_CardRow callback={()=>{
          mobx.setCurrentTraining(sportprogramm)
          mobx.setCurrentDate(date)
          mobx.setOnePattern(mobx.nutritions.find(el => el.id == nutrition.nutritionId))
          setNutritionModal(true);
        }} isFlag={false}  text={"Еда на день"} />}
      </div>
    );
  }
});

const _CardRow = ({ text, isFlag = false, flag = false, callback }) => {
  return (
    <div className={css.cardRow} onClick={callback?callback:()=>{}}>
      {isFlag && (
        <span
          className={`${css.flag} ${flag ? css.greenFlag : css.redFlag}`}
        ></span>
      )}

      <span className={css.CardRowText}>{text}</span>
    </div>
  );
};
