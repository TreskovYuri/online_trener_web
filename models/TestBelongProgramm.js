import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const TestBelongProgramm = sequelize.define('TestBelongProgramm', {
    programmId: {type: DataTypes.INTEGER},
    testId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    date: {type: DataTypes.TEXT, allowNull:true},
})


// Экспорт таблиц
export default TestBelongProgramm





