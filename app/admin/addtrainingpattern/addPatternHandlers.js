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
    addStage({ stages, setStages}){
        setStages([...stages, {'title':'','exercises':[], 'tests':[]}])
    }

    // Функция добавлет упражнения в этап
    addExerciseOnStages({ exercise, stages, setStages, currentStage }) {
        const updatedStages = stages.map(stage => {
          if (stage.title == currentStage) {
            return {
              ...stage,
              exercises: [...stage.exercises, exercise]
            };
          }
          return stage;
        });
        setStages(updatedStages);
      }


    handleDrag = (setIsDrag,exercise,stages,setStages,stage)=>{
      if(stage){
        setIsDrag(true);
        mobx.setDragValue({
          'type':'Упражнение',
          'stage':stage,
          'exercise':exercise
        })
      }else{
        setIsDrag(true);
        mobx.setDragValue({
          'type':'Упражнение',
          'exercise':exercise
        })
      }
    }

  // Обработка события Drop
  handleDrop = (dropIndex, stages, stage, setStages) => {
    const dragValue = mobx.dragValue;
  
    // Найти и удалить элемент из его текущей позиции, если он существует
    const updatedItems = stages.map(stg => {
      if (stg.title === stage.title) {
        if (dragValue?.type === 'Упражнение') {
          const updatedExercises = stg.exercises.filter(ex => ex.id !== dragValue.exercise.id);
          return {
            ...stg,
            exercises: updatedExercises,
          };
        }
      }
      return stg;
    });
  
    // Вставить элемент в новое место
    const finalItems = updatedItems.map(stg => {
      if (stg.title === stage.title) {
        if (dragValue?.type === 'Упражнение') {
          const updatedExercises = [...stg.exercises];
          updatedExercises.splice(dropIndex, 0, dragValue.exercise);
          return {
            ...stg,
            exercises: updatedExercises,
          };
        }
      }
      return stg;
    });
  
    // Удалить элемент из его исходной стадии, если он был перетащен из другой стадии
    const finalStages = finalItems.map(st => {
      if (dragValue.stage?.title && st.title === dragValue.stage.title && st.title !== stage.title) {
        return {
          ...st,
          exercises: st.exercises.filter(e => e.id !== dragValue.exercise.id),
        };
      }
      return st;
    });
  
    setStages(finalStages);
    mobx.setDragValue({});
  };
  
}
export default new AddPatternHandlers();