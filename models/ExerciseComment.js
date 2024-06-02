import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseComment = sequelize.define('exercisecomment', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    commentatorId: {type: DataTypes.INTEGER, allowNull:false},
    exerciseBelongId: {type: DataTypes.INTEGER, allowNull:false},
    message: {type: DataTypes.TEXT, allowNull:false},
})


// Экспорт таблиц
export default ExerciseComment