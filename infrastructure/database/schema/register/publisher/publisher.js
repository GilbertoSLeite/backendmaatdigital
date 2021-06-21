module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define('paises', {
    name: Sequelize.STRING,
  });
  const Publisher = sequelize.define('editoras', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    data_cadastro: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      comment: 'A Data do Cadastro da editora no banco de dados.',
    },
    nome_editora: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Nome da Editora.',
    },
    ano_fundacao: {
      type: Sequelize.INTEGER,
      allowNull: true,
      comment: 'Ano da Fundação da Editora Cadastrada.',
    },
    pais_sede_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Countries,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      comment: 'A vinculação com a tabela de País.',
    },
    website_editora: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Website da Editora.',
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  });
  return Publisher;
};
