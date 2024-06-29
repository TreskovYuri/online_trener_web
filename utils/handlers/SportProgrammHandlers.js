import SportProgrammMobx from "@/mobx/SportProgrammMobx";
import _ from 'lodash';
import Sklonatel from "../Sklonatel";

class SportProgrammHandlers {
    // Обработчик событя DROP для тренировок
    trainingDropHandler({ dayItem, training }) {
        const days = SportProgrammMobx.days;
        const setDays = SportProgrammMobx.setDays;

        let result = [];
        if (_.find(days, { date: dayItem })) {
            result = _.map(days, day => {
                if (day.date === dayItem) {
                    return {
                        ...day,
                        training
                    };
                }
                return day;
            });
        } else {
            const newDay = { date: dayItem, training };
            result = _.concat(days, newDay);
        }
        setDays(result);
    }

    // Удаление тренировок по заданному дню
    deleteTrainingOnDay({ dayItem }) {
        const days = SportProgrammMobx.days;
        const setDays = SportProgrammMobx.setDays;
        const result = _.filter(days, day => day.date !== dayItem);
        setDays(result);
    }

    // Возвращает колличество тренировок в спортпрограмме
    trainingCounterByCard(programm) {
        const days = programm.days || [];
        const count = _.size(_.filter(days, 'training'));

        return Sklonatel({count, many:'тренировок', one:'тренировка', rodit:'тренировки'});
    }
}

export default new SportProgrammHandlers();
