module.exports = (sequelize, Sequelize) => {
  const Graduation = sequelize.define('graduacoes', {
    name: Sequelize.STRING,
  });
  const ResponsibleEditor = sequelize.define('editores', {
    name: Sequelize.STRING,
  });
  const GraduationsResponsibleEditor = sequelize.define('graduacoes_editores', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    editor_id: {
      type: Sequelize.BIGINT,
      references: {
        model: ResponsibleEditor,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Editores.',
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
  return GraduationsResponsibleEditor;
};
