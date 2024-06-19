import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const UserMessageBelongChat = sequelize.define('userMessageBelongChat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.INTEGER,allowNull:true},
    userId: {type: DataTypes.INTEGER,allowNull:true},
    message:{type:DataTypes.TEXT, allowNull:true},
    isRead:{type:DataTypes.BOOLEAN, allowNull:true, defaultValue:false},

})


// Экспорт таблиц
export default UserMessageBelongChat