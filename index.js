// IMPORTANDO MÓDULO DO ESPRESS //
const express = require('express');

// CRIA UMA INSTANCIA EXECUTAVEL DO EXPRESS 
const app = express();

//CONFIGURAÇÃO PARA O EXPRESS MANIPULAR JSON
app.use(express.json());

//CONFIGURACAO PARA EXPRESS TRABALHAR COM DADOS DE FORMULÁRIO
app.use(express.urlencoded({extended:true}));

//FAZ CONEXÃO COM O BANCO DE DADOS
const connection = require ('./DATABASE/database');

//IMPORTAÇAO DA MODEL DE CATEGORIA 
const categoriaModel = require ('./MODEL/categoria');

//IMPORTAÇAO DA MODEL DE PRODUTO 
const produtosModel = require ('./MODEL/produtos');


//IMPORTAÇAO DA CONTROLLER DE CATEGORIA 
const CategoriaController = require("./CONTROLLER/CategoriaController");
app.use("/", CategoriaController );

//IMPORTAÇAO DA CONTROLLER DE PRODUTOS
const ProdutoController = require("./CONTROLLER/ProdutoController");
app.use("/", ProdutoController);   

console.log(connection);
//SERVIDOR REQUISIÇÃO / RESPOSTA
app.listen(3000, (req, res)=>{
    console.log('SERVIRDOR RODANDO')
})