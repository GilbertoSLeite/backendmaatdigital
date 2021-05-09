module.exports = ( sequelize, Sequelize) => {
    const BookAuthor = sequelize.define('autores', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const BookAuthors = sequelize.define('autores_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        autor_id: {
            type: Sequelize.BIGINT,
            references: {
                model: BookAuthor,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela de Autores.'
        },      
        livro_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Books,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela do Livro.'
        }, 
    });
    return BookAuthors
};