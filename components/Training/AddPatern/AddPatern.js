"use client";
import mobx from "@/mobx/mobx";
import css from "./AddPatern.module.css";
import { motion } from "framer-motion";
import favorite from "./img/favorite.svg";
import plus from "./img/plus.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import TrainingUtills from "@/http/TrainingUtills";
import { observer } from "mobx-react-lite";
import GroupUtills from "@/http/GroupUtills";
import HeaderFilter from "@/components/widgets/MODALS/HeaderExerciseFilter/HeaderExerciseFilter";
import HeaderSearchFilter from "@/components/widgets/MODALS/HeaderSearchFilter/HeaderSearchFilter";
import GetMuscleGroupOnExercisesList from "@/utils/GetMuscleGroupOnExercisesList";
import GetEquipmentsOnExercisesList from "@/utils/GetEquipmentsOnExercisesList";
import DefaultIconCircleOnName from "@/components/widgets/DefaultIconCircleOnName/DefaultIconCircleOnName";

import TrainingModal from "@/components/widgets/UpdateExercise/TrainingModal";

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
  const [finalglobalExersicesArray, setFinalGlobalExersicesArray] = useState([]);
  const [localExercises, setLocalExercises] = useState([]);
  const [localTests, setLocalTests] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentMuscleGroup, setCirrentMuscleGroup] = useState("");
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [currentGroup, setCurrentGroup] = useState(0);

  const [typePage, setTypePage] = useState("Упражнения");

  useEffect(() => {
    TrainingUtills.getExercise();
    GroupUtills.getTests();
    TrainingUtills.getExerciseGroups()
  }, []);

  const deleteExercises = (id) => {
    setExesiceId(exesiceId.filter((exerciseId) => exerciseId !== id));
  };
  const deleteTest = (id) => {
    setTestseId(testsId.filter((testId) => testId !== id));
    setFinalGlobalExersicesArray(finalglobalExersicesArray.filter((el) => el.exerciseId !== id));
  };

  const openUpdateModal = async (exercise) => {
    const obj = await setsObject.find((obj) => obj.id === exercise.id);
    if (obj) {
      setSets(obj.sets);
      setTime(obj.time);
    } else {
      setSets("4x15");
      setTime("30 сек");
    }
    setModalUpdateExercise(true);
    setUpdateCard(exercise);
  };

  const addExercise = (id) => {
    setExesiceId([...exesiceId, id]);
    setFinalGlobalExersicesArray([...finalglobalExersicesArray, globalExersicesArray.find((el) => el.exersiceId == id)]);
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
    name ? formData.append("name", name) : formData.append("name", 111);
    finalglobalExersicesArray && formData.append("exersices", JSON.stringify(finalglobalExersicesArray));
    testsId && formData.append("tests", JSON.stringify(testsId));
    const data = await TrainingUtills.createPattern(formData);
    if (data === "ok") {
      mobx.setAddPattern(false);
    }
  };
  useEffect(() => {
    setLocalExercises(mobx.exercises);
    setLocalTests(mobx.tests);
  }, []);

  const handleSarch = (e) => {
    if (typePage == "Упражнения") {
      if (e) {
        setSearchInput(e);
        const results = mobx.exercises.filter((exercises) => exercises.nameRu?.toLowerCase().includes(e.toLowerCase()));
        setLocalExercises(results);
      } else {
        setLocalExercises(mobx.exercises);
      }
    } else {
      if (e) {
        setSearchInput(e);
        const results = mobx.tests.filter((test) => test.name?.toLowerCase().includes(e.toLowerCase()));
        setLocalTests(results);
      } else {
        setLocalTests(mobx.tests);
      }
    }
  };

  return (
    <motion.div initial={{ onPaste: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setAddPattern(false)}>
      <motion.div initial={{ x: 200 }} whileInView={{ x: 0 }} transition={{ duration: 0.2 }} className={css.modalWind} onClick={(e) => e.stopPropagation()}>
        <div className={css.headerContainer}>
          <h2 className={css.header}>Новый шаблон</h2>
          <div className={css.btn}>
            <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
          </div>
        </div>
        <div>
          <input type="text" className={`${css.input} ${css.name}`} placeholder="Название" id="password" value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className={css.headerContainer}>
          <div className={css.navBarContainer}>
            <h2 className={typePage === "Упражнения" ? `${css.header1} ${css.header1Active}` : css.header1} onClick={() => setTypePage("Упражнения")}>
              Упражнения
            </h2>
            <h2 className={typePage === "Тесты" ? `${css.header1} ${css.header1Active}` : css.header1} onClick={() => setTypePage("Тесты")}>
              Тесты
            </h2>
          </div>

          <div className={css.headerBtnContainer}>
            <div className={css.btn}>
              <HeaderFilter 
              muscleGoups={GetMuscleGroupOnExercisesList()} 
              equipments={GetEquipmentsOnExercisesList()} 
              currentMuscleGroup={currentMuscleGroup} 
              currentEquipment={currentEquipment} 
              setCirrentMuscleGroup={setCirrentMuscleGroup} 
              setCurrentEquipment={setCurrentEquipment} 
              currentGroup={currentGroup}
              setCurrentGroup={setCurrentGroup}
              />{" "}
            </div>
            <div className={css.btn}>
              <HeaderSearchFilter value={searchInput} setValue={handleSarch} />{" "}
            </div>
          </div>
        </div>
        {typePage == "Упражнения" ? (
          <div className={css.cardContainer}>
            {localExercises.map((exercise) => {
              const equipments = JSON.parse(exercise.equipment);
              const musclegroups = JSON.parse(exercise.musclegroups);
              const flag = (currentEquipment == "" || equipments.includes(currentEquipment)) && (currentMuscleGroup == "" || musclegroups.includes(currentMuscleGroup)) && (exercise.groupId == currentGroup || currentGroup==0);
              if (flag)
                return (
                  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={exercise.id} className={exesiceId.includes(exercise.id) ? `${css.exerciseCard} ${css.exerciseCardAdded}` : `${css.exerciseCard}`}>
                    <div className={css.row}>
                      <div className={css.imgBox}>{exercise.img ? <Image src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${exercise.img}`} className={css.img1} width={20} height={20} unoptimized /> : <DefaultIconCircleOnName text={exercise.nameRu} radius={0.5}/>}</div>
                      <div className={css.textContainer}>
                        <h2 className={css.exerciseName}>{TextWrang1(exercise.nameRu)}</h2>
                        {globalExersicesArray.find((el) => el.exersiceId == exercise.id) && (
                          <span className={css.cardPreHeader}>
                            {globalExersicesArray.find((el) => el.exersiceId == exercise.id)?.sets?.length}x{globalExersicesArray.find((el) => el.exersiceId == exercise.id)?.sets[0]?.diapazonOt}/{globalExersicesArray.find((el) => el.exersiceId == exercise.id)?.sets[0]?.diapazonDo}
                          </span>
                        )}
                      </div>
                    </div>
                    {!exesiceId.includes(exercise.id) ? (
                      <>
                        <div className={css.buttonContainer}>
                          <span className={css.updateBtn} onClick={() => openUpdateModal(exercise)}>
                            Изменить
                          </span>
                          {globalExersicesArray.find((el) => el.exersiceId == exercise.id) ? (
                            <span className={css.addBtn} onClick={() => addExercise(exercise.id)}>
                              Добавить
                            </span>
                          ) : (
                            <span className={css.addBtn} onClick={() => addExercise(exercise.id)}></span>
                          )}
                        </div>
                      </>
                    ) : (
                      <div className={css.addOk} onClick={() => deleteExercises(exercise.id)}>
                        {" "}
                        Добавлено
                      </div>
                    )}
                  </motion.div>
                );
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.cardContainer}>
            {localTests?.map((test) => (
              <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={test.id} className={exesiceId.includes(test.id) ? `${css.exerciseCard} ${css.exerciseCardAdded}` : `${css.exerciseCard}`}>
                <div className={css.row1}>
                  <div className={css.textContainer}>
                    <h2 className={css.exerciseName}>{TextWrang1(test.name)}</h2>
                    <span className={css.cardPreHeader}>
                      Норматив: {test.type} {test.item}
                    </span>
                  </div>
                  {!testsId.includes(test.id) ? (
                    <>
                      <div className={css.buttonContainer1}>
                        {/* <span className={css.updateBtn} onClick={() => openUpdateModal(exercise)}>Изменить</span> */}
                        <span className={css.addBtn} onClick={() => addTest(test.id)}>
                          Добавить
                        </span>
                      </div>
                    </>
                  ) : (
                    <div className={css.addOk1} onClick={() => deleteTest(test.id)}>
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
        {modalUpdateExercise && <TrainingModal updateCard={updateCard} setModalUpdateExercise={setModalUpdateExercise} globalExersicesArray={globalExersicesArray} setGlobalExersicesArray={setGlobalExersicesArray} />}
      </motion.div>
    </motion.div>
  );
});

export default AddPatern;



function TextWrang1(text) {
  if (text && text?.length <= 28) {
    return text;
  } else if (text) {
    return text?.slice(0, 28) + "..";
  } else return "";
}
