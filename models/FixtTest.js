import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const FixTests = sequelize.define('fixtests', {
    id: {type: DataTypes.INTEGER,unique:true, primaryKey: true, autoIncrement: true},
    sportsmanId: {type: DataTypes.INTEGER, allowNull:false},
    trenerId: {type: DataTypes.INTEGER, allowNull:false},
    testId: {type: DataTypes.INTEGER, allowNull:false},
    programmId: {type: DataTypes.INTEGER, allowNull:false},
    result: {type: DataTypes.FLOAT, allowNull:false},
    date: {type: DataTypes.STRING, allowNull:false},
})


// Экспорт таблиц
export default FixTests