"use client";
import mobx from "@/mobx/mobx";
import css from "./UpdateProgramm.module.css";
import { motion } from "framer-motion";
import favorite from "./img/favorite.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import PatternUtills from "@/http/PatternUtills";
import { observer } from "mobx-react-lite";
import TrainingUtills from "@/http/TrainingUtills";
import GroupUtills from "@/http/GroupUtills";

import UserUtills from "@/http/UserUtills";
import searchImg from "./img/search.svg";
import checkOff from "./img/checkOff.svg";
import checkOn from "./img/checkOn.svg";
import user from "./img/user.jpg";
import deleteImg from "./img/delete.svg";

import SportProgrammUtills from "@/http/SportProgrammUtills";
import { useRouter } from "next/navigation";
import WeekCalendar from "./WeekCalendar/WeekCalendar";
import Modal from "../../widgets/UpdateExercise/Modal";
import UpdateExercise from "@/components/widgets/UpdateExercise/UpdateExercise";
import ExerciseImg from "@/components/widgets/ExerciseImg/ExerciseImg";
import HeaderExerciseFilter from "@/components/widgets/MODALS/HeaderExerciseFilter/HeaderExerciseFilter";
import HeaderSearchFilter from "@/components/widgets/MODALS/HeaderSearchFilter/HeaderSearchFilter";
import OpacityDiv from "@/components/widgets/MOTION/OpacityDiv/OpacityDiv";
import GetMuscleGroupOnExercisesList from "@/utils/GetMuscleGroupOnExercisesList";
import GetEquipmentsOnExercisesList from "@/utils/GetEquipmentsOnExercisesList";
import Sokrashattel from "@/utils/Sokrashatel";

export const dynamic = "force-dynamic";

const pluralize = (number, one, two, five) => {
  try {
    if (number % 10 === 1 && number % 100 !== 11) {
      return one;
    } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
      return two;
    } else {
      return five;
    }
  } catch (e) {
    console.log(e);
  }
};

const countHandler = (one, two, three, four, five, six, seven) => {
  try {
    let count = 0;
    one && count++;
    two && count++;
    three && count++;
    four && count++;
    five && count++;
    six && count++;
    seven && count++;
    return `${count} ${pluralize(count, "прием", "приема", "приемов")} пищи`;
  } catch (e) {
    console.log(e);
  }
};

const countHandler1 = (id) => {
  try {
    let count = 0;
    mobx.trainingBelongs.forEach((belong) => {
      if (belong.programmId == id) {
        count++;
      }
    });
    return `${count} ${pluralize(count, "упражнение", "упражнения", "упражнений")}`;
  } catch (e) {
    console.log(e);
  }
};

const UpdateProgramm = observer(() => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    try {
      PatternUtills.getAllNutrition();
      TrainingUtills.getTrainingPattern();
      TrainingUtills.getTrainingBelongs();
      TrainingUtills.getExercise();
      GroupUtills.getTests();
      TrainingUtills.getTestTrainingPatternBelongs();
      GroupUtills.getGroups();
      UserUtills.getSportsmans();
      mobx.setFinalExersiceArrayOnDragAndDrop([]);
      mobx.setFinalNutritionArrayOnDragAndDrop([]);
      mobx.setFinalTestsArrayOnDragAndDrop([]);
      mobx.setFinalUsersArrayOnDragAndDrop([]);
    } catch (e) {
      console.log(e);
    }
  }, []);

  useEffect(() => {
    try {
      setName(mobx.oneSprotProgramm.name);
      setDescription(mobx.oneSprotProgramm.description);
    } catch (e) {
      console.log(e);
    }
  }, [mobx.oneSprotProgramm]);

  useEffect(() => {
    try {
      if (mobx.sportprogrammUsers.length > 0 && mobx.sportsmans.length > 0) {
        mobx.sportprogrammUsers.forEach((user) => {
          if (!mobx.finalUsersArrayOnDragAndDrop.find((el) => el?.id == user?.userId)) {
            const newUser = mobx.sportsmans.find((el) => el?.id == user?.userId);
            if (newUser) {
              mobx.setFinalUsersArrayOnDragAndDrop([...mobx.finalUsersArrayOnDragAndDrop, mobx.sportsmans.find((el) => el?.id == user?.userId)]);
            }
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
  }, [mobx.sportprogrammUsers, mobx.sportsmans]);

  const nextPage = () => {
    try {
      if (page === 2) {
        setPage(3);
      } else {
        setPage(2);
        mobx.setPageName(name);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const prevPage = () => {
    try {
      if (page === 2) {
        setPage(1);
      } else {
        setPage(2);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const save = async () => {
    try {
      const formData = new FormData();
      mobx.oneSprotProgramm.id && formData.append("id", mobx.oneSprotProgramm.id);
      name && formData.append("name", name);
      description && formData.append("description", description);
      mobx.finalExersiceArrayOnDragAndDrop && formData.append("exersices", JSON.stringify(mobx.finalExersiceArrayOnDragAndDrop));
      mobx.finalNutritionArrayOnDragAndDrop && formData.append("nutritions", JSON.stringify(mobx.finalNutritionArrayOnDragAndDrop));
      mobx.finalTestsArrayOnDragAndDrop && formData.append("tests", JSON.stringify(mobx.finalTestsArrayOnDragAndDrop));
      mobx.finalUsersArrayOnDragAndDrop && formData.append("users", JSON.stringify(mobx.finalUsersArrayOnDragAndDrop));

      const data = await SportProgrammUtills.update(formData);
      if (data === "ok") {
        router.push("/admin/sportprogramm");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setAddProgramm(false)}>
      <div className={css.body}>
        <WeekCalendar />
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.modalWind} onClick={(e) => e.stopPropagation()}>
        {page == 1 && <Page1 router={router} nextPage={nextPage} prevPage={prevPage} name={name} setName={setName} description={description} setDescription={setDescription} />}
        {page == 2 && <Page2 nextPage={nextPage} prevPage={prevPage} />}
        {page == 3 && <Page3 nextPage={nextPage} prevPage={prevPage} save={save} />}

        {mobx.cardUpdateExerciseFlag && <Modal />}
      </motion.div>
    </motion.div>
  );
});

export default UpdateProgramm;

function Page1({ name, setName, description, setDescription, nextPage, router }) {
  const next = () => {
    try {
      if (name) {
        nextPage();
      } else {
        ErrorHandler("Введите название программы!");
      }
    } catch (e) {
      console.log(e);
    }
  };

  const deleteProgramm = async () => {
    try {
      const response = await SportProgrammUtills.delete(mobx.oneSprotProgramm?.id);
      if (response && response == "ok") {
        router.push("/admin/sportprogramm");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <motion>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Изменение программы</h2>
        <div className={css.btn} onClick={deleteProgramm}>
          <Image src={deleteImg} alt="Онлайн-Тренер" className={css.img} />
        </div>
      </div>
      <div>
        <input type="text" className={`${css.input} ${css.name}`} placeholder="Название" id="password" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea type="text" className={`${css.input} ${css.descr}`} placeholder="Описние" id="password" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className={css.btnSave} onClick={next}>
        Далее
      </div>
    </motion>
  );
}

const Page2 = observer(({ nextPage, prevPage }) => {
  const [page, setPage] = useState("Питание");
  const [updateCard, setUpdateCard] = useState({});
  const [modalUpdateExercise, setModalUpdateExercise] = useState(false);

  const [setsObject, setSetsObject] = useState([]);
  const [exesiceId, setExesiceId] = useState([]);
  const [globalExersicesArray, setGlobalExersicesArray] = useState([]);
  const [localExercises, setLocalExercises] = useState([]);
  const [localNutritions, setLocalNutritions] = useState([]);
  const [localTrainings, setLocalTrainings] = useState([]);
  const [localTests, setLocalTests] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [currentMuscleGroup, setCirrentMuscleGroup] = useState("");
  const [currentEquipment, setCurrentEquipment] = useState("");
  const [currentGroup, setCurrentGroup] = useState(0);

  const handleSarch = (e) => {
    if (page == "Упражнения") {
      if (e) {
        setSearchInput(e);
        const results = mobx.exercises.filter((exercises) => exercises.nameRu?.toLowerCase().includes(e.toLowerCase()));
        setLocalExercises(results);
      } else {
        setLocalExercises(mobx.exercises);
      }
    } else if (page == "Тесты") {
      if (e) {
        setSearchInput(e);
        const results = mobx.tests.filter((test) => test.name?.toLowerCase().includes(e.toLowerCase()));
        setLocalTests(results);
      } else {
        setLocalTests(mobx.tests);
      }
    } else if (page == "Питание") {
      if (e) {
        setSearchInput(e);
        const results = mobx.nutritions.filter((nutrition) => nutrition.name?.toLowerCase().includes(e.toLowerCase()));
        setLocalNutritions(results);
      } else {
        setLocalNutritions(mobx.nutritions);
      }
    } else if (page == "Тренировки") {
      if (e) {
        setSearchInput(e);
        const results = mobx.trainingPatterns.filter((trainingPattern) => trainingPattern.name?.toLowerCase().includes(e.toLowerCase()));
        setLocalTrainings(results);
      } else {
        setLocalTrainings(mobx.trainingPatterns);
      }
    }
  };

  useEffect(() => {
    setLocalExercises(mobx.exercises);
    setLocalTests(mobx.tests);
    setLocalNutritions(mobx.nutritions);
    setLocalTrainings(mobx.trainingPatterns);
  }, []);

  const openUpdateModal = async (exercise) => {
    try {
      const obj = await setsObject.find((obj) => obj.id === exercise.id);
      setModalUpdateExercise(true);
      setUpdateCard(exercise);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <span className={css.exit} onClick={prevPage}>{`< Назад`}</span>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Заполните программу</h2>
        <div className={css.btn}>
          <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
        </div>
      </div>
      <div className={css.headerBtnContainer}>
        {page == "Упражнения" && (
          <OpacityDiv className={css.btn}>
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
          </OpacityDiv>
        )}
        <div className={css.btn}>
          <HeaderSearchFilter value={searchInput} setValue={handleSarch} />{" "}
        </div>
      </div>
      <div className={css.navBarContainer}>
        <span className={page === "Питание" ? css.activeNav : ""} onClick={() => setPage("Питание")}>
          Питание
        </span>
        <span className={page === "Тренировки" ? css.activeNav : ""} onClick={() => setPage("Тренировки")}>
          Тренировки
        </span>
        <span className={page === "Упражнения" ? css.activeNav : ""} onClick={() => setPage("Упражнения")}>
          Упражнения
        </span>
        <span className={page === "Тесты" ? css.activeNav : ""} onClick={() => setPage("Тесты")}>
          Тесты
        </span>
      </div>
      {page === "Питание" && (
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {localNutritions.map((nutrition) => (
            <div
              key={nutrition.id}
              className={css.card}
              draggable
              onDrag={(e) => {
                mobx.setDragNutritionFlag(true);
                mobx.setDropAndDropArrayNutrition(nutrition);
              }}
            >
              <h3 className={css.cardHeader}>{nutrition.name}</h3>
              <span className={css.count}>{countHandler(nutrition.name1, nutrition.name2, nutrition.name3, nutrition.name4, nutrition.name5, nutrition.name6, nutrition.name7)}</span>
            </div>
          ))}
        </div>
      )}
      {page === "Тренировки" && (
        <div
          className={css.cardContainer}
          onDragOver={(e) => e.preventDefault()} // добавлен обработчик события onDragOver
        >
          {localTrainings &&
            localTrainings.map((card, index) => (
              <motion.div
                draggable={true}
                onDrag={(e) => {
                  mobx.setDragValue({
                    training: mobx.trainingBelongs.filter((el) => el.programmId == card?.id),
                    tests: mobx.testBelongs.filter((el) => el.programmId == card?.id),
                  });
                  mobx.setDragFlag(true);
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={card?.id}
                className={css.card}
                onClick={() => {
                  mobx.setOneTrainingPattern(card);
                  mobx.setTrainongDetails(true);
                }}
              >
                <h3 className={css.cardHeader}>{card?.name}</h3>
                <span className={css.count}>{countHandler1(card?.id)}</span>
              </motion.div>
            ))}
        </div>
      )}

      {page === "Упражнения" && (
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {localExercises.map((exercise) => {
            const equipments = JSON.parse(exercise.equipment);
            const musclegroups = JSON.parse(exercise.musclegroups);
            const flag = (currentEquipment == "" || equipments.includes(currentEquipment)) && (currentMuscleGroup == "" || musclegroups.includes(currentMuscleGroup)) && (exercise.groupId == currentGroup || currentGroup==0);
            if (flag)
              return (
                <div
                  key={exercise.id}
                  className={exesiceId.includes(exercise.id) ? `${css.exerciseCard} ${css.exerciseCardAdded}` : `${css.exerciseCard}`}
                  draggable={globalExersicesArray.find((el) => el.exerciseId == exercise.id) ? true : false}
                  onDrag={(e) => {
                    mobx.setDragExersicesValue(globalExersicesArray.find((el) => el.exerciseId == exercise.id));
                    mobx.setDragExersicesFlag(true);
                  }}
                >
                  <div className={css.row}>
                    <div className={css.imgBox}>
                      <ExerciseImg exercise={exercise} />
                    </div>
                    <div className={css.textContainer}>
                      <h2 className={css.exerciseName}>{Sokrashattel({ text: exercise.nameRu + " / " + exercise.nameEng, length: 28 })}</h2>
                      {globalExersicesArray.find((el) => el.exerciseId == exercise.id) && (
                        <>
                          <span className={css.cardPreHeader}>
                            {Sokrashattel({
                              text: `${Sokrashattel({ text: exercise?.pocazatel1Name, length: 28 })}: ${globalExersicesArray
                                .find((el) => el.exerciseId == exercise.id)
                                ?.sets.map((e) => `${e.diapazonOt}/${e.diapazonDo}` || "")
                                .join(" / ")}`,
                              length: 35,
                            })}
                          </span>
                          {exercise.pocazatel2Name && (
                            <span className={css.cardPreHeader}>
                              {Sokrashattel({
                                text: `${Sokrashattel({ text: exercise?.pocazatel2Name, length: 28 })}: ${globalExersicesArray
                                  .find((el) => el.exerciseId == exercise.id)
                                  ?.sets.map((e) => `${e.pokazatel2}` || "")
                                  .join(" / ")}`,
                                length: 35,
                              })}
                            </span>
                          )}
                          {exercise.pocazatel3Name && (
                            <span className={css.cardPreHeader}>
                              {Sokrashattel({
                                text: `${Sokrashattel({ text: exercise?.pocazatel3Name, length: 28 })}: ${globalExersicesArray
                                  .find((el) => el.exerciseId == exercise.id)
                                  ?.sets.map((e) => `${e.pokazatel3}` || "")
                                  .join(" / ")}`,
                                length: 35,
                              })}
                            </span>
                          )}
                          {exercise.pocazatel4Name && (
                            <span className={css.cardPreHeader}>
                              {Sokrashattel({
                                text: `${Sokrashattel({ text: exercise?.pocazatel4Name, length: 28 })}: ${globalExersicesArray
                                  .find((el) => el.exerciseId == exercise.id)
                                  ?.sets.map((e) => `${e.pokazatel4}` || "")
                                  .join(" / ")}`,
                                length: 35,
                              })}
                            </span>
                          )}
                          {exercise.pocazate52Name && (
                            <span className={css.cardPreHeader}>
                              {Sokrashattel({
                                text: `${Sokrashattel({ text: exercise?.pocazatel5Name, length: 28 })}: ${globalExersicesArray
                                  .find((el) => el.exerciseId == exercise.id)
                                  ?.sets.map((e) => `${e.pokazatel5}` || "")
                                  .join(" / ")}`,
                                length: 35,
                              })}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                  <div className={css.buttonContainer}>
                    <span className={css.updateBtn} onClick={() => openUpdateModal(exercise)}>
                      Изменить
                    </span>
                    {globalExersicesArray.find((el) => el.exerciseId == exercise.id) && <span className={css.addBtn}>Добавить</span>}
                  </div>
                </div>
              );
          })}
        </div>
      )}
      {page === "Тесты" && (
        <div className={css.cardContainer} onDragOver={(e) => e.preventDefault()}>
          {localTests &&
            localTests.map((card, index) => (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={card.id}
                className={css.card}
                draggable
                onDrag={(e) => {
                  mobx.setDragTestsFlag(true);
                  mobx.setDropAndDropArrayTests(card);
                }}
              >
                <h3 className={css.cardHeader}>{card.name}</h3>
                <span className={css.count}>{mobx.testGroups.find((el) => el.id == card.groupId)?.name}</span>
                <span className={css.norm}>
                  Норматив: {card.item} {card.type}
                </span>
              </motion.div>
            ))}
        </div>
      )}
      {modalUpdateExercise && <UpdateExercise updateCard={updateCard} setModalUpdateExercise={setModalUpdateExercise} globalExersicesArray={globalExersicesArray} setGlobalExersicesArray={setGlobalExersicesArray} />}
      <div className={css.btnSave} onClick={nextPage}>
        Далее
      </div>
    </>
  );
});


function TextWrang1(text) {
  try {
    if (text && text?.length <= 28) {
      return text;
    } else if (text) {
      return text?.slice(0, 28) + "..";
    } else return "";
  } catch (e) {
    console.log(e);
  }
}

function TextWrang2(text) {
  if (text && text?.length <= 35) {
    return text;
  } else if (text) {
    return text?.slice(0, 35) + "..";
  } else return "";
}

const Page3 = observer(({ nextPage, prevPage, save }) => {
  const [search, setSearch] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [userAllArray, setUserAllArray] = useState([]);

  useEffect(() => {
    try {
      setUserAllArray(mobx.sportsmans);
    } catch (e) {
      console.log(e);
    }
  }, [mobx.sportsmans]);

  const addUser = (user) => {
    try {
      mobx.setFinalUsersArrayOnDragAndDrop([...mobx.finalUsersArrayOnDragAndDrop, user]);
    } catch (e) {
      console.log(e);
    }
  };

  const deleteUser = (user) => {
    try {
      setUserArray(userArray.filter((el) => el?.id !== user?.id));
    } catch (e) {
      console.log(e);
    }
  };

  const searchUsers = (e) => {
    try {
      setSearch(e);
      if (e) {
        // Фильтрация пользователей по полю name
        const results = mobx.sportsmans.filter((user) => user.name?.toLowerCase().includes(e.toLowerCase()));
        setUserAllArray(results);
      } else {
        setUserAllArray(mobx.sportsmans);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const preSave = () => {
    save();
  };

  return (
    <div>
      <span className={css.exit} onClick={prevPage}>{`< Назад`}</span>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Выберите спортсменов</h2>
        <div className={css.btn}>
          <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
        </div>
      </div>
      <div className={css.finalUserContainer}>{mobx.finalUsersArrayOnDragAndDrop.slice(0, 10).map((man) => (man.img ? <Image alt="" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man?.img}`} width={10} height={10} unoptimized className={css.userImg} /> : <Image alt="" src={user} width={10} height={10} unoptimized className={css.userImg} />))}</div>
      <div viewport={{ once: true }} className={css.searchContainer}>
        <Image src={searchImg} className={css.search} alt="Онлайн-Тренер" />
        <input placeholder="Найти..." type="text" className={css.inputSearch} value={search} onChange={(e) => searchUsers(e.target.value)} />
      </div>
      <div className={css.searchUserCOntainer}>
        {userAllArray.map((man) => (
          <div key={man?.id} className={css.searcgUserCard}>
            {mobx.finalUsersArrayOnDragAndDrop.find((el) => el?.id == man?.id) ? <Image src={checkOn} onClick={() => deleteUser(man)} className={css.checkImg} /> : <Image src={checkOff} onClick={() => addUser(man)} className={css.checkImg} />}
            {man.img ? <Image alt="" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man.img}`} width={10} height={10} unoptimized className={css.userImg} /> : <Image alt="" src={user} width={10} height={10} unoptimized className={css.userImg} />}

            <span>{man.name}</span>
          </div>
        ))}
      </div>
      <div className={css.btnSave} onClick={preSave}>
        Сохранить
      </div>
    </div>
  );
});
