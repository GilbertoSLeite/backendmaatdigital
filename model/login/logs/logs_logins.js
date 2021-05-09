module.exports = (sequelize, Sequelize) => {

    const Logs_Logins = sequelize.define("logs_logins", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        usuario_tentativa: {
            type: Sequelize.STRING,
        },
        nome_pais: {
            type: Sequelize.STRING,
        },
        nome_cidade: {
            type: Sequelize.STRING,
        },
        nome_estado: {
            type: Sequelize.STRING,
        },
        latitude: {
            type: Sequelize.STRING,
        },
        longitude: {
            type: Sequelize.STRING,
        },
        ip: {
            type: Sequelize.STRING,
        },
        data_tentativa: {
            type: Sequelize.STRING,
        }
    });
    return Logs_Logins;
}