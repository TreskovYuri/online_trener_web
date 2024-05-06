import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const SportProgramm = sequelize.define('sportprogramms', {
    id: {type: DataTypes.INTEGER,unique:true, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    name: {type: DataTypes.STRING,allowNull:true},
    description: {type: DataTypes.TEXT, allowNull:true},

})


// Экспорт таблиц
export default SportProgramm