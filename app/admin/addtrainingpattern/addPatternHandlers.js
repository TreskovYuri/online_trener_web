import TrainingMobx from "@/mobx/TrainingMobx";
import mobx from "@/mobx/mobx";
import _ from 'lodash'

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
                'exercises': [...stage.exercises, {...exercise,'sets':[],stage:currentStage.title}]
              }
            }
            return stage
          }),
        };
      }
      return seria;
    });
    localStorage.setItem('seria', JSON.stringify(updatedStages))
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
  // Обработка захвата карточки в режиме серий
  handleDragTests = ({setIsDrag, test}) => {
    setIsDrag(true);
      mobx.setDragValue({
        type: "Тест",
        test: test
      });
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
                if(dragValue.exercise.sets){
                  updatedExercises.splice(dropIndex, 0, dragValue.exercise);
                }else{
                  updatedExercises.splice(dropIndex, 0, {
                    ...dragValue.exercise,
                    stage:seria.title,
                    sets:[]
                  });
                }
                
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

    localStorage.setItem('seria', JSON.stringify(finalItems))
    setSeries(finalItems)
    console.log(series)
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
    localStorage.setItem('seria', JSON.stringify(result))
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
    localStorage.setItem('seria', JSON.stringify(updatedItems))
    setSeries(updatedItems)
  }
  // Создание массива с сетами для заданного упражнения
  createSetsArray({ set, exercise }) {
    const result = {
      set: set,
    };
    
    [1, 2, 3, 4, 5].forEach((num) => {
      if (exercise[`pocazatel${num}Name`]) {
        if (exercise[`pocazatel${num}SPFlag`] != null && exercise[`pocazatel${num}SPFlag`] != false) {
          result[`diapazonOt${num}`] = 0;
          result[`diapazonDo${num}`] = 0;
        } else {
              result[`pokazatel${num}`] = 0
          }
      }
      });
      return result
  }
  // Изменение сета при вводе показателей
  updateSetsArray({sp,set,sets,setSets,pokazatelNum,diapazonOt,diapazonDo,pokazatel}){
    const result = sets.map((iterableSet,index) => {
      if (index === set.set-1){
        if(sp){
          iterableSet[`diapazonOt${pokazatelNum}`]=parseInt(diapazonOt),
          iterableSet[`diapazonDo${pokazatelNum}`]=parseInt(diapazonDo)
        }else{
          iterableSet[`pokazatel${pokazatelNum}`]=parseInt(pokazatel)
        }
      }
      return iterableSet
    })
    setSets(result)
  }
  // Сохранение сетов упражнения в глобальный массив серий
  saveSets({series,setSeries,currentStage}){
    const result = series.map(seria => {
      if(seria.title === currentStage.title){
        return {
          ...seria,
          stages: currentStage.stages
        }
      }
      return seria
    })
    localStorage.setItem('seria', JSON.stringify(result))
    setSeries(result)
  }

  // Проверка все ли поля сета заполнены
  isSetsReady(set) {
    return _.every(set, (item, key) => {
      if (key.startsWith('diapazonDo') && item == 0) {
        return true;
      }
      return Boolean(item);
    });
  }
  

  // Проверка все ли поля сетов из всего глобального списка заполнены
  isAllSetsReady(series){
    let flag = true
    _.each(series, (seria)=>{
      if(seria.stages.length ==0){flag=false}
      _.each(seria.stages,(stage)=>{
        if(stage.exercises.length ==0){flag=false}
        _.each(stage.exercises,(exercise)=>{
          if(exercise.sets.length ==0){flag=false}
          _.each(exercise.sets,(set)=>{
            console.log(set)
            if(!this.isSetsReady({set})) flag = false 
          })
        })
      })

    })
    return flag
  }

  addBlockToSeries(title){
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries
    const result = series.map((seria) => {
      if(seria.title == title){
        return {
          ...seria,
          stages: [
            ...seria.stages,
            {
              'setCount':0,
              'timeout':0,
              'exercises':[]
            }
          ]
        }
      }
      return seria
    })
    setSeries(result)
    localStorage.setItem('seria', JSON.stringify(result))
  }

  addBlockToSeriesAndPushExercise(title,exercise){
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries
    const result = series.map((seria) => {
      if(seria.title == title){
        return {
          ...seria,
          stages: [
            ...seria.stages,
            {
              'setCount':0,
              'timeout':0,
              'exercises':[
                {
                  ...exercise,
                  stage:title,
                  sets:[]
                }
              ]
            }
          ]
        }
      }
      return seria
    })
    setSeries(result)
    localStorage.setItem('seria', JSON.stringify(result))
  }

  saveSetsByOneExercise({currentExercise, sets}){
    const series = TrainingMobx.series
    const setSeries = TrainingMobx.setSeries
    const result = _.map(series,(seria)=>{
      if(currentExercise.seria.title == seria.title){
        return {
          ...seria,
          stages:seria.stages.map((stage,index) => {
            if(index == currentExercise.blockIndex){
              return {
                ...stage,
                exercises: stage.exercises.map((ex,iterator)=>{
                  if(iterator == currentExercise.exerciseIndex){
                    return {
                      ...ex,
                      sets
                    }
                  }
                  return ex
                })
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

  // Возаращает индекс блока, для отображения подряд
  getBlockIndex({ title, blockIndex }) {
    const series = TrainingMobx.series; // массив объектов
    let count = 0;
  
    for (let sra of series) {
      if (sra.title === title) {
        count += blockIndex;
        break; // выйдем из цикла, так как нужный объект найден
      } else {
        count += sra.stages.length; // прибавляем длину массива stages
      }
    }
  
    return count;
  }

}
export default new AddPatternHandlers();
