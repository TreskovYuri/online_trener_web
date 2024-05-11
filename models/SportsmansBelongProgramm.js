import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const SportsmansBelongProgramm = sequelize.define('SportsmansBelongProgramm', {
    programmId: {type: DataTypes.INTEGER},
    sportsmanId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    date: {type: DataTypes.STRING, allowNull:true},
})


// Экспорт таблиц
export default SportsmansBelongProgramm





