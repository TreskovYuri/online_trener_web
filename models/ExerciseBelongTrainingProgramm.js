import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseBelongTrainingProgramm = sequelize.define('ExerciseBelongTrainingProgramm', {
    programmId: {type: DataTypes.INTEGER},
    exerciseId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    sets:{type: DataTypes.TEXT, allowNull:true},
    time: {type: DataTypes.STRING, allowNull:true},
    date: {type: DataTypes.STRING, allowNull:true},
    recomendation:{type:DataTypes.TEXT,allowNull:true}
})


// Экспорт таблиц
export default ExerciseBelongTrainingProgramm





