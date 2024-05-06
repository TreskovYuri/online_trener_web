import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const UsersBelongProgramm = sequelize.define('UsersBelongProgramm', {
    programmId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
})


// Экспорт таблиц
export default UsersBelongProgramm





