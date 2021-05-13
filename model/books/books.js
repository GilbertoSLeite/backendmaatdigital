module.exports = (sequelize, Sequelize) => {
    const Subclasses = sequelize.define('subclasses_conhecimentos', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true,
            comment: 'Coluna com geração automática dos identificadores, a fim de gerar segurança a estrutura de geração de códigos.'
        },
        titulo_livro:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: 'Título do Livro.'

        },
        subtitulo_livro:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: false,
            comment: 'SubTítulo do Livro.'

        },      
        classificacao_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Subclasses,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela do Responsável pelas Classificações dos Livros.'
        },   
        isbn_livro:{
            type: Sequelize.STRING(13),
            unique: true,
            allowNull: true,
            comment: 'ISBN (International Standard Book Number/ Padrão Internacional de Numeração de Livro).'
        },
        link_livro:{
            type: Sequelize.STRING,
            unique: false,
            allowNull: true,
            comment: 'Link para Download do Livro.'
        },
        resumo_livro:{
            type: Sequelize.TEXT,
            unique: false,
            allowNull: true,
            comment: 'Resumo do Livro.'
        },
    })
return Books
};