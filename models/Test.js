import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Test = sequelize.define('tests', {
    id: {type: DataTypes.INTEGER,unique:true, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    name: {type: DataTypes.STRING,allowNull:true},
    nameEng: {type: DataTypes.STRING,allowNull:true},
    description: {type: DataTypes.TEXT, allowNull:true},
    descriptionEng: {type: DataTypes.TEXT, allowNull:true},
    type: {type: DataTypes.TEXT, allowNull:true},
    item: {type: DataTypes.TEXT, allowNull:true},
    groupId: {type: DataTypes.INTEGER, allowNull:false},
})


// Экспорт таблиц
export default Test