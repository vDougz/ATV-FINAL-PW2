const express = require('express'); 

// IMPORTAÇÃO DOS PACOTES DO FIREBASE
const {initializeApp} = require('firebase/app');
const {getStorage, ref, getDownloadURL, uploadBytes, listAll, deleteObject} = require('firebase/storage');
const router = express.Router();
const upload = require('../helpers/upload/uploadImagens');
const deleteImage = require('../helpers/upload/deleteImagens');
const produtoModel = require('../MODEL/produtos');



/* FIREBASE - CONEXÃO E CONFIGURAÇÃO */

const firebaseConfig = {
// DADOS DO FIREBASE
};


//INCIALIZAR O FIREBASE
const firebaseApp = initializeApp(firebaseConfig);

//CONECTANDO COM O STORAGE
const storage = getStorage(firebaseApp);

// ROTA DE CADASTRAR PRODUTOS
router.post("/produto/CadastrarProduto", upload.single("file"), (req, res) => {
    const { nome_produto, valor_produto, descricao_produto, codigo_categoria } =
        req.body;

    const file = req.file;

    let imagem_produto;
    let imagem_url;

    const fileName = Date.now().toString() + "-" + file.originalname;
    const fileRef = ref(storage, fileName);

    uploadBytes(fileRef, file.buffer).then((snapshot) => {
        imageRef = ref(storage, snapshot.metadata.name);
        getDownloadURL(imageRef).then((urlFinal) => {
            imagem_produto = fileName;
            imagem_url = urlFinal;
            console.log("Nome da imagem: " + imagem_produto);
            console.log("URL da imagem: " + imagem_url);

            if (imagem_produto) {
                produtoModel
                    .create({
                        nome_produto,
                        valor_produto,
                        imagem_produto,
                        imagem_url,
                        descricao_produto,
                        codigo_categoria,
                    })
                    .then(() => {
                        return res.status(200).json({
                            errorStatus: false,
                            messageStatus: "Produto cadastrado com sucesso!",
                        });
                    })
                    .catch((error) => {
                        return res.status(500).json({
                            errorStatus: true,
                            messageStatus: error,
                        });
                    });
            }
        });
    });
});

router.get("/produto/ListarProduto", (req, res) => {
    produtoModel
        .findAll()
        .then((tbl_produto) => {
            return res.status(200).json(tbl_produto);
        })
        .catch((error) => {
            return res.status(500).json({
                errorStatus: true,
                messageStatus: error,
            });
        });
});

router.get("/produto/ListarProduto/:codigo_produto", (req, res) => {
    let { codigo_produto } =    req.params;

    produtoModel
        .findByPk(codigo_produto)
        .then((tbl_produto) => {
            return res.status(200).json(tbl_produto);
        })
        .catch((erro) => {
            return res.status(400).json({
                erroStatus: true,
                erroMensagem: erro,
            });
        });
});

// router.put("/produto/alterarProduto", (req, res) =>{
//     res.send("Produto alterado com Sucesso");
// });

router.delete("/produto/DeletarProduto/:codigo_produto", (req, res) => {
    let { codigo_produto } = req.params;

    produtoModel.findByPk(codigo_produto).then((tbl_produto) => {
        deleteImage(tbl_produto.imagem_produto);
        tbl_produto
            .destroy({
                where: { codigo_produto },
            })
            .then(() => {
                return res.status(200).json({
                    errorStatus: false,
                    messageStatus: "Produto excluído com sucesso!",
                });
            })
            .catch((error) => {
                return res.status(500).json({
                    errorStatus: true,
                    messageStatus: error,
                });
            });
    });
});

module.exports = router;