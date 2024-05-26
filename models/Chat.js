import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    user1Id: {type: DataTypes.INTEGER, allowNull:false},
    user2Id: {type: DataTypes.INTEGER, allowNull:false},
})


// Экспорт таблиц
export default Chat