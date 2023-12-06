    //IMPORTACÃO DO MODULO DO SEQUELIZE
    const sequelize = require ("sequelize");

    //IMPORTE DA CONEXAO DO BANCO DE DADOS
    const connection = require ("../DATABASE/database");
    
    const categoriaModel = connection.define(
        'tbl_categoria',
        {
            codigo_categoria:{
                type: sequelize.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,   
            },
            nome_categoria:{
                type:sequelize.STRING(255),
                allowNull: false,
            },
            observacoes_categoria: {
                type:sequelize.TEXT,
                allowNull: true,            
            },
        },
        {
            freezeTableName: true,
            createdAt: false,
            updatedAt:false
        });
    /*
    SINCRONIZAÇÃO COM O BANCO DE DADOS - CRIA A TABELA CASO ELA NAO EXISTA 
    */
    
    categoriaModel.sync({force:false}); 
    
    
    module.exports = categoriaModel;