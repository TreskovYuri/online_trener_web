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


    handleDrag= (setIsDrag,exercise)=>{
      setIsDrag(true);
      mobx.setDragValue({
        'type':'Упражнение',
        'exercise':exercise
      })
    }

  // Обработка события Drop
    handleDrop = (dropIndex,stages,stage,setStages) => {
      const dragValue = mobx.dragValue;
      console.log(dragValue.type);
    
      const updatedItems = stages.map(stg => {
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
    
      setStages(updatedItems);
      mobx.setDragValue({});
    };
}
export default new AddPatternHandlers();