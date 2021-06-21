module.exports = (sequelize, Sequelize) => {
  const Countries = sequelize.define('paises', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      comment: 'Coluna com geração automática dos identificadores, a fim de gerar segurança a estrutura de geração de códigos.',
    },
    nome: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      comment: 'Coluna com o Nome do País.',
    },
    nome_ingles: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      comment: 'Coluna com o Nome em Inglês do País.',
    },
  }, {
    comment: 'Tabela para Cadastro dos Países.',
  });
  return Countries;
};
