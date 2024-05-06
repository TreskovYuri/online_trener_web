import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const TestsBelongTraining = sequelize.define('TestsBelongTraining', {
    trainingId: {type: DataTypes.INTEGER},
    exerciseId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
})


// Экспорт таблиц
export default TestsBelongTraining





