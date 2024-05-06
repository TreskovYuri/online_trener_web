import {Sequelize} from 'sequelize'
import chalk from 'chalk'


const sequelize = new Sequelize(
    process.env.DB_NAME, // Название БД
    process.env.DB_USER, // Пользователь
    process.env.DB_PASSWORD, // ПАРОЛЬ
    {
        dialect: 'postgres',
        dialectModule: require('pg'),
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        operatorAliases: false // Отключение использования псевдонимов операторов
    }
)

const start = async()=>{
    try{
        // Подключение к базе данных
        await sequelize.authenticate()
        // Сверка состояния базы данных со схемой данны в нашем приложении
        await sequelize.sync({alter:true})
        console.log(chalk.blue(`Установлено подулючение к базе данных`))
    }catch(e){console.log(chalk.red("ОШИБКА ПОДКЛЮЧЕНИЯ К БАЗЕ ДАННЫХ"));console.log(chalk.red(e))}
}
start()

export default sequelize