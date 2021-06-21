module.exports = (sequelize, Sequelize) => {
  const Graduation = sequelize.define('graduacoes', {
    name: Sequelize.STRING,
  });
  const CoordinatorBook = sequelize.define('coordenadores', {
    name: Sequelize.STRING,
  });
  const GraduationsCoordinator = sequelize.define('graduacoes_coordenadores', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    coordenadores_id: {
      type: Sequelize.BIGINT,
      references: {
        model: CoordinatorBook,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Coordenadores.',
    },
    graduacoes_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Graduation,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Graduações.',
    },
  });
  return GraduationsCoordinator;
};
