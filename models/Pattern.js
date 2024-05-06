import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Pattern = sequelize.define('pattern', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER,allowNull:true},
    name: {type: DataTypes.STRING,allowNull:true},
    description: {type: DataTypes.TEXT,allowNull:true},
    recomendation: {type: DataTypes.TEXT,allowNull:true},
    name1: {type: DataTypes.STRING,allowNull:true},
    description1: {type: DataTypes.TEXT,allowNull:true},
    name2: {type: DataTypes.STRING,allowNull:true},
    description2: {type: DataTypes.TEXT,allowNull:true},
    name3: {type: DataTypes.STRING,allowNull:true},
    description3: {type: DataTypes.TEXT,allowNull:true},
    name4: {type: DataTypes.STRING,allowNull:true},
    description4: {type: DataTypes.TEXT,allowNull:true},
    name5: {type: DataTypes.STRING,allowNull:true},
    description5: {type: DataTypes.TEXT,allowNull:true},
    name6: {type: DataTypes.STRING,allowNull:true},
    description6: {type: DataTypes.TEXT,allowNull:true},
    name7: {type: DataTypes.STRING,allowNull:true},
    description7: {type: DataTypes.TEXT,allowNull:true},
})





// Экспорт таблиц
export default Pattern