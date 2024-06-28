import { makeAutoObservable } from 'mobx';

class TrainingMobx {
    constructor() {
        makeAutoObservable(this);
        this.setAddPatternTests = this.setAddPatternTests.bind(this);
        this.setStages = this.setStages.bind(this);
        this.setCurrentStage = this.setCurrentStage.bind(this);
        // this.setCurrentExercise = this.setCurrentExercise.bind(this);
        this.setAaddExercise = this.setAaddExercise.bind(this);
        this.setIsShifted = this.setIsShifted.bind(this);
        this.setUpdateExerciseSets = this.setUpdateExerciseSets.bind(this);
        this.setSeries = this.setSeries.bind(this);
        this.setTrainingName = this.setTrainingName.bind(this);
        this.setСurrentMuscleGroup = this.setСurrentMuscleGroup.bind(this);
        this.setСurrentGroup = this.setСurrentGroup.bind(this);
        this.setСurrentEquipment = this.setСurrentEquipment.bind(this);
    }


    // <============ Строки ============>
    // Название тренировки при ее создании
    trainingName = ''
    setTrainingName(value) {this.trainingName = value;}

    // Выбрання группа мышц для фильтрации упражнений
    currentMuscleGroup = ''
    setСurrentMuscleGroup(value) {this.currentMuscleGroup = value;}

    // Выбрання группа упражнений для фильтрации упражнений
    currentGroup = 0
    setСurrentGroup(value) {this.currentGroup = value;}

    // Выбранное оборудование для фильтрации упражнений
    currentEquipment = ''
    setСurrentEquipment(value) {this.currentEquipment = value;}

    // <============ Списки ============>

    // Список тестов при создании шаблона тренировки
    addPatternTests = [];
    setAddPatternTests(value) {this.addPatternTests.push(value);}

    // Список этапов при создании тренировки
    stages = [{'title': '', 'exercises': []}]
    setStages(value) {this.stages = value;}
    
    //  Список серий при создании тренировки
    series = []
    setSeries(value) {this.series = value;}

    clearLists(){
        this.stages = [{'title': '', 'exercises': []}]
        this.series = []
    }



    // <=========== Current ===============>

    // Выбранный этап для добавления упражнения
    currentStage = ''
    setCurrentStage(value) {this.currentStage = value;}
    
    // // Выбранное упражнения для редактирования сетов
    // currentExercise = {}
    // setCurrentExercise(value) {this.currentExercise = value;}


    // <=========== Флаги ===================>

    // Флаг для открывания окна добавления упражнений
    addExercise = false
    setAaddExercise(value) {this.addExercise = value;}

    // Флаг для открывания окна редактирования сетов
    updateExerciseSets = false
    setUpdateExerciseSets(value) {this.updateExerciseSets = value;}

    // Флаг для отслеживания нажатойкнопки Shift
    isShifted = false
    setIsShifted(value) {this.isShifted = value;}




}

export default new TrainingMobx();
