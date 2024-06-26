import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const Consultation = sequelize.define('consultation', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    userId: {type: DataTypes.INTEGER, allowNull:false},
    name: {type: DataTypes.STRING,allowNull:true},
    date: {type: DataTypes.DATE,allowNull:true},
    description: {type: DataTypes.STRING, unique: true,allowNull:true}
})


// Экспорт таблиц
export default Consultation





