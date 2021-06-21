module.exports = (sequelize, Sequelize) => {
  const Graduation = sequelize.define('graduacoes', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    nome_graduacao: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Nome da Graduação.',
    },
    sigla_graduacao: {
      type: Sequelize.STRING(4),
      allowNull: false,
      comment: 'Coluna com a definição da Sigla da Graduação.',
    },
  });
  return Graduation;
};
