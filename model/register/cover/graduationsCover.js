module.exports = ( sequelize, Sequelize) => {
    const Graduation = sequelize.define('graduacoes', { 
       name: Sequelize.STRING 
    });
    const CoverBook = sequelize.define('capas', { 
       name: Sequelize.STRING 
    });
    const GraduationsCover = sequelize.define('graduacoes_capas',{
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
            comment: 'A vinculação com a tabela de Resp. pelas Capas.'
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
    return GraduationsCover
};