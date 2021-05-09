module.exports = ( sequelize, Sequelize) => {
    const DiagrammingBook = sequelize.define('diagramacoes', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const CoordinatorsBook = sequelize.define('diagramadores_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        diagramador_id: {
            type: Sequelize.BIGINT,
            references: {
                model: DiagrammingBook,
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
    return CoordinatorsBook
};