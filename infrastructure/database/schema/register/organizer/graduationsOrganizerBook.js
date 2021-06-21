module.exports = (sequelize, Sequelize) => {
  const Graduation = sequelize.define('graduacoes', {
    name: Sequelize.STRING,
  });
  const OrganizerBook = sequelize.define('organizadores', {
    name: Sequelize.STRING,
  });
  const GraduationsOrganizerBook = sequelize.define('graduacoes_organizadores', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    organizador_id: {
      type: Sequelize.BIGINT,
      references: {
        model: OrganizerBook,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Organizadores.',
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
  return GraduationsOrganizerBook;
};
