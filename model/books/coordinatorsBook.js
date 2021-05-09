module.exports = ( sequelize, Sequelize) => {
    const CoordinatorBook = sequelize.define('coordenadores', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const CoordinatorsBook = sequelize.define('coordenadores_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        coordenador_id: {
            type: Sequelize.BIGINT,
            references: {
                model: CoordinatorBook,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela de Editores.'
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