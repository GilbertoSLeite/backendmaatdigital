module.exports = ( sequelize, Sequelize) => {
    const ResponsibleEditor = sequelize.define('editores', { 
       name: Sequelize.STRING 
    });
    const Books = sequelize.define('livros', { 
       name: Sequelize.STRING 
    });
    const ResponsibleEditorsBook = sequelize.define('editores_responsaveis_livros',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        editores_id: {
            type: Sequelize.BIGINT,
            references: {
                model: ResponsibleEditor,
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
    return ResponsibleEditorsBook
};