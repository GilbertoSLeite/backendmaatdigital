module.exports = ( sequelize, Sequelize) => {
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const BookCountDown = sequelize.define('downloads_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
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
        ano_download: {
            type: Sequelize.BIGINT,
            allowNull: false,
            unique: false,
            comment: 'Ano em que ocorreu o download do livro.'
        }, 
        quantidade_downloads: {
            type: Sequelize.BIGINT,
            allowNull: false,
            unique: false,
            comment: 'Quantidade de downloads do livro.'
        }
    });
    return BookCountDown
};