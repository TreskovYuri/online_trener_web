"use client";
import React from "react";
import RigthModalWind from "../widgets/RigthModalWind/RigthModalWind";
import mobx from "@/mobx/mobx";
import { motion } from "framer-motion";
import arrow from "./img/arrow.svg";
import Image from "next/image";
import { useState } from "react";
import css from "./NutritionDetails.module.css";
import { observer } from "mobx-react-lite";

const NutritionDetails = observer(({ setModal }) => {
  const [name1Flag, setName1Flag] = useState(false);
  const [name2Flag, setName2Flag] = useState(false);
  const [name3Flag, setName3Flag] = useState(false);
  const [name4Flag, setName4Flag] = useState(false);
  const [name5Flag, setName5Flag] = useState(false);
  const [name6Flag, setName6Flag] = useState(false);
  const [name7Flag, setName7Flag] = useState(false);
  const nutrition = mobx.OnePattern;


  
  return (
    <RigthModalWind setModal={setModal}>
      <div className={css.container}>
      <div className={css.headerContainer}>
            <h2 className={css.header}>{nutrition?.name}</h2>
          </div>
          <span className={css.label}>Описание</span>
          <span className={css.description}>{nutrition?.description}</span>
          <span className={css.label}>Рекомендации</span>
          <span className={css.description}>{nutrition?.recomendation}</span>
          <div className={css.headerContainer}>
            <h2 className={css.header}>Приемы пищи</h2>
          </div>
          {nutrition?.name1 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName1Flag(!name1Flag)}>
                <span className={css.cardName}>{nutrition?.name1}</span>
                <Image src={arrow} alt="" className={name1Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name1Flag && (
                <span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.cardDescription}>
                  {nutrition?.description1}
                </span>
              )}
            </>
          )}
          {nutrition?.name2 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName2Flag(!name2Flag)}>
                <span className={css.cardName}>{nutrition?.name2}</span>
                <Image src={arrow} alt="" className={name2Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name2Flag && <span className={css.cardDescription}>{nutrition?.description2}</span>}
            </>
          )}
          {nutrition?.name3 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName3Flag(!name3Flag)}>
                <span className={css.cardName}>{nutrition?.name3}</span>
                <Image src={arrow} alt="" className={name3Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name3Flag && <span className={css.cardDescription}>{nutrition?.description3}</span>}
            </>
          )}
          {nutrition?.name4 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName4Flag(!name4Flag)}>
                <span className={css.cardName}>{nutrition?.name4}</span>
                <Image src={arrow} alt="" className={name4Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name4Flag && <span className={css.cardDescription}>{nutrition?.description4}</span>}
            </>
          )}
          {nutrition?.name5 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName5Flag(!name5Flag)}>
                <span className={css.cardName}>{nutrition?.name5}</span>
                <Image src={arrow} alt="" className={name5Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name5Flag && <span className={css.cardDescription}>{nutrition?.description5}</span>}
            </>
          )}
          {nutrition?.name6 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName6Flag(!name6Flag)}>
                <span className={css.cardName}>{nutrition?.name6}</span>
                <Image src={arrow} alt="" className={name6Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name6Flag && <span className={css.cardDescription}>{nutrition?.description6}</span>}
            </>
          )}
          {nutrition?.name7 && (
            <>
              <div className={css.cardNameButton} onClick={() => setName7Flag(!name7Flag)}>
                <span className={css.cardName}>{nutrition.name7}</span>
                <Image src={arrow} alt="" className={name7Flag ? `${css.img}` : `${css.img} ${css.imgArrow}`} />
              </div>
              {name7Flag && <span className={css.cardDescription}>{nutrition.description7}</span>}
            </>
          )}
      </div>
    </RigthModalWind>
  );
});

export default NutritionDetails;
