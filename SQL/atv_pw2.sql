CREATE DATABASE atv_pw2;
USE atv_pw2;
#CRIAÇÃO DA TABELA PRODUTO
CREATE TABLE tbl_produto(
	codigo_produto INT unsigned auto_increment primary key,
	codigo_categoria INT unsigned not null,
    nome_produto VARCHAR(255) not null,
    valor_produto DECIMAL(10,2) not null,
    imagem_produto VARCHAR(500) not null,
    descricao_produto TEXT not null
);
#CRIAÇÃO DA TABELA CATEGORIA
CREATE TABLE tbl_categoria(
	codigo_categoria INT unsigned auto_increment primary key,
    nome_categoria VARCHAR(255) not null,
    observacoes_categoria TEXT not null
);
#RELACIONAMENTOS DA TABELA PRODUTO
ALTER TABLE tbl_produto ADD CONSTRAINT fk_tbl_produto_tbl_categoria
FOREIGN KEY (codigo_categoria)
REFERENCES tbl_categoria (codigo_categoria);
select * from tbl_categoria;