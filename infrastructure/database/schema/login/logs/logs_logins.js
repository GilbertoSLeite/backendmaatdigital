module.exports = (sequelize, DataType) => {
  const logsLogins = sequelize.define('logs_logins', {
    id: {
      type: DataType.BIGINT,
      allowNull: false,
      primaryKey: true,
      unique: true,
      autoIncrement: true,
    },
    usuario_tentativa: {
      type: DataType.STRING,
    },
    nome_pais: {
      type: DataType.STRING,
    },
    nome_cidade: {
      type: DataType.STRING,
    },
    nome_estado: {
      type: DataType.STRING,
    },
    latitude: {
      type: DataType.STRING,
    },
    longitude: {
      type: DataType.STRING,
    },
    ip: {
      type: DataType.STRING,
    },
    data_tentativa: {
      type: DataType.STRING,
    },
  });
  return logsLogins;
};
