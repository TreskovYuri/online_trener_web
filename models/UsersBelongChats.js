import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const UsersBelongChats = sequelize.define('usersBelongChats', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type:DataTypes.INTEGER, allowNull:false},
    userId: {type:DataTypes.INTEGER, allowNull:false},
})


// Экспорт таблиц
export default UsersBelongChats