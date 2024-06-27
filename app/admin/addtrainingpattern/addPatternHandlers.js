import TrainingMobx from "@/mobx/TrainingMobx";
import mobx from "@/mobx/mobx";

class AddPatternHandlers {
  // Обработчик изменения названий этапов
  updateStageName({ index, title, stages, setStages }) {
    const newStages = stages.map((stage, i) =>
      i === index ? { ...stage, title: title } : stage
    );
    setStages(newStages);
  }

  // Добавление этапа
  addStage({ stages, setStages }) {
    setStages([...stages, { title: "", exercises: [] }]);
  }

  // Функция добавлет упражнения в этап
  addExerciseOnStages({ exercise, stages, setStages, currentStage }) {
    const updatedStages = stages.map((stage) => {
      if (stage.title == currentStage) {
        return {
          ...stage,
          exercises: [...stage.exercises, exercise],
        };
      }
      return stage;
    });
    setStages(updatedStages);
  }
  // Функция добавлет упражнения в этап в серии
  addExerciseOnSeriesStages({ exercise, currentStage,series, setSeries }) {
    const updatedStages = series.map((seria) => {
      if (seria.title == currentStage.seria.title) {
        return {
          ...seria,
          'stages': seria.stages.map((stage,index) => {
            if(index === currentStage.stageIndex){
              return {
                ...stage,
                'exercises': [...stage.exercises, {...exercise,'sets':[]}]
              }
            }
            return stage
          }),
        };
      }
      return seria;
    });
    setSeries(updatedStages);
  }

  // Обработка захвата карточки в режиме этапов
  handleDragStage = (setIsDrag, exercise, stages, setStages, stage) => {
    if (stage) {
      setIsDrag(true);
      mobx.setDragValue({
        type: "Упражнение",
        stage: stage,
        exercise: exercise,
      });
    } else {
      setIsDrag(true);
      mobx.setDragValue({
        type: "Упражнение",
        exercise: exercise,
      });
    }
  };

  // Обработка захвата карточки в режиме серий
  handleDragSeries = (setIsDrag, exercise, seria,stageIndex) => {
    if (seria) {
      setIsDrag(true);
      mobx.setDragValue({
        type: "Упражнение",
        seria: seria,
        exercise: exercise,
        stageIndex:stageIndex
      });
    } else {
      setIsDrag(true);
      mobx.setDragValue({
        type: "Упражнение",
        exercise: exercise,
      });
    }
  };

  // Обработка события Drop в режиме этапов 
  handleDropStage = (dropIndex, stages, stage, setStages) => {
    const dragValue = mobx.dragValue;
    if(!dragValue) return
    // Найти и удалить элемент из его текущей позиции, если он существует
    const updatedItems = stages.map((stg) => {
      if (stg.title === stage.title) {
        if (dragValue?.type === "Упражнение") {
          const updatedExercises = stg.exercises.filter(
            (ex) => ex.id !== dragValue.exercise.id
          );
          return {
            ...stg,
            exercises: updatedExercises,
          };
        }
      }
      return stg;
    });

    // Вставить элемент в новое место
    const finalItems = updatedItems.map((stg) => {
      if (stg.title === stage.title) {
          const updatedExercises = [...stg.exercises];
          updatedExercises.splice(dropIndex, 0, dragValue.exercise);
          return {
            ...stg,
            exercises: updatedExercises,
          };
      }
      return stg;
    });

    // Удалить элемент из его исходной стадии, если он был перетащен из другой стадии
    const finalStages = finalItems.map((st) => {
      if (
        dragValue.stage?.title &&
        st.title === dragValue.stage.title &&
        st.title !== stage.title
      ) {
        return {
          ...st,
          exercises: st.exercises.filter((e) => e.id !== dragValue.exercise.id),
        };
      }
      return st;
    });

    setStages(finalStages);
    mobx.setDragValue({});
  };

  // Обработка события Drop в режиме серий
  handleDropSeries = async(dropIndex,series,seria,setSeries,stageIndex) => {
    const dragValue = mobx.dragValue;
    if(!dragValue) return
    // Удаление карточки
    const updatedItems = series.map(sra => {
      if (sra.title === dragValue.seria.title) {
        return {
          ...sra,
          stages: sra.stages.map((stage,index) => {
            if(dragValue.stageIndex === index){
              const exercises = stage.exercises.filter(e => e.id !== dragValue.exercise.id);
              return {
                ...stage,
                exercises: exercises
              };
            }
            return stage
          }).filter(el => el.exercises.length>0)
        };
      }
      return sra;
    });
    // // Добавление карточки в новое место
    const finalItems = await updatedItems.map((stg) => {
      if (stg.title === seria.title) {

          return {
            ...stg,
            'stages': stg.stages.map((s,index) => {
              if(index == stageIndex){
                const updatedExercises = [...s.exercises];
                updatedExercises.splice(dropIndex, 0, dragValue.exercise);
                return {
                  ...s,
                  'exercises':updatedExercises
                }
              }
              return s
            }),
          };
      }
      return stg;
    });


    setSeries(finalItems)
  };

  // Преобразование массива этапов в массиы серий
  stageToSeries(stages, setSeries) {
    const final = [];
    for (const i in stages) {
      const stage = stages[i];
      const result = { title: stage.title, stages: [] };
      const exercises = stage.exercises;
      for (const j in exercises) {
        const exercise = exercises[j];
        result.stages.push(
          {
            'exercises': [
              {
                ...exercise,
                sets: [],
              },
            ],
            'setCount':0,
            'timeout':0
          },
        );
      }
      final.push(result);
    }
    setSeries(final);
  }

  // Обработка добавление числа сетов
  setCountAndTimout(setCount,timeout,index, title ,series, setSeries){
    const result = series.map((seria,indx) =>{
      if (seria.title === title){
        return {
          ...seria,
          'stages':seria.stages.map((stage,inx) => {
            if(inx === index){
              return {
                ...stage,
                'setCount':setCount,
                'timeout':timeout
              }
            }
            return stage
          })
        }
        
      }
      return seria
    })
    setSeries(result)
  }
  deleteExerciseOnSeries(){
    const dragValue = mobx.dragValue;
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries
    if(!dragValue) return
    // Удаление карточки
    const updatedItems = series.map(sra => {
      if (sra.title === dragValue.seria.title) {
        return {
          ...sra,
          stages: sra.stages.map((stage,index) => {
            if(dragValue.stageIndex === index){
              const exercises = stage.exercises.filter(e => e.id !== dragValue.exercise.id);
              return {
                ...stage,
                exercises: exercises
              };
            }
            return stage
          }).filter(el => el.exercises.length>0)
        };
      }
      return sra;
    });
    setSeries(updatedItems)
  }

  createSetsArray({set,exercise}){
      const result = {
          "set":set,
      }
      if(exercise.pocazatel1Name){
          if(exercise.pocazatel1SPFlag != null && exercise.pocazatel1SPFlag !=false){
              result.diapazonOt1 = 0
              result.diapazonDo1 = 0
          }else{
              result.pokazatel1 = 0
          }
          if(exercise.pocazatel2SPFlag != null && exercise.pocazatel2SPFlag !=false){
              result.diapazonOt2 = 0
              result.diapazonDo2 = 0
          }else{
              result.pokazatel2 = 0
          }
          if(exercise.pocazatel3SPFlag != null && exercise.pocazatel3SPFlag !=false){
              result.diapazonOt3 = 0
              result.diapazonDo3 = 0
          }else{
              result.pokazatel3 = 0
          }
          if(exercise.pocazatel4SPFlag != null && exercise.pocazatel4SPFlag !=false){
              result.diapazonOt4 = 0
              result.diapazonDo4 = 0
          }else{
              result.pokazatel4 = 0
          }
          if(exercise.pocazatel5SPFlag != null && exercise.pocazatel5SPFlag !=false){
              result.diapazonOt5 = 0
              result.diapazonDo5 = 0
          }else{
              result.pokazatel5 = 0
          }
      }
      return result
  }

}
export default new AddPatternHandlers();
