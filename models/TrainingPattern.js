import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const TrainingPattern = sequelize.define('trainingpattern', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    name: {type: DataTypes.STRING,allowNull:true},
})


// Экспорт таблиц
export default TrainingPattern





