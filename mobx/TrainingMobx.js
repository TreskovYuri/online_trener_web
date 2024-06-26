import { makeAutoObservable } from 'mobx';

class TrainingMobx {
    constructor() {
        makeAutoObservable(this);
        this.setAddPatternTests = this.setAddPatternTests.bind(this);
        this.setStages = this.setStages.bind(this);
        this.setCurrentStage = this.setCurrentStage.bind(this);
        this.setAaddExercise = this.setAaddExercise.bind(this);
        this.setSeries = this.setSeries.bind(this);
    }

    // Список тестов при создании шаблона тренировки
    addPatternTests = [];
    setAddPatternTests(value) {this.addPatternTests.push(value);}

    // Список этапов при создании тренировки
    stages = [{'title': '', 'exercises': []}]
    setStages(value) {this.stages = value;}


    // Выбранный этап для добавления упражнения
    currentStage = ''
    setCurrentStage(value) {this.currentStage = value;}

    // Флаг для открывания окна добавления упражнений
    addExercise = false
    setAaddExercise(value) {this.addExercise = value;}

    // Флаг для открывания окна добавления упражнений
    series = []
    setSeries(value) {this.series = value;}


}

export default new TrainingMobx();
