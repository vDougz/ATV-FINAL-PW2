const sequelize = require ("sequelize")

const connection = require ("../DATABASE/database")

/*Importação da tabela de categoria para criação da chave estrangeira
representanto a cardinalidade*/
const categoria = require("./categoria");

const produtos  = connection.define(
    'tbl_produto',
    {
        codigo_produto:{
            type:sequelize.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },

        codigo_categoria:{
            type: sequelize.INTEGER.UNSIGNED,
            allowNull: false,
        },

        nome_produto: {
            type: sequelize.STRING(255),
            allowNull: false,
        },
        
        valor_produto: {
            type: sequelize.DECIMAL(10.2),
            allowNull: false,
        },

        imagem_produto: {
            type: sequelize.DataTypes.STRING(500),
            allowNull: false,
        },
        descricao_produto:{
            type: sequelize.TEXT,
            allowNull: false,
        },
        imagem_url:{
            type: sequelize.STRING(255),
            allowNull: false,
        },
    },
    {
        freezeTableName: true,
        createdAt: false,
        updatedAt:false
    }); 

/*Implementação da  CHAVE ESTRANGEIRA - LADO N*/
categoria.hasMany(produtos, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});


/*Implementação da  CHAVE PRIMÁRIA - LADO 1*/
produtos.belongsTo(categoria, {
    foreignKey: 'codigo_categoria',
    sourceKey: 'codigo_categoria'
});



    produtos.sync({force:false});

    module.exports = produtos;
    