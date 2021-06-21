module.exports = (sequelize, Sequelize) => {
  const Books = sequelize.define('livros', {
    name: Sequelize.STRING,
  });
  const CoversBook = sequelize.define('capas_livros', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
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
    name_capas: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
      comment: 'Nome do arquivo de imagem da capa do livro.',
    },
    path_capas: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
      comment: 'Caminho onde deverá ser encontrado o arquivo de imagem da capa do livro.',
    },
    size_capas: {
      type: Sequelize.INTEGER,
      allowNull: true,
      unique: false,
      comment: 'Tamanho do arquivo de imagem da capa do livro.',
    },
    type_capas: {
      type: Sequelize.STRING,
      allowNull: true,
      unique: false,
      comment: 'Extensão/Tipo do arquivo de imagem da capa do livro.',
    },
  });
  return CoversBook;
};
