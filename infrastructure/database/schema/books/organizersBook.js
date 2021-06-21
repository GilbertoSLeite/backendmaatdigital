module.exports = (sequelize, Sequelize) => {
  const OrganizerBook = sequelize.define('organizadores', {
    name: Sequelize.STRING,
  });
  const Books = sequelize.define('livros', {
    name: Sequelize.STRING,
  });
  const OrganizersBook = sequelize.define('organizadores_livros', {
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
    livro_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Books,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela do Livro.',
    },
  });
  return OrganizersBook;
};
