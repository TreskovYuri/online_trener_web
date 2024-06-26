// mobx/TrainingMobx.js
import { makeAutoObservable } from 'mobx';

class TrainingMobx {
    constructor() {
        makeAutoObservable(this);
    }

    // Список тестов при создании шаблона тренировки
    addPatternTests = [];
    setAddPatternTests(value) {this.addPatternTests.push(value);}
}

export default new TrainingMobx();