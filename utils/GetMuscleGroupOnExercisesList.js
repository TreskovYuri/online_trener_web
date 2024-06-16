import mobx from "@/mobx/mobx"

// Функция достает из всех упражнения группы мышч и отдает их общим списком
const GetMuscleGroupOnExercisesList = () => {
try{
    const exercises = mobx.exercises
    if(exercises.length==0){
        return []
    }
    const groups = [];
    exercises.forEach(exercise => {
        const eGroups = JSON.parse(exercise.musclegroups)
        if(!eGroups || eGroups.length == 0){return}
        eGroups.forEach(group => {
            if(!groups.includes(group)){
                groups.push(group)
            }
        })
    })
    return groups
}catch(err){
    console.log(`Ошибка во время получения списка групп из списка упражнений: ${err}`)
    return []
}
}

export default GetMuscleGroupOnExercisesList