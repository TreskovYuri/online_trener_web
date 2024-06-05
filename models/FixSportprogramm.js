import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const FixSportprogramm = sequelize.define('fixSportprogramm', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    exerciseId: {type: DataTypes.INTEGER, allowNull:false},
    programmId: {type: DataTypes.INTEGER, allowNull:false},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    setId: {type: DataTypes.INTEGER, allowNull:false},
    sets: {type: DataTypes.TEXT, allowNull:false},
    date: {type: DataTypes.STRING, allowNull:false},
})


// Экспорт таблиц
export default FixSportprogramm