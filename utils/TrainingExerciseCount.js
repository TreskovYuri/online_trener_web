import Sklonatel from "./Sklonatel";

// Возвразает колличество упражнений в тренировке
export const TrainingExerciseCount = (card) => {
    try{
        let count = 0;
        const stages = card.stages
        console.log(stages)
          stages.forEach(stage => {
            stage.stages.forEach(st =>{
              count = count + st.exercises.length
            })
          });
        return `${Sklonatel({count,many:'упражнений',one:'упражнение',rodit:'упражнения'})}`;
      }catch(e){
        return '0 упражнений'
      }
}