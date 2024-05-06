import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Exercise = sequelize.define('exercise', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    groupId: {type: DataTypes.INTEGER, allowNull:true},
    nameRu: {type: DataTypes.STRING(255),allowNull:true},
    nameEng: {type: DataTypes.STRING(255),allowNull:true},
    descriptionRu: {type: DataTypes.TEXT,allowNull:true},
    descriptionEn: {type: DataTypes.TEXT,allowNull:true},
    link: {type: DataTypes.STRING(255),allowNull:true},
    img: {type: DataTypes.STRING(255),allowNull:true},
    video:{type: DataTypes.STRING(255),allowNull:true},
    stage:{type: DataTypes.STRING,allowNull:true},
    equipment:{type: DataTypes.TEXT,allowNull:true},
    musclegroups:{type: DataTypes.TEXT,allowNull:true},
    pocazatel1Name:{type: DataTypes.STRING,allowNull:true},
    pocazatel1Type:{type: DataTypes.STRING,allowNull:true},
    pocazatel1SPFlag:{type: DataTypes.STRING,allowNull:true},
    pocazatel2Name:{type: DataTypes.STRING,allowNull:true},
    pocazatel2Type:{type: DataTypes.STRING,allowNull:true},
    pocazatel2SPFlag:{type: DataTypes.STRING,allowNull:true},
    pocazatel3Name:{type: DataTypes.STRING,allowNull:true},
    pocazatel3Type:{type: DataTypes.STRING,allowNull:true},
    pocazatel3SPFlag:{type: DataTypes.STRING,allowNull:true},
    pocazatel4Name:{type: DataTypes.STRING,allowNull:true},
    pocazatel4Type:{type: DataTypes.STRING,allowNull:true},
    pocazatel4SPFlag:{type: DataTypes.STRING,allowNull:true},
    pocazatel5Name:{type: DataTypes.STRING,allowNull:true},
    pocazatel5Type:{type: DataTypes.STRING,allowNull:true},
    pocazatel5SPFlag:{type: DataTypes.STRING,allowNull:true},

})


// Экспорт таблиц
export default Exercise





