const { Sequelize } = require('sequelize');

module.exports = new Sequelize(
    'onlinetrener', // Название БД
    'postgres', // Пользователь
    'postgres', // ПАРОЛЬ
    {
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        operatorAliases: false // Отключение использования псевдонимов операторов
    }
);
