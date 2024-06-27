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
    }

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
