const bcrypt = require('bcrypt');

module.exports = (sequelize, Sequelize) => {

    const Users = sequelize.define("usuarios", {
        id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            unique: true,
            primaryKey: true,
            autoIncrement: true
        },       
        nome_usuario: {
            type: Sequelize.STRING,
            allowNull: false,
            comment: 'Coluna com a definição do Nome da Pessoa que será cadastrado no sistema.'
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            isEmail: true,
        },
        login: {
            type: Sequelize.STRING(30),
            allowNull: false,
            unique: true,
        },
        senha: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: false
        },  
    }, {
        hooks: {
            beforeCreate: async function (usuarios, option) {
                try {
                    const user = await cryptPassword(usuarios.senha)
                        .then(sucess => { usuarios.senha = sucess })
                        .catch(error => { error ? console.log('Error Tabela Login Create Try: ' + error) : console.log('Tudo certo no try!') })
                    return user
                } catch (error) {
                    console.log('Error Tabela Cadastro Login Create Catch: ' + error);
                }
            },
            beforeBulkUpdate: async function (usuarios, option) {
                try {
                    await cryptPassword(usuarios.attributes.senha)
                        .then(sucess => { usuarios.attributes.senha = sucess })
                        .catch(error => { error ? console.log('Error Tabela Login Create Try: ' + error) : console.log('Tudo certo no try!') })
                } catch (error) {
                    console.log('Error Tabela Cadastro Login Create Catch: ' + error);
                }
            },
        },
    },
        {
            comment: "Está tabela é destinada para cadastro do usuário e a senha.",
        });

    async function cryptPassword(senha) {
        try {
            return new Promise(function (resolve, reject) {
                bcrypt.genSalt(8, function (err, salt) {
                    if (err) {
                        console.log('cryptPassword err genSalt: ' + reject(err) + 'Err sem Reject: ' + err);
                        return reject(err)
                    };
                    bcrypt.hash(senha, salt, function (err, hash) {
                        if (err) {
                            return reject(err);
                        }
                        return (resolve(hash) === undefined ? hash : resolve(hash))
                    });
                });
            });
        } catch (error) {
            console.log('Error Tabela Cadastro Login cryptPassword: ' + error);
        };
    };

    Users.prototype.comparePassword = async function (passw, cb) {
        try {
            bcrypt.compare(passw, this.password, async function (err, isMatch) {
                try {
                    if (err) {
                        return cb(err);
                    }
                    cb(null, isMatch);
                } catch (error) {
                    console.log('Error Tabela Cadastro Login bcrypt.compare: ' + error);
                }
            })
        } catch (error) {
            console.log('Error Tabela Cadastro Login comparePassword: ' + error);
        };
    }

    return Users;
};

