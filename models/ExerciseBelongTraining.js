import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseBelongTraining = sequelize.define('Exercisebelongtraining', {
    programmId: {type: DataTypes.INTEGER},
    exerciseId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    sets:{type: DataTypes.TEXT, allowNull:true},
})


// Экспорт таблиц
export default ExerciseBelongTraining





