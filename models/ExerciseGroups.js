import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ExerciseGroups = sequelize.define('ExerciseGroups', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name: {type: DataTypes.STRING(255),allowNull:true},
    trenerId: {type: DataTypes.INTEGER,allowNull:true},
})


// Экспорт таблиц
export default ExerciseGroups





