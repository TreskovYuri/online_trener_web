import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const User = sequelize.define('user', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    email: {type: DataTypes.STRING, unique: true,allowNull:true},
    number: {type: DataTypes.STRING,allowNull:true},
    name: {type: DataTypes.STRING,allowNull:true},
    post: {type: DataTypes.STRING,allowNull:true,defaultValue: "Игрок"},
    amplua: {type: DataTypes.STRING,allowNull:true},
    team: {type: DataTypes.STRING,allowNull:true},
    height: {type: DataTypes.STRING,allowNull:true},
    weight: {type: DataTypes.STRING,allowNull:true},
    date: {type: DataTypes.STRING,allowNull:true},
    img:{type: DataTypes.STRING, allowNull: true},
    secret: {type: DataTypes.TEXT,unique: true},
    password: {type: DataTypes.STRING,allowNull:true},
    activationCode: {type: DataTypes.STRING,allowNull:true},
    trenerId:{type: DataTypes.INTEGER, allowNull:true},
})





// Экспорт таблиц
export default User