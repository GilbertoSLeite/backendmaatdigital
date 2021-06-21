module.exports = (sequelize, Sequelize) => {
  const Graduation = sequelize.define('graduacoes', {
    name: Sequelize.STRING,
  });
  const DiagrammingBook = sequelize.define('diagramacoes', {
    name: Sequelize.STRING,
  });
  const GraduationsDiagramming = sequelize.define('graduacoes_diagramadores', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    diagramador_id: {
      type: Sequelize.BIGINT,
      references: {
        model: DiagrammingBook,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Diagramadores.',
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
  return GraduationsDiagramming;
};
