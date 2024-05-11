import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const NutritionBelongProgramm = sequelize.define('NutritionBelongProgramm', {
    programmId: {type: DataTypes.INTEGER},
    nutritionId: {type: DataTypes.INTEGER},
    userId: {type: DataTypes.INTEGER},
    date: {type: DataTypes.STRING, allowNull:true},
})


// Экспорт таблиц
export default NutritionBelongProgramm





