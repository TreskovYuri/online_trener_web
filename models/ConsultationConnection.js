import sequelize from '@/utils/Sequelize'
// Импорт класса для описания типа полей
import {DataTypes} from 'sequelize'



const ConsultationConnection = sequelize.define('consultationconnection', {
    consultationId: {type: DataTypes.INTEGER, allowNull:false},
    userId: {type: DataTypes.INTEGER, allowNull:false}
})


// Экспорт таблиц
export default ConsultationConnection