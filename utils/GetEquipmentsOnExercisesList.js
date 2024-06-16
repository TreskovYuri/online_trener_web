import mobx from "@/mobx/mobx"

// Функция достает из всех упражнения оборудование и отдает их общим списком
const GetEquipmentsOnExercisesList = () => {
try{
    const exercises = mobx.exercises
    if(exercises.length==0){
        return []
    }
    const equipments = [];
    exercises.forEach(exercise => {
        const eGroups = JSON.parse(exercise.equipment)
        if(!eGroups || eGroups.length == 0){return}
        eGroups.forEach(group => {
            if(!equipments.includes(group)){
                equipments.push(group)
            }
        })
    })
    return equipments
}catch(err){
    console.log(`Ошибка во время получения списка оборудования из списка упражнений: ${err}`)
    return []
}
}

export default GetEquipmentsOnExercisesList