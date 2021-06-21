module.exports = (sequelize, Sequelize) => {
  const Mainclasses = sequelize.define('areas_conhecimentos', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      comment: 'Coluna com geração automática dos identificadores, a fim de gerar segurança a estrutura de geração de códigos.',
    },
    codigo_classes: {
      type: Sequelize.STRING(3),
      allowNull: false,
      comment: 'Código de classificação da Área de Conhecimento.',
    },
    tipo_classes: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false,
      comment: 'Coluna com as Áreas de Conhecimentos.',
    },
  });
  return Mainclasses;
};
