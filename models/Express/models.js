const sequelize = require('../../express_db_cinfig')
// Импорт класса для описания типа полей
const {DataTypes} = require('sequelize')


const UserMessageBelongChatExpress = sequelize.define('userMessageBelongChat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    chatId: {type: DataTypes.INTEGER,allowNull:true},
    userId: {type: DataTypes.INTEGER,allowNull:true},
    message:{type:DataTypes.TEXT, allowNull:true},
    isRead:{type:DataTypes.BOOLEAN, allowNull:true, defaultValue:false},

})

// Экспорт таблиц
module.exports = {
    UserMessageBelongChatExpress
}