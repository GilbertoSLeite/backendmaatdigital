module.exports = ( sequelize, Sequelize) => {
    const CoverBook = sequelize.define('capas', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const CoversBook = sequelize.define('capas_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        capas_id: {
            type: Sequelize.BIGINT,
            references: {
                model: CoverBook,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela do Responsável pelas Capas dos Livros.'
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
    return CoversBook
};