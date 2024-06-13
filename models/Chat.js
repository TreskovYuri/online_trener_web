import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Chat = sequelize.define('chat', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    name: {type:DataTypes.STRING, allowNull:false},
    messageOnlyI:{type:DataTypes.BOOLEAN,defaultValue:false},
    isGroup:{type:DataTypes.BOOLEAN,defaultValue:false},

})


// Экспорт таблиц
export default Chat