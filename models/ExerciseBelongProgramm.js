import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseBelongProgramm = sequelize.define('ExerciseBelongProgramm', {
    programmId: {type: DataTypes.INTEGER},
    exerciseId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    timing:{type: DataTypes.STRING, allowNull:true},
    sets:{type: DataTypes.TEXT, allowNull:true},
    date: {type: DataTypes.STRING, allowNull:true},
})


// Экспорт таблиц
export default ExerciseBelongProgramm





