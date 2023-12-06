//IMPORTAÇÃO DO MUNDO DO SEQUELIZE
const sequelize = require ("sequelize");

const connection = new sequelize (

    "atv_pw2",
    "root",
    "",
    {
        Host:"localhost",
        port: "3306",
        dialect: "mysql", 
        timezone : "-03:00"
    }
);

module.exports = connection; 