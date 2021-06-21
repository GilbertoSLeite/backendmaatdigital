module.exports = (sequelize, Sequelize) => {
  const Books = sequelize.define('livros', {
    name: Sequelize.STRING,
  });
  const BookCountView = sequelize.define('visualizacoes_livros', {
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
    ano_visualizacao: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: false,
      comment: 'Ano em que ocorreu a visualização do livro.',
    },
    quantidade_visualizacoes: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: false,
      comment: 'Quantidade de visualizações do livro.',
    },
  });
  return BookCountView;
};
