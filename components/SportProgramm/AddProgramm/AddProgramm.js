"use client";
import mobx from "@/mobx/mobx";
import css from "./AddProgramm.module.css";
import { motion } from "framer-motion";
import favorite from "./img/favorite.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ErrorHandler } from "@/utils/ErrorHandler";
import PatternUtills from "@/http/PatternUtills";
import { observer } from "mobx-react-lite";
import TrainingUtills from "@/http/TrainingUtills";
import GroupUtills from "@/http/GroupUtills";
import WeekCalendar from "../WeekCalendar/WeekCalendar";
import UserUtills from "@/http/UserUtills";
import searchImg from "./img/search.svg";
import checkOff from "./img/checkOff.svg";
import checkOn from "./img/checkOn.svg";
import user from "./img/user.jpg";
import SportProgrammUtills from "@/http/SportProgrammUtills";
import { useRouter } from "next/navigation";
import UpdateExercise from "@/components/widgets/UpdateExercise/UpdateExercise";
import RigthModalButton from "@/components/widgets/BUTTONS/RigthModalButton/RigthModalButton";
import Sokrashattel from "@/utils/Sokrashatel";
import UpdateExercise1 from "@/components/widgets/UpdateExercise/Modal";
import ExerciseImg from "@/components/widgets/ExerciseImg/ExerciseImg";
import HeaderSearchFilter from "@/components/widgets/MODALS/HeaderSearchFilter/HeaderSearchFilter";
import GetMuscleGroupOnExercisesList from "@/utils/GetMuscleGroupOnExercisesList";
import GetEquipmentsOnExercisesList from "@/utils/GetEquipmentsOnExercisesList";
import HeaderExerciseFilter from "@/components/widgets/MODALS/HeaderExerciseFilter/HeaderExerciseFilter";
import OpacityDiv from "@/components/widgets/MOTION/OpacityDiv/OpacityDiv";

export const dynamic = "force-dynamic";

const pluralize = (number, one, two, five) => {
  if (number % 10 === 1 && number % 100 !== 11) {
    return one;
  } else if ([2, 3, 4].includes(number % 10) && ![12, 13, 14].includes(number % 100)) {
    return two;
  } else {
    return five;
  }
};

const countHandler = (one, two, three, four, five, six, seven) => {
  let count = 0;
  one && count++;
  two && count++;
  three && count++;
  four && count++;
  five && count++;
  six && count++;
  seven && count++;
  return `${count} ${pluralize(count, "прием", "приема", "приемов")} пищи`;
};

const countHandler1 = (id) => {
  let count = 0;
  mobx.trainingBelongs.forEach((belong) => {
    if (belong.programmId == id) {
      count++;
    }
  });
  return `${count} ${pluralize(count, "упражнение", "упражнения", "упражнений")}`;
};

const AddProgramm = observer(() => {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
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
  }, []);

  const nextPage = () => {
    if (page === 2) {
      setPage(3);
    } else {
      setPage(2);
      mobx.setPageName(name);
    }
  };

  const prevPage = () => {
    if (page === 2) {
      setPage(1);
    } else {
      setPage(2);
    }
  };

  const save = async () => {
    const formData = new FormData();
    name && formData.append("name", name);
    description && formData.append("description", description);
    mobx.finalExersiceArrayOnDragAndDrop && formData.append("exersices", JSON.stringify(mobx.finalExersiceArrayOnDragAndDrop));
    mobx.finalNutritionArrayOnDragAndDrop && formData.append("nutritions", JSON.stringify(mobx.finalNutritionArrayOnDragAndDrop));
    mobx.finalTestsArrayOnDragAndDrop && formData.append("tests", JSON.stringify(mobx.finalTestsArrayOnDragAndDrop));
    mobx.finalUsersArrayOnDragAndDrop && formData.append("users", JSON.stringify(mobx.finalUsersArrayOnDragAndDrop));

    const data = await SportProgrammUtills.create(formData);
    if (data === "ok") {
      router.push("/admin/sportprogramm");
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.container} onClick={() => mobx.setAddProgramm(false)}>
      <div className={css.body}>
        <WeekCalendar />
      </div>
      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className={css.modalWind} onClick={(e) => e.stopPropagation()}>
        {page == 1 && <Page1 nextPage={nextPage} prevPage={prevPage} name={name} setName={setName} description={description} setDescription={setDescription} />}
        {page == 2 && <Page2 nextPage={nextPage} prevPage={prevPage} />}
        {page == 3 && <Page3 nextPage={nextPage} prevPage={prevPage} save={save} />}

        {mobx.cardUpdateExerciseFlag && <UpdateExercise1 />}
      </motion.div>
    </motion.div>
  );
});

export default AddProgramm;

function Page1({ name, setName, description, setDescription, nextPage }) {
  const next = () => {
    if (name) {
      nextPage();
    } else {
      ErrorHandler("Введите название программы!");
    }
  };

  return (
    <motion>
      <div className={css.headerContainer}>
        <h2 className={css.header}>Новая программа</h2>
        <div className={css.btn}>
          <Image src={favorite} alt="Онлайн-Тренер" className={css.img} />
        </div>
      </div>
      <div>
        <input type="text" className={`${css.input} ${css.name}`} placeholder="Название" id="password" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea type="text" className={`${css.input} ${css.descr}`} placeholder="Описние" id="password" value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <RigthModalButton text={"Далее"} callback={next} />
    </motion>
  );
}

const Page2 = observer(({ nextPage, prevPage }) => {
  const [page, setPage] = useState("Питание");
  const [time, setTime] = useState("");
  const [sets, setSets] = useState("");
  const [updateCard, setUpdateCard] = useState({});
  const [modalUpdateExercise, setModalUpdateExercise] = useState(false);
  const [search, setSearch] = useState("");

  const [setsObject, setSetsObject] = useState([]);
  const [exesiceId, setExesiceId] = useState([]);
  const [globalExersicesArray, setGlobalExersicesArray] = useState([]);
  const [nutritions, setNutritions] = useState([]);
  const [trainingPatterns, setTrainingPatterns] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [tests, setTests] = useState([]);
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
                    training: mobx.trainingBelongs.filter((el) => el.programmId == card.id),
                    tests: mobx.testBelongs.filter((el) => el.programmId == card.id),
                  });
                  mobx.setDragFlag(true);
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                key={card.id}
                className={css.card}
                onClick={() => {
                  mobx.setOneTrainingPattern(card);
                  mobx.setTrainongDetails(true);
                }}
              >
                <h3 className={css.cardHeader}>{card.name}</h3>
                <span className={css.count}>{countHandler1(card.id)}</span>
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
      <RigthModalButton text={"Далее"} callback={nextPage} />
    </>
  );
});

const Page3 = observer(({ nextPage, prevPage, save }) => {
  const [search, setSearch] = useState("");
  const [userArray, setUserArray] = useState([]);
  const [userAllArray, setUserAllArray] = useState([]);

  useEffect(() => {
    setUserAllArray(mobx.sportsmans);
  }, [mobx.sportsmans]);

  const addUser = (user) => {
    setUserArray([...userArray, user]);
  };

  const deleteUser = (user) => {
    setUserArray(userArray.filter((el) => el.id !== user.id));
  };

  const searchUsers = (e) => {
    setSearch(e);
    if (e) {
      // Фильтрация пользователей по полю name
      const results = mobx.sportsmans.filter((user) => user.name?.toLowerCase().includes(e.toLowerCase()));
      setUserAllArray(results);
    } else {
      setUserAllArray(mobx.sportsmans);
    }
  };

  const preSave = () => {
    mobx.setFinalUsersArrayOnDragAndDrop(userArray);
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
      <div className={css.finalUserContainer}>{userArray.slice(0, 10).map((man) => (man.img ? <Image alt="" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man.img}`} width={10} height={10} unoptimized className={css.userImg} /> : <Image alt="" src={user} width={10} height={10} unoptimized className={css.userImg} />))}</div>
      <div viewport={{ once: true }} className={css.searchContainer}>
        <Image src={searchImg} className={css.search} alt="Онлайн-Тренер" />
        <input placeholder="Найти..." type="text" className={css.inputSearch} value={search} onChange={(e) => searchUsers(e.target.value)} />
      </div>
      <div className={css.searchUserCOntainer}>
        {userAllArray.map((man) => (
          <div key={man.id} className={css.searcgUserCard}>
            {userArray.find((el) => el.id == man.id) ? <Image src={checkOn} onClick={() => deleteUser(man)} className={css.checkImg} /> : <Image src={checkOff} onClick={() => addUser(man)} className={css.checkImg} />}
            {man.img ? <Image alt="" src={`${process.env.NEXT_PUBLIC_STATIC_URL}/assets/${man.img}`} width={10} height={10} unoptimized className={css.userImg} /> : <Image alt="" src={user} width={10} height={10} unoptimized className={css.userImg} />}

            <span>{man.name}</span>
          </div>
        ))}
      </div>
      <RigthModalButton text={"Сохранить"} callback={preSave} />
    </div>
  );
});
