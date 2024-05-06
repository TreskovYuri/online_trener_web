import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const TestBelongTrainingPattern = sequelize.define('TestbelongtrainingPattern', {
    programmId: {type: DataTypes.INTEGER},
    testId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
})


// Экспорт таблиц
export default TestBelongTrainingPattern





