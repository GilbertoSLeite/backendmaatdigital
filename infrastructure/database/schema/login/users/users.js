const bcrypt = require('bcrypt');

async function cryptPassword(senha) {
  try {
    const crypt = new Promise((resolve, reject) => {
      bcrypt.genSalt(8, async (err, salt) => {
        try {
          return (err ? reject(err) : bcrypt.hash(senha, salt, async (errs, hash) => {
            try {
              return (!errs && (resolve(hash) === undefined ? hash : resolve(hash)));
            } catch (error) {
              // eslint-disable-next-line no-console
              console.log(`Error Tabela Users cryptPassword hash: ${error}`);
              return error;
            }
          }));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Error Tabela Users cryptPassword gensalt: ${error}`);
          return error;
        }
      });
    });
    return crypt.then((value) => value);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(`Error Tabela Users cryptPassword: ${error}`);
    return error;
  }
}

module.exports = (sequelize, Sequelize) => {
  const Users = sequelize.define('usuarios', {
    id: {
      type: Sequelize.BIGINT,
      allowNull: false,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    nome_usuario: {
      type: Sequelize.STRING,
      allowNull: false,
      comment: 'Coluna com a definição do Nome da Pessoa que será cadastrado no sistema.',
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
      allowNull: false,
    },
  }, {
    hooks: {
      async beforeCreate(usuarios) {
        try {
          const user = await cryptPassword(usuarios.senha);
          return user;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Error Tabela Users Create Catch: ${error}`);
          return error;
        }
      },
      async beforeBulkUpdate(usuarios) {
        try {
          const resultcryptPass = await cryptPassword(usuarios.attributes.senha);
          return resultcryptPass;
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Error Tabela Users Create Catch: ${error}`);
          return error;
        }
      },
    },
  },
  {
    comment: 'Está tabela é destinada para cadastro do usuário e a senha.',
  });

  Users.prototype.comparePassword = async (passw, cb) => {
    try {
      return bcrypt.compare(passw, this.password, async (err, isMatch) => {
        try {
          return (err ? cb(err) : cb(null, isMatch));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.log(`Error Tabela Users bcrypt.compare: ${error}`);
          return error;
        }
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`Error Tabela Users comparePassword: ${error}`);
      return error;
    }
  };

  return Users;
};
