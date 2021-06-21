module.exports = (sequelize, Sequelize) => {
  const Mainclasses = sequelize.define('areas_conhecimentos', {
    name: Sequelize.STRING,
  });
  const Subclasses = sequelize.define('subclasses_conhecimentos', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
      comment: 'Coluna com geração automática dos identificadores, a fim de gerar segurança a estrutura de geração de códigos.',
    },
    codigo_subclasses: {
      type: Sequelize.STRING(3),
      allowNull: false,
      comment: 'Código de classificação da Área de Conhecimento.',
    },
    tipo_subclasses: {
      type: Sequelize.STRING(100),
      unique: true,
      allowNull: false,
      comment: 'Coluna com os Códigos das Subclasses da Áreas de Conhecimentos.',
    },
    area_conhecimento_id: {
      type: Sequelize.BIGINT,
      references: {
        model: Mainclasses,
        key: 'id',
        deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
      },
      allowNull: false,
      comment: 'A vinculação com a tabela de País.',
    },
  });
  return Subclasses;
};
