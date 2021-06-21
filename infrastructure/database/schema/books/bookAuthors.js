module.exports = (sequelize, DataTypes) => {
  const BookAuthor = sequelize.define('autores', {
    name: DataTypes.STRING,
  });
  const Books = sequelize.define('livros', {
    name: DataTypes.STRING,
  });
  const BookAuthors = sequelize.define('autores_livros', {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    autor_id: {
      type: DataTypes.BIGINT,
      references: {
        model: BookAuthor,
        key: 'id',
        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela de Autores.',
    },
    livro_id: {
      type: DataTypes.BIGINT,
      references: {
        model: Books,
        key: 'id',
        deferrable: DataTypes.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      unique: false,
      comment: 'A vinculação com a tabela do Livro.',
    },
  });
  return BookAuthors;
};
