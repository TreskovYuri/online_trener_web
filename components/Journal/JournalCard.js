"use client";
import mobx from "@/mobx/mobx";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import css from "./JournalCard.module.css";
import NameSokrashatel from "@/utils/NameSokrashatel";
import ParseDateOnString from "@/utils/ParseDateOnString";
import СompareWithCurrentDate from "@/utils/СompareWithCurrentDate";

const JournalCard = observer(({ dayItem, filterValue, setTrainingModal,setNutritionModal,setTestModal,setFutureTrainingModal }) => {
  const [sportsmans, setSportsmans] = useState([]);

  useEffect(() => {
    if (mobx.journal.length > 0) {
      setSportsmans(mobx.journal);
    }
  }, [mobx.journal]);

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} style={{width:'100%'}}>
      {sportsmans.map((e) => (
        <_UserCard sportsman={e} date={dayItem} setTrainingModal={setTrainingModal}  setTestModal={setTestModal} setNutritionModal={setNutritionModal} setFutureTrainingModal={setFutureTrainingModal}/>
      ))}
    </motion.div>
  );
});

export default JournalCard;

const _UserCard = observer(({ sportsman, date, setTrainingModal,setNutritionModal,setTestModal,setFutureTrainingModal }) => {
  const exercices = sportsman.exercises.filter((el) => el.date == date);
  const nutrition = sportsman.nutrition.find((el) => el.date == date);
  const [programmId, setProgrammId] = useState(0)
  const sportprogramm = mobx.sportprogramms.find(
    (el) => el.id == programmId
  );
  const tests = sportsman.tests.filter((el) => el.date == date);
  const isExerciseFix = mobx.trainingFix.find(el => el?.programmId == sportprogramm?.id && el?.userId == sportsman?.id && el?.date == date )?true:false
  const isTestFix = mobx.testFix.find(el => el?.programmId == sportprogramm?.id && el?.date == date && el?.sportsmanId == sportsman?.id)?true:false
  const training = sportsman.days?.find(day=>day.date==date)?.training

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

  if (exercices.length || nutrition|| tests.length || training) {
    return (
      <div className={css.container}>
        <span className={css.name}>
          {NameSokrashatel({ text: sportsman.name })}
        </span>
        <div className={css.amluaContainer}>
          <span className={css.amluaItem}>{sportsman.team}</span>
          <span className={css.amluaItem}>{sportsman.post}</span>
        </div>
        {
        training&&<_CardRow callback={()=>{
          console.log(training)
        }} isFlag={false}  text={training.name} />}
        {exercices.length>0 && <_CardRow callback={()=>{
          mobx.setCurrentTraining({
            ...sportprogramm,
            sportsmanId:sportsman.id
          })
          mobx.setCurrentDate(date)
          mobx.setCurrentExercise()
          if(!isExerciseFix &&  СompareWithCurrentDate(ParseDateOnString(date))){
            setFutureTrainingModal(true)
          }else{
            setTrainingModal(true);
          }
          
          }} isFlag={isExerciseFix || !СompareWithCurrentDate(ParseDateOnString(date))} flag={isExerciseFix} text={sportprogramm?.name} />}
        {tests?.map((el) => (
          <_CardRow  callback={()=>{
            mobx.setCurrentDate(date)
            mobx.setCurrentTest({
              ...mobx.tests.find(e => e.id == el.testId),
              programmId:programmId
            })
            setTestModal(true);
          }}  text={mobx.tests.find(e => e.id == el.testId)?.name} 
           isFlag={isTestFix || !СompareWithCurrentDate(ParseDateOnString(date))} flag={isTestFix}
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
