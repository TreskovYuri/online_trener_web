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
import UpdateExercise from "@/components/widgets/UpdateExercise/UpdateExercise";
import HeaderExerciseFilter from "@/components/widgets/MODALS/HeaderExerciseFilter/HeaderExerciseFilter";
import HeaderSearchFilter from "@/components/widgets/MODALS/HeaderSearchFilter/HeaderSearchFilter";
import GetMuscleGroupOnExercisesList from "@/utils/GetMuscleGroupOnExercisesList";
import GetEquipmentsOnExercisesList from "@/utils/GetEquipmentsOnExercisesList";
import ExerciseImg from "@/components/widgets/ExerciseImg/ExerciseImg";
import { ExerciseFilterFlagHandler } from "@/utils/ExerciseFilterFlagHandler";

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

  const [typePage, setTypePage] = useState("Упражнения");
  const [localExercises, setLocalExercises] = useState([]);
  const [localTests, setLocalTests] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentMuscleGroup, setCirrentMuscleGroup] = useState("");
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [currentGroup, setCurrentGroup] = useState(0);

  useEffect(() => {
    TrainingUtills.getExercise();
    GroupUtills.getTests();
    TrainingUtills.getExerciseGroups()
  }, []);

  useEffect(() => {
    console.log(globalExersicesArray);
  }, [globalExersicesArray]);

  useEffect(() => {
    setName(mobx.OneTrainingPattern?.name);
    let array = [];
    let idArray = [];
    if (mobx.trainingBelongs[0]?.sets) {
      mobx.trainingBelongs.forEach((belong) => {
        if (belong.programmId == mobx.OneTrainingPattern.id) {
          const sets = JSON.parse(belong.sets);
          idArray.push(belong.exerciseId);
          array.push({
            exersiceId: belong.exerciseId,
            sets: sets, // Используем новый массив newSets для добавления в глобальный массив
            time: belong.time || "",
          });
        }
      });
      setExesiceId([...exesiceId, ...idArray]);
      setGlobalExersicesArray([...globalExersicesArray, ...array]);
      setFinalGlobalExersicesArray([...finalglobalExersicesArray, ...array]);
    }
  }, [mobx.trainingBelongs]);

  useEffect(() => {
    if (mobx.testBelongs) {
      let array = [];
      mobx.testBelongs
        ?.filter((el) => el.programmId == mobx.OneTrainingPattern.id)
        ?.forEach((belong) => {
          array.push(belong.testId);
        });
      setTestseId([...testsId, ...array]);
    }
  }, [mobx.testBelongs]);

  const deleteExercises = (id) => {
    setExesiceId(exesiceId.filter((exerciseId) => exerciseId !== id));
    setFinalGlobalExersicesArray(finalglobalExersicesArray.filter((el) => el.exersiceId != id));
  };
  const deleteTest = (id) => {
    setTestseId(testsId.filter((testId) => testId !== id));
    setFinalGlobalExersicesArray(finalglobalExersicesArray.filter((el) => el.exerciseId !== id));
  };

  const openUpdateModal = async (exercise) => {
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
    mobx.OneTrainingPattern?.id && formData.append("id", mobx.OneTrainingPattern.id);
    name && formData.append("name", name);
    finalglobalExersicesArray && formData.append("exersices", JSON.stringify(finalglobalExersicesArray));
    testsId && formData.append("tests", JSON.stringify(testsId));
    const data = await TrainingUtills.updatePattern(formData);
    if (data === "ok") {
      mobx.setAddPattern(false);
    }
  };

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

  useEffect(() => {
    setLocalExercises(mobx.exercises);
    setLocalTests(mobx.tests);
  }, []);

  return (
    <motion.div initial={{ onPaste: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setUpdateTrainingPattern(false)}>
      <motion.div initial={{ x: 200 }} whileInView={{ x: 0 }} transition={{ duration: 0.2 }} className={css.modalWind} onClick={(e) => e.stopPropagation()}>
        <div className={css.headerContainer}>
          <h2 className={css.header}>Изменение шаблона</h2>
          <div className={css.btn} onClick={() => TrainingUtills.deleteTrainingPattern(mobx.OneTrainingPattern.id)}>
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
              <HeaderExerciseFilter 
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
              const flag = ExerciseFilterFlagHandler({exercise,currentEquipment, currentGroup,currentMuscleGroup})
              if (flag) return (
                <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} key={exercise.id} className={exesiceId.includes(exercise.id) ? `${css.exerciseCard} ${css.exerciseCardAdded}` : `${css.exerciseCard}`}>
                  <div className={css.row}>
                    <div className={css.imgBox}>
                      <ExerciseImg exercise={exercise}/>
                    </div>
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
              )
            })}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.cardContainer}>
            {mobx.tests?.map((test) => (
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
        {modalUpdateExercise && <UpdateExercise updateCard={updateCard} setModalUpdateExercise={setModalUpdateExercise} globalExersicesArray={globalExersicesArray} setGlobalExersicesArray={setGlobalExersicesArray} />}
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
