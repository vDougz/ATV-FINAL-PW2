const express = require('express'); 

 /* IMPORTA A MODEL */
const categoriaModel = require('../MODEL/categoria');

/* GERENCIA AS ROTAS */
const router = express.Router(); 

/* (req, res) objetos de requisão e resposta*/
// ROTA DE INSCRIÇÃO DE CATEGORIA 
router.post("/categoria/cadastrarCategoria", (req, res) =>{

    let {nome_categoria, observacoes_categoria } = req.body;    

        categoriaModel.create({nome_categoria, observacoes_categoria})
        .then(()=>{
            return res.status(201).json({
                errorStatus:false,
                messageStatus:"Categoria inserida com sucesso!"
            });
        })
        .catch ((error) => {
            return res.status(500).json({
                errorStatus:true,
                messageStatus:error,
            });
        });
});

//ROTA DE LISTAGEM DE ROTAS
router.get('/categoria/listarCategoria', (req, res)=>{
    categoriaModel.findAll()
        .then(
            (categorias)=>{
                return res.status(200).json(categorias)
            })
        .catch
            ((error) => {
            return res.status(500).json({
                errorStatus:true,
                messageStatus:error
            });
        });
});

//ROTA DE BUSCA DE CATEGORIA POR ID

router.get("/categoria/ListarID/:codigo_categoria", (req, res)=>{
    let {codigo_categoria}= req.params;
    
    categoriaModel.findByPk(codigo_categoria)
        .then((categoria)=>{
                return res.status(200).json(categoria);
            }
        )
        .catch ((error) => {
            return res.status(500).json({
                errorStatus:true,
                messageStatus:error
            });
        });
});     

//ROTA DE ALTERAÇÃO DE CATEGORIA 
router.put('/categoria/alterarCategoria/:codigo_categoria', (req, res)=>{
    let {codigo_categoria} = req.params;
    let {nome_categoria, observacoes_categoria} = req.body;

    categoriaModel.update(
        {nome_categoria, observacoes_categoria},
        {where:{codigo_categoria}}
    )
    .then (
        ()=>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus:"categoria alterada com sucesso"
                }
            )
        })
        .catch (
            (error) => {
            return res.status(500).json({
                errorStatus:true,
                messageStatus:error
            });
        });
});

//ROTA DE DELETAR CATEGORIA
router.delete('/categoria/deletarCategoria/:codigo_categoria', (req, res) =>{
    let {codigo_categoria} = req.params;

    categoriaModel.destroy(
        {where:{codigo_categoria}}
    )
    .then(
        ()=>{
            return res.status(200).json(
                {
                    errorStatus: false,
                    messageStatus:"categoria excluida com sucesso"
                }
            )
        }
    )
        
    .catch((error) => {
        return res.status(500).json({
            errorStatus:true,
            messageStatus:error
        });
    });
})



module.exports = router;


