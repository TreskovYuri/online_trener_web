"use client";
import mobx from "@/mobx/mobx";
import css from "./UpdatePatern.module.css";
import { motion } from "framer-motion";
import favorite from "./img/delete.svg";
import plus from "./img/plus.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import TrainingUtills from "@/http/TrainingUtills";
import { observer } from "mobx-react-lite";
import GroupUtills from "@/http/GroupUtills";

const AddPatern = observer(() => {
  const [name, setName] = useState("");

  const [time, setTime] = useState("");
  const [sets, setSets] = useState("");
  const [updateCard, setUpdateCard] = useState({});
  const [modalUpdateExercise, setModalUpdateExercise] = useState(false);

  const [setsObject, setSetsObject] = useState([]);
  const [exesiceId, setExesiceId] = useState([]);
  const [testsId, setTestseId] = useState([]);

  const [globalExersicesArray, setGlobalExersicesArray] = useState([]);
  const [finalglobalExersicesArray, setFinalGlobalExersicesArray] = useState(
    []
  );

  const [typePage, setTypePage] = useState("Упражнения");

  useEffect(() => {
    TrainingUtills.getExercise();
    GroupUtills.getTests();
  }, []);

  useEffect(() => {
    console.log(globalExersicesArray);
  }, [globalExersicesArray]);

  useEffect(() => {
    setName(mobx.OneTrainingPattern?.name)
    let array = []
    let idArray =[]
    if (mobx.trainingBelongs[0]?.sets) {
      mobx.trainingBelongs.forEach((belong) => {
        if (belong.programmId == mobx.OneTrainingPattern.id) {
          const sets = JSON.parse(belong.sets);
          idArray.push(belong.exerciseId)
          array.push({
            exersiceId: belong.exerciseId,
            sets: sets, // Используем новый массив newSets для добавления в глобальный массив
            time: belong.time || "",
          })
          // setGlobalExersicesArray([
          //   ...globalExersicesArray,
          //   {
          //     exersiceId: belong.exerciseId,
          //     sets: sets, // Используем новый массив newSets для добавления в глобальный массив
          //     time: belong.time || "",
          //   },
          // ]);
          // setFinalGlobalExersicesArray([
          //   ...finalglobalExersicesArray,
          //   {
          //     exersiceId: belong.exerciseId,
          //     sets: sets, // Используем новый массив newSets для добавления в глобальный массив
          //     time: belong.time || "",
          //   },
          // ]);
        }
      });
      setExesiceId([...exesiceId, ...idArray])
      setGlobalExersicesArray([...globalExersicesArray,...array])
      setFinalGlobalExersicesArray([...finalglobalExersicesArray,...array])
    }
  }, [mobx.trainingBelongs]); 

  useEffect(() => {

    if (mobx.testBelongs) {
      let array = []
      mobx.testBelongs?.filter(el=> el.programmId == mobx.OneTrainingPattern.id)?.forEach((belong) => {
        array.push(belong.testId)
      });
      setTestseId([...testsId,...array])
    }
  }, [mobx.testBelongs]);

  const deleteExercises = (id) => {
    setExesiceId(exesiceId.filter((exerciseId) => exerciseId !== id));
    setFinalGlobalExersicesArray(finalglobalExersicesArray.filter((el) => el.exersiceId != id));
  };
  const deleteTest = (id) => {
    setTestseId(testsId.filter((testId) => testId !== id));
    setFinalGlobalExersicesArray(
      finalglobalExersicesArray.filter((el) => el.exerciseId !== id)
    );
  };

  const openUpdateModal = async (exercise) => {
    // const obj = await setsObject.find((obj) => obj.id === exercise.id);
    // if (obj) {
    //   setSets(obj.sets);
    //   setTime(obj.time);
    // } else {
    //   setSets("4x15");
    //   setTime("30 сек");
    // }
    setModalUpdateExercise(true);
    setUpdateCard(exercise);
  };

  const addExercise = (id) => {
    setExesiceId([...exesiceId, id]);
    setFinalGlobalExersicesArray([
      ...finalglobalExersicesArray,
      globalExersicesArray.find((el) => el.exersiceId == id),
    ]);
  };
  const addTest = (id) => {
    setTestseId([...testsId, id]);
  };

  const save = async () => {
    if (!name) {
      ErrorHandler("Заполните обязательные поля!");
      return;
    }
    const formData = new FormData();
    mobx.OneTrainingPattern?.id && formData.append("id", mobx.OneTrainingPattern.id) 
    name && formData.append("name", name) 
    finalglobalExersicesArray &&
      formData.append("exersices", JSON.stringify(finalglobalExersicesArray));
    testsId && formData.append("tests", JSON.stringify(testsId));
    const data = await TrainingUtills.updatePattern(formData);
    if (data === "ok") {
      mobx.setAddPattern(false);
    }
  };

  return (
    <motion.div
      initial={{ onPaste: 0 }}
      whileInView={{ opacity: 1 }}
      className={css.container}
      onClick={() => mobx.setUpdateTrainingPattern(false)}
    >
      <motion.div
        initial={{ x: 200 }}
        whileInView={{ x: 0 }}
        transition={{ duration: 0.2 }}
        className={css.modalWind}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={css.headerContainer}>
          <h2 className={css.header}>Новый шаблон</h2>
          <div className={css.btn} onClick={()=>TrainingUtills.deleteTrainingPattern(mobx.OneTrainingPattern.id)}>
            <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
          </div>
        </div>
        <div>
          <input
            type="text"
            className={`${css.input} ${css.name}`}
            placeholder="Название"
            id="password"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className={css.headerContainer}>
          <div className={css.navBarContainer}>
            <h2
              className={
                typePage === "Упражнения"
                  ? `${css.header1} ${css.header1Active}`
                  : css.header1
              }
              onClick={() => setTypePage("Упражнения")}
            >
              Упражнения
            </h2>
            <h2
              className={
                typePage === "Тесты"
                  ? `${css.header1} ${css.header1Active}`
                  : css.header1
              }
              onClick={() => setTypePage("Тесты")}
            >
              Тесты
            </h2>
          </div>

          <div className={css.btn}>
            <Image src={plus} alt="Онлайн-Тренер" className={css.img} />
          </div>
        </div>
        {typePage == "Упражнения" ? (
          <div className={css.cardContainer}>
            {mobx.exercises?.map((exercise) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={exercise.id}
                className={
                  exesiceId.includes(exercise.id)
                    ? `${css.exerciseCard} ${css.exerciseCardAdded}`
                    : `${css.exerciseCard}`
                }
              >
                <div className={css.row}>
                  <div className={css.imgBox}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${exercise.img}`}
                      className={css.img1}
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </div>
                  <div className={css.textContainer}>
                    <h2 className={css.exerciseName}>
                      {TextWrang1(exercise.nameRu)}
                    </h2>
                    {globalExersicesArray.find(
                      (el) => el.exersiceId == exercise.id
                    ) && (
                      <span className={css.cardPreHeader}>
                        {
                          globalExersicesArray.find(
                            (el) => el.exersiceId == exercise.id
                          )?.sets?.length
                        }
                        x
                        {
                          globalExersicesArray.find(
                            (el) => el.exersiceId == exercise.id
                          )?.sets[0]?.diapazonOt
                        }
                        /
                        {
                          globalExersicesArray.find(
                            (el) => el.exersiceId == exercise.id
                          )?.sets[0]?.diapazonDo
                        }
                      </span>
                    )}
                  </div>
                </div>
                {!exesiceId.includes(exercise.id) ? (
                  <>
                    <div className={css.buttonContainer}>
                      <span
                        className={css.updateBtn}
                        onClick={() => openUpdateModal(exercise)}
                      >
                        Изменить
                      </span>
                      {globalExersicesArray.find(
                        (el) => el.exersiceId == exercise.id
                      ) ? (
                        <span
                          className={css.addBtn}
                          onClick={() => addExercise(exercise.id)}
                        >
                          Добавить
                        </span>
                      ) : (
                        <span
                          className={css.addBtn}
                          onClick={() => addExercise(exercise.id)}
                        ></span>
                      )}
                    </div>
                  </>
                ) : (
                  <div
                    className={css.addOk}
                    onClick={() => deleteExercises(exercise.id)}
                  >
                    {" "}
                    Добавлено
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className={css.cardContainer}
          >
            {mobx.tests?.map((test) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={test.id}
                className={
                  exesiceId.includes(test.id)
                    ? `${css.exerciseCard} ${css.exerciseCardAdded}`
                    : `${css.exerciseCard}`
                }
              >
                <div className={css.row1}>
                  <div className={css.textContainer}>
                    <h2 className={css.exerciseName}>
                      {TextWrang1(test.name)}
                    </h2>
                    <span className={css.cardPreHeader}>
                      Норматив: {test.type} {test.item}
                    </span>
                  </div>
                  {!testsId.includes(test.id) ? (
                    <>
                      <div className={css.buttonContainer1}>
                        {/* <span className={css.updateBtn} onClick={() => openUpdateModal(exercise)}>Изменить</span> */}
                        <span
                          className={css.addBtn}
                          onClick={() => addTest(test.id)}
                        >
                          Добавить
                        </span>
                      </div>
                    </>
                  ) : (
                    <div
                      className={css.addOk1}
                      onClick={() => deleteTest(test.id)}
                    >
                      {" "}
                      Добавлено
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

        <div className={css.btnSave} onClick={save}>
          Сохранить
        </div>
        {modalUpdateExercise && (
          <SetsModalCard
            updateCard={updateCard}
            setModalUpdateExercise={setModalUpdateExercise}
            globalExersicesArray={globalExersicesArray}
            setGlobalExersicesArray={setGlobalExersicesArray}
          />
        )}
      </motion.div>
    </motion.div>
  );
});

export default AddPatern;

function SetsModalCard({
  updateCard,
  setModalUpdateExercise,
  globalExersicesArray,
  setGlobalExersicesArray,
}) {
  const [setCount, setSetCount] = useState(1);
  const [time, setTime] = useState("");

  const [diapazonOt1, setDiapazonOt1] = useState("");
  const [diapazonDo1, setDiapazonDo1] = useState("");
  const [pokazatel2_1, setPokazatel2_1] = useState("");
  const [pokazatel3_1, setPokazatel3_1] = useState("");
  const [pokazatel4_1, setPokazatel4_1] = useState("");
  const [pokazatel5_1, setPokazatel5_1] = useState("");

  const [diapazonOt2, setDiapazonOt2] = useState("");
  const [diapazonDo2, setDiapazonDo2] = useState("");
  const [pokazatel2_2, setPokazatel2_2] = useState("");
  const [pokazatel3_2, setPokazatel3_2] = useState("");
  const [pokazatel4_2, setPokazatel4_2] = useState("");
  const [pokazatel5_2, setPokazatel5_2] = useState("");

  const [diapazonOt3, setDiapazonOt3] = useState("");
  const [diapazonDo3, setDiapazonDo3] = useState("");
  const [pokazatel2_3, setPokazatel2_3] = useState("");
  const [pokazatel3_3, setPokazatel3_3] = useState("");
  const [pokazatel4_3, setPokazatel4_3] = useState("");
  const [pokazatel5_3, setPokazatel5_3] = useState("");

  const [diapazonOt4, setDiapazonOt4] = useState("");
  const [diapazonDo4, setDiapazonDo4] = useState("");
  const [pokazatel2_4, setPokazatel2_4] = useState("");
  const [pokazatel3_4, setPokazatel3_4] = useState("");
  const [pokazatel4_4, setPokazatel4_4] = useState("");
  const [pokazatel5_4, setPokazatel5_4] = useState("");

  const [diapazonOt5, setDiapazonOt5] = useState("");
  const [diapazonDo5, setDiapazonDo5] = useState("");
  const [pokazatel2_5, setPokazatel2_5] = useState("");
  const [pokazatel3_5, setPokazatel3_5] = useState("");
  const [pokazatel4_5, setPokazatel4_5] = useState("");
  const [pokazatel5_5, setPokazatel5_5] = useState("");

  const [diapazonOt6, setDiapazonOt6] = useState("");
  const [diapazonDo6, setDiapazonDo6] = useState("");
  const [pokazatel2_6, setPokazatel2_6] = useState("");
  const [pokazatel3_6, setPokazatel3_6] = useState("");
  const [pokazatel4_6, setPokazatel4_6] = useState("");
  const [pokazatel5_6, setPokazatel5_6] = useState("");

  const [diapazonOt7, setDiapazonOt7] = useState("");
  const [diapazonDo7, setDiapazonDo7] = useState("");
  const [pokazatel2_7, setPokazatel2_7] = useState("");
  const [pokazatel3_7, setPokazatel3_7] = useState("");
  const [pokazatel4_7, setPokazatel4_7] = useState("");
  const [pokazatel5_7, setPokazatel5_7] = useState("");

  const [diapazonOt8, setDiapazonOt8] = useState("");
  const [diapazonDo8, setDiapazonDo8] = useState("");
  const [pokazatel2_8, setPokazatel2_8] = useState("");
  const [pokazatel3_8, setPokazatel3_8] = useState("");
  const [pokazatel4_8, setPokazatel4_8] = useState("");
  const [pokazatel5_8, setPokazatel5_8] = useState("");

  const [diapazonOt9, setDiapazonOt9] = useState("");
  const [diapazonDo9, setDiapazonDo9] = useState("");
  const [pokazatel2_9, setPokazatel2_9] = useState("");
  const [pokazatel3_9, setPokazatel3_9] = useState("");
  const [pokazatel4_9, setPokazatel4_9] = useState("");
  const [pokazatel5_9, setPokazatel5_9] = useState("");

  const [diapazonOt10, setDiapazonOt10] = useState("");
  const [diapazonDo10, setDiapazonDo10] = useState("");
  const [pokazatel2_10, setPokazatel2_10] = useState("");
  const [pokazatel3_10, setPokazatel3_10] = useState("");
  const [pokazatel4_10, setPokazatel4_10] = useState("");
  const [pokazatel5_10, setPokazatel5_10] = useState("");

  const [diapazonOt11, setDiapazonOt11] = useState("");
  const [diapazonDo11, setDiapazonDo11] = useState("");
  const [pokazatel2_11, setPokazatel2_11] = useState("");
  const [pokazatel3_11, setPokazatel3_11] = useState("");
  const [pokazatel4_11, setPokazatel4_11] = useState("");
  const [pokazatel5_11, setPokazatel5_11] = useState("");

  const [diapazonOt12, setDiapazonOt12] = useState("");
  const [diapazonDo12, setDiapazonDo12] = useState("");
  const [pokazatel2_12, setPokazatel2_12] = useState("");
  const [pokazatel3_12, setPokazatel3_12] = useState("");
  const [pokazatel4_12, setPokazatel4_12] = useState("");
  const [pokazatel5_12, setPokazatel5_12] = useState("");

  const [diapazonOt13, setDiapazonOt13] = useState("");
  const [diapazonDo13, setDiapazonDo13] = useState("");
  const [pokazatel2_13, setPokazatel2_13] = useState("");
  const [pokazatel3_13, setPokazatel3_13] = useState("");
  const [pokazatel4_13, setPokazatel4_13] = useState("");
  const [pokazatel5_13, setPokazatel5_13] = useState("");

  const [diapazonOt14, setDiapazonOt14] = useState("");
  const [diapazonDo14, setDiapazonDo14] = useState("");
  const [pokazatel2_14, setPokazatel2_14] = useState("");
  const [pokazatel3_14, setPokazatel3_14] = useState("");
  const [pokazatel4_14, setPokazatel4_14] = useState("");
  const [pokazatel5_14, setPokazatel5_14] = useState("");

  const [diapazonOt15, setDiapazonOt15] = useState("");
  const [diapazonDo15, setDiapazonDo15] = useState("");
  const [pokazatel2_15, setPokazatel2_15] = useState("");
  const [pokazatel3_15, setPokazatel3_15] = useState("");
  const [pokazatel4_15, setPokazatel4_15] = useState("");
  const [pokazatel5_15, setPokazatel5_15] = useState("");

  const [diapazonOt16, setDiapazonOt16] = useState("");
  const [diapazonDo16, setDiapazonDo16] = useState("");
  const [pokazatel2_16, setPokazatel2_16] = useState("");
  const [pokazatel3_16, setPokazatel3_16] = useState("");
  const [pokazatel4_16, setPokazatel4_16] = useState("");
  const [pokazatel5_16, setPokazatel5_16] = useState("");

  const [diapazonOt17, setDiapazonOt17] = useState("");
  const [diapazonDo17, setDiapazonDo17] = useState("");
  const [pokazatel2_17, setPokazatel2_17] = useState("");
  const [pokazatel3_17, setPokazatel3_17] = useState("");
  const [pokazatel4_17, setPokazatel4_17] = useState("");
  const [pokazatel5_17, setPokazatel5_17] = useState("");

  const [diapazonOt18, setDiapazonOt18] = useState("");
  const [diapazonDo18, setDiapazonDo18] = useState("");
  const [pokazatel2_18, setPokazatel2_18] = useState("");
  const [pokazatel3_18, setPokazatel3_18] = useState("");
  const [pokazatel4_18, setPokazatel4_18] = useState("");
  const [pokazatel5_18, setPokazatel5_18] = useState("");

  const [diapazonOt19, setDiapazonOt19] = useState("");
  const [diapazonDo19, setDiapazonDo19] = useState("");
  const [pokazatel2_19, setPokazatel2_19] = useState("");
  const [pokazatel3_19, setPokazatel3_19] = useState("");
  const [pokazatel4_19, setPokazatel4_19] = useState("");
  const [pokazatel5_19, setPokazatel5_19] = useState("");

  const [diapazonOt20, setDiapazonOt20] = useState("");
  const [diapazonDo20, setDiapazonDo20] = useState("");
  const [pokazatel2_20, setPokazatel2_20] = useState("");
  const [pokazatel3_20, setPokazatel3_20] = useState("");
  const [pokazatel4_20, setPokazatel4_20] = useState("");
  const [pokazatel5_20, setPokazatel5_20] = useState("");

  const array = [
    [
      1,
      diapazonOt1,
      setDiapazonOt1,
      diapazonDo1,
      setDiapazonDo1,
      pokazatel2_1,
      setPokazatel2_1,
      pokazatel3_1,
      setPokazatel3_1,
      pokazatel4_1,
      setPokazatel4_1,
      pokazatel5_1,
      setPokazatel5_1,
    ],
    [
      2,
      diapazonOt2,
      setDiapazonOt2,
      diapazonDo2,
      setDiapazonDo2,
      pokazatel2_2,
      setPokazatel2_2,
      pokazatel3_2,
      setPokazatel3_2,
      pokazatel4_2,
      setPokazatel4_2,
      pokazatel5_2,
      setPokazatel5_2,
    ],
    [
      3,
      diapazonOt3,
      setDiapazonOt3,
      diapazonDo3,
      setDiapazonDo3,
      pokazatel2_3,
      setPokazatel2_3,
      pokazatel3_3,
      setPokazatel3_3,
      pokazatel4_3,
      setPokazatel4_3,
      pokazatel5_3,
      setPokazatel5_3,
    ],
    [
      4,
      diapazonOt4,
      setDiapazonOt4,
      diapazonDo4,
      setDiapazonDo4,
      pokazatel2_4,
      setPokazatel2_4,
      pokazatel3_4,
      setPokazatel3_4,
      pokazatel4_4,
      setPokazatel4_4,
      pokazatel5_4,
      setPokazatel5_4,
    ],
    [
      5,
      diapazonOt5,
      setDiapazonOt5,
      diapazonDo5,
      setDiapazonDo5,
      pokazatel2_5,
      setPokazatel2_5,
      pokazatel3_5,
      setPokazatel3_5,
      pokazatel4_5,
      setPokazatel4_5,
      pokazatel5_5,
      setPokazatel5_5,
    ],
    [
      6,
      diapazonOt6,
      setDiapazonOt6,
      diapazonDo6,
      setDiapazonDo6,
      pokazatel2_6,
      setPokazatel2_6,
      pokazatel3_6,
      setPokazatel3_6,
      pokazatel4_6,
      setPokazatel4_6,
      pokazatel5_6,
      setPokazatel5_6,
    ],
    [
      7,
      diapazonOt7,
      setDiapazonOt7,
      diapazonDo7,
      setDiapazonDo7,
      pokazatel2_7,
      setPokazatel2_7,
      pokazatel3_7,
      setPokazatel3_7,
      pokazatel4_7,
      setPokazatel4_7,
      pokazatel5_7,
      setPokazatel5_7,
    ],
    [
      8,
      diapazonOt8,
      setDiapazonOt8,
      diapazonDo8,
      setDiapazonDo8,
      pokazatel2_8,
      setPokazatel2_8,
      pokazatel3_8,
      setPokazatel3_8,
      pokazatel4_8,
      setPokazatel4_8,
      pokazatel5_8,
      setPokazatel5_8,
    ],
    [
      9,
      diapazonOt9,
      setDiapazonOt9,
      diapazonDo9,
      setDiapazonDo9,
      pokazatel2_9,
      setPokazatel2_9,
      pokazatel3_9,
      setPokazatel3_9,
      pokazatel4_9,
      setPokazatel4_9,
      pokazatel5_9,
      setPokazatel5_9,
    ],
    [
      10,
      diapazonOt10,
      setDiapazonOt10,
      diapazonDo10,
      setDiapazonDo10,
      pokazatel2_10,
      setPokazatel2_10,
      pokazatel3_10,
      setPokazatel3_10,
      pokazatel4_10,
      setPokazatel4_10,
      pokazatel5_10,
      setPokazatel5_10,
    ],
    [
      11,
      diapazonOt11,
      setDiapazonOt11,
      diapazonDo11,
      setDiapazonDo11,
      pokazatel2_11,
      setPokazatel2_11,
      pokazatel3_11,
      setPokazatel3_11,
      pokazatel4_11,
      setPokazatel4_11,
      pokazatel5_11,
      setPokazatel5_11,
    ],
    [
      12,
      diapazonOt12,
      setDiapazonOt12,
      diapazonDo12,
      setDiapazonDo12,
      pokazatel2_12,
      setPokazatel2_12,
      pokazatel3_12,
      setPokazatel3_12,
      pokazatel4_12,
      setPokazatel4_12,
      pokazatel5_12,
      setPokazatel5_12,
    ],
    [
      13,
      diapazonOt13,
      setDiapazonOt13,
      diapazonDo13,
      setDiapazonDo13,
      pokazatel2_13,
      setPokazatel2_13,
      pokazatel3_13,
      setPokazatel3_13,
      pokazatel4_13,
      setPokazatel4_13,
      pokazatel5_13,
      setPokazatel5_13,
    ],
    [
      14,
      diapazonOt14,
      setDiapazonOt14,
      diapazonDo14,
      setDiapazonDo14,
      pokazatel2_14,
      setPokazatel2_14,
      pokazatel3_14,
      setPokazatel3_14,
      pokazatel4_14,
      setPokazatel4_14,
      pokazatel5_14,
      setPokazatel5_14,
    ],
    [
      15,
      diapazonOt15,
      setDiapazonOt15,
      diapazonDo15,
      setDiapazonDo15,
      pokazatel2_15,
      setPokazatel2_15,
      pokazatel3_15,
      setPokazatel3_15,
      pokazatel4_15,
      setPokazatel4_15,
      pokazatel5_15,
      setPokazatel5_15,
    ],
    [
      16,
      diapazonOt16,
      setDiapazonOt16,
      diapazonDo16,
      setDiapazonDo16,
      pokazatel2_16,
      setPokazatel2_16,
      pokazatel3_16,
      setPokazatel3_16,
      pokazatel4_16,
      setPokazatel4_16,
      pokazatel5_16,
      setPokazatel5_16,
    ],
    [
      17,
      diapazonOt17,
      setDiapazonOt17,
      diapazonDo17,
      setDiapazonDo17,
      pokazatel2_17,
      setPokazatel2_17,
      pokazatel3_17,
      setPokazatel3_17,
      pokazatel4_17,
      setPokazatel4_17,
      pokazatel5_17,
      setPokazatel5_17,
    ],
    [
      18,
      diapazonOt18,
      setDiapazonOt18,
      diapazonDo18,
      setDiapazonDo18,
      pokazatel2_18,
      setPokazatel2_18,
      pokazatel3_18,
      setPokazatel3_18,
      pokazatel4_18,
      setPokazatel4_18,
      pokazatel5_18,
      setPokazatel5_18,
    ],
    [
      19,
      diapazonOt19,
      setDiapazonOt19,
      diapazonDo19,
      setDiapazonDo19,
      pokazatel2_19,
      setPokazatel2_19,
      pokazatel3_19,
      setPokazatel3_19,
      pokazatel4_19,
      setPokazatel4_19,
      pokazatel5_19,
      setPokazatel5_19,
    ],
    [
      20,
      diapazonOt20,
      setDiapazonOt20,
      diapazonDo20,
      setDiapazonDo20,
      pokazatel2_20,
      setPokazatel2_20,
      pokazatel3_20,
      setPokazatel3_20,
      pokazatel4_20,
      setPokazatel4_20,
      pokazatel5_20,
      setPokazatel5_20,
    ],
  ];

  useEffect(() => {
    let count = 0;
    globalExersicesArray
      .find((el) => el.exersiceId == updateCard.id)
      ?.sets?.forEach((set) => {
        array[set.set - 1][2](set.diapazonOt);
        array[set.set - 1][4](set.diapazonDo);
        set.pokazatel2 && array[set.set - 1][6](set.pokazatel2);
        set.pokazatel3 && array[set.set - 1][8](set.pokazatel3);
        set.pokazatel4 && array[set.set - 1][10](set.pokazatel4);
        set.pokazatel5 && array[set.set - 1][12](set.pokazatel5);
        count++;
      });
    setTime(
      globalExersicesArray.find((el) => el.exersiceId == updateCard.id)?.time
    );
    setSetCount(setCount + count);
  }, []);

  const addExersicePokazaleli = () => {
    const newSets = []; // Создаем новый массив для новых объектов sets
    array.slice(0, setCount).forEach((card) => {
      if (card[1] && card[3]) {
        const set = {};
        set.set = card[0];
        set.diapazonOt = card[1];
        set.diapazonDo = card[3];
        if (card[5]) set.pokazatel2 = card[5];
        if (card[7]) set.pokazatel3 = card[7];
        if (card[9]) set.pokazatel4 = card[9];
        if (card[11]) set.pokazatel5 = card[11];
        newSets.push(set); // Добавляем новый объект set в новый массив newSets
      }
    });

    if (globalExersicesArray.find((el) => el.exersiceId == updateCard.id)) {
      setGlobalExersicesArray([
        ...globalExersicesArray.filter((el) => el.exersiceId != updateCard.id),
        {
          exersiceId: updateCard.id,
          sets: newSets, // Используем новый массив newSets для добавления в глобальный массив
          time: time,
        },
      ]);
    } else {
      setGlobalExersicesArray([
        ...globalExersicesArray,
        {
          exersiceId: updateCard.id,
          sets: newSets, // Используем новый массив newSets для добавления в глобальный массив
          time: time,
        },
      ]);
    }
    setModalUpdateExercise(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={css.modalUpdateExercise}
    >
      <div className={css.modalUpdateWind} onClick={(e) => e.stopPropagation()}>
        <div
          className={css.exit}
          onClick={() => setModalUpdateExercise(false)}
        >{`< Назад`}</div>
        <h2 className={css.modalHeader}>Изменить упражнение</h2>
        <div className={css.modalHeaderNavCotainer}>
          <span className={css.flex1}>Сет</span>
          <span className={css.flex2}>
            {TextWrang(updateCard.pocazatel1Name)},{updateCard.pocazatel1Type}
            /диапазон
          </span>
          {updateCard.pocazatel2Name && (
            <span className={css.flex1}>
              {TextWrang(updateCard.pocazatel2Name)}
            </span>
          )}
          {updateCard.pocazatel3Name && (
            <span className={css.flex1}>
              {TextWrang(updateCard.pocazatel3Name)}
            </span>
          )}
          {updateCard.pocazatel4Name && (
            <span className={css.flex1}>
              {TextWrang(updateCard.pocazatel4Name)}
            </span>
          )}
          {updateCard.pocazatel5Name && (
            <span className={css.flex1}>
              {TextWrang(updateCard.pocazatel5Name)}
            </span>
          )}
        </div>

        {array.slice(0, setCount).map((card) => (
          <SetsRow
            setNum={card[0]}
            updateCard={updateCard}
            diapazonOt={card[1]}
            setDiapazonOt={card[2]}
            diapazonDo={card[3]}
            setDiapazonDo={card[4]}
            pokazatel2={card[5]}
            setPokazatel2={card[6]}
            pokazatel3={card[7]}
            setPokazatel3={card[8]}
            pokazatel4={card[9]}
            setPokazatel4={card[10]}
            pokazatel5={card[11]}
            setPokazatel5={card[12]}
          />
        ))}


        <div className={css.AddSetsBtn} onClick={() => setSetCount(setCount>0 ?setCount - 1: 0)}><span>-</span>Удалить сет</div>
        <div className={`${css.AddSetsBtn} ${css.AddSetsBtn1}`} onClick={() => setSetCount(setCount>19 ?20: setCount + 1)}><span>+</span>Добавить сет</div>
        <span className={css.label}>Время отдыха</span>
        <input
          type="number"
          min={0}
          className={`${css.input} ${css.name} ${css.ipdateInput}`}
          placeholder="Продолжительность"
          id="password"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <div className={css.buttonContainer}>
          <div className={css.btnSave} onClick={addExersicePokazaleli}>
            Сохранить
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function SetsRow({
  setNum,
  updateCard,
  diapazonOt,
  setDiapazonOt,
  diapazonDo,
  setDiapazonDo,
  pokazatel2,
  setPokazatel2,
  pokazatel3,
  setPokazatel3,
  pokazatel4,
  setPokazatel4,
  pokazatel5,
  setPokazatel5,
}) {

  useEffect(()=>{
    return () => {
      setDiapazonDo('')
      setDiapazonOt('')
      setPokazatel2('')
      setPokazatel3('')
      setPokazatel4('')
      setPokazatel5('')
    }
  },[])
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      className={css.rowContainer}
    >
      <span className={css.setNum}>{setNum}</span>
      <div className={css.diapazonContainer}>
        <input
          type="number"
          min={0}
          className={`${css.inputMiniInput}`}
          value={diapazonOt}
          onChange={(e) => setDiapazonOt(e.target.value)}
        />
        <span>-</span>
        <input
          type="number"
          mmin={0}
          className={`${css.inputMiniInput} `}
          value={diapazonDo}
          onChange={(e) => setDiapazonDo(e.target.value)}
        />
      </div>
      {updateCard.pocazatel2Name && (
        <input
          type="number"
          min={0}
          className={`${css.inputMiniInput} ${css.flex1}`}
          value={pokazatel2}
          onChange={(e) => setPokazatel2(e.target.value)}
        />
      )}
      {updateCard.pocazatel3Name && (
        <input
          type="number"
          min={0}
          className={`${css.inputMiniInput} ${css.flex1}`}
          value={pokazatel3}
          onChange={(e) => setPokazatel3(e.target.value)}
        />
      )}
      {updateCard.pocazatel4Name && (
        <input
          type="number"
          min={0}
          className={`${css.inputMiniInput} ${css.flex1}`}
          value={pokazatel4}
          onChange={(e) => setPokazatel4(e.target.value)}
        />
      )}
      {updateCard.pocazatel5Name && (
        <input
          type="number"
          min={0}
          className={`${css.inputMiniInput} ${css.flex1}`}
          value={pokazatel5}
          onChange={(e) => setPokazatel5(e.target.value)}
        />
      )}
    </motion.div>
  );
}

function TextWrang(text) {
  if (text && text?.length <= 4) {
    return text;
  } else if (text) {
    return text?.slice(0, 4) + "..";
  } else return "";
}

function TextWrang1(text) {
  if (text && text?.length <= 28) {
    return text;
  } else if (text) {
    return text?.slice(0, 28) + "..";
  } else return "";
}
