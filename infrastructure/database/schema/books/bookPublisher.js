module.exports = (sequelize, Sequelize) => {
  const Publisher = sequelize.define('editoras', {
    name: Sequelize.STRING,
  });
  const Books = sequelize.define('livros', {
    name: Sequelize.STRING,
  });
  const BookPublishers = sequelize.define('editoras_livros', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    editoras_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Publisher,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Editoras.',
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
  return BookPublishers;
};
