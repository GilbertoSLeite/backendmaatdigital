module.exports = ( sequelize, Sequelize) => {
    const Graduation = sequelize.define('graduacoes', { 
       name: Sequelize.STRING 
    });
    const BookAuthor = sequelize.define('autores', { 
       name: Sequelize.STRING 
    });
    const GraduationsAuthor = sequelize.define('graduacoes_autores',{
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },     
        autores_id: {
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
        graduacoes_id: {
            type: Sequelize.BIGINT,
            references: {
                model: Graduation,
                key: 'id',
                deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
            },
            allowNull: false,
            unique: false,
            comment: 'A vinculação com a tabela de Graduações.'
        }, 
    });
    return GraduationsAuthor
};