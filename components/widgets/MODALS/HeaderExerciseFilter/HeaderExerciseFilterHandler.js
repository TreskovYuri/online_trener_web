class HeaderExerciseFilterHandler {
    constructor() {
        this.name = "HeaderExerciseFilterHandler";
    }

    clickHandler = ({
        type, 
        setMuscleGroupModal = ()=>{}, 
        setEquipmentsModal = ()=>{},
        setGroupModal = ()=>{}
    }) => {



        if(type == 'Оборудование'){
            setEquipmentsModal()
        }else if (type == 'Группа мышц'){
            setMuscleGroupModal()
        }else if (type == 'Группа'){
            setGroupModal()
        }
    }

    muscleGroupClickHandler = ({group, setGroup}) => {
        if(group == 'Сброс'){
            setGroup('')
        }else{
            setGroup(group)
        }
    }
}

// Экспортируем экземпляр класса
export default new HeaderExerciseFilterHandler();