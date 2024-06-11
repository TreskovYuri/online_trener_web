"use client";
import mobx from "@/mobx/mobx";
import { motion } from "framer-motion";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import css from "./JournalCard.module.css";
import Sokrashatel from "@/utils/Sokrashatel";

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
  const nutritions = sportsman.nutrition.filter((el) => el.date == date);
  const sportprogramm = mobx.sportprogramms.find(
    (el) => el.id == exercices[0]?.programmId
  );
  const tests = sportsman.tests.filter((el) => el.date == date);


  if (exercices.length || nutritions.length || tests.length) {
    return (
      <div className={css.container}>
        <span className={css.name}>
          {Sokrashatel({ text: sportsman.name })}
        </span>
        <div className={css.amluaContainer}>
          <span className={css.amluaItem}>{sportsman.team}</span>
          <span className={css.amluaItem}>{sportsman.post}</span>
        </div>
        {sportprogramm && <_CardRow callback={()=>setTrainingModal(true)} isFlag={true} flag={true} text={sportprogramm?.name} />}
        {tests?.map((el) => (
          <_CardRow callback={()=>setTestModal(true)}  text={mobx.tests.find(e => e.id == el.testId)?.name} />
        ))}
        {nutritions&&<_CardRow callback={()=>setNutritionModal(true)} isFlag={true} flag={false} text={"Еда на день"} />}
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
