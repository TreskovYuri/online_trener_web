import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseBelongTrainingProgramm = sequelize.define('ExerciseBelongTrainingProgramm', {
    programmId: {type: DataTypes.INTEGER},
    exerciseId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    sets:{type: DataTypes.STRING, allowNull:true},
    time: {type: DataTypes.TEXT, allowNull:true},
    date: {type: DataTypes.TEXT, allowNull:true},
})


// Экспорт таблиц
export default ExerciseBelongTrainingProgramm





