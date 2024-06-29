import { makeAutoObservable } from 'mobx';

class SportProgrammMobx {
    constructor() {
        makeAutoObservable(this);
        this.setDays = this.setDays.bind(this);
        this.clear = this.clear.bind(this);
    }


    // <============ Массивы ============>
    // Массив обьектов для кадого дня спортпрограммы
    days = []
    setDays(value) {this.days = value;}


    // <============ Отчстка ============>
    // Функция отчистки всех зависимостей при размонтировании компонента
    clear(){
        this.days=[]
    }





}

export default new SportProgrammMobx();
