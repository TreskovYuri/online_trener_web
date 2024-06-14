"use client";
import RigthModalWind from "@/components/widgets/RigthModalWind/RigthModalWind";
import SportProgrammUtills from "@/http/SportProgrammUtills";
import TrainingUtills from "@/http/TrainingUtills";
import mobx from "@/mobx/mobx";
import React, { useEffect, useState } from "react";
import css from './FutureTrainingDetails.module.css'
import smile from '../img/smile.svg'
import defaultImg from '../img/defaultImg.jpg'
import Image from "next/image";
import { observer } from "mobx-react-lite";
import EquipmentsListScroll from "@/components/widgets/EquipmentsListScroll/EquipmentsListScroll";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import DescriptionModalTitleArrow from "@/components/widgets/MODALS/DescriptionModalTitleArrow/DescriptionModalTitleArrow";

const FutureTrainingDetails = observer(({ setModal }) => {
  useEffect(() => {
    SportProgrammUtills.getExersicesById(mobx.currentTraining?.id);
    
  }, []);
  const exersicesBelong = mobx.sportprogrammExersices.filter(
    (el) => el.date == mobx.currentDate
  );
  const exercises = mobx.exercises;
  const [equipment, setEquipment] = useState([]) 
  useEffect(()=>{
      exersicesBelong.forEach((e) => {
        const exercise = exercises.find(el => el.id == e.exerciseId)
        JSON.parse(exercise?.equipment)?.forEach(eq => {
          if(!equipment.includes(eq)){
            setEquipment([eq,...equipment])
          }
        })
      })
  },[exersicesBelong])

  return (
    <RigthModalWind setModal={setModal}>
      <div className={css.container}>
        <div className={css.header}>
          <h2 className={css.title}>{mobx.currentTraining?.name}</h2>
          <Image src={smile} unoptimized className={css.smile} />
        </div>
        <div className={css.imgBlock}>
          <EquipmentsListScroll list={equipment}/>
        </div>
        {
          exersicesBelong.map(belong => <ExerciseCard belong={belong} exercises={exercises} callback={()=>{}}/>)
        }
        <DescriptionModalTitleArrow title={'Описание'} description={<div>{'adawdw'}</div>}/>
      </div>
    </RigthModalWind>
  );
});

export default FutureTrainingDetails;
