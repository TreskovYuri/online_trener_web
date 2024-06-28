

export const ExerciseFilterFlagHandler = ({exercise,currentEquipment,currentMuscleGroup,currentGroup}) => {
    const equipments = JSON.parse(exercise.equipment);
    const musclegroups = JSON.parse(exercise.musclegroups);
    return (
        currentEquipment == "" || equipments.includes(currentEquipment)) && 
      (currentMuscleGroup == "" || musclegroups.includes(currentMuscleGroup)) && 
      (exercise.groupId == currentGroup || currentGroup==0);
}