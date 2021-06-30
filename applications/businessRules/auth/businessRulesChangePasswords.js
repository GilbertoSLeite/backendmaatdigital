const bcrypt = require('bcrypt');
const users = require('../../../infrastructure/database').usuarios;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const GetPostUsers = async (request, response) => {
  try {
    token = getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const usersGet = await users.findOne({
        where: {
          login: request.body.login,
        },
      });
      if (!usersGet) {
        response.status(401).send(JSON.stringify({
          status: Boolean(false),
          message: `Usuário ${request.body.login} não encontrado.`,
        }));
      } else {
        const sendValidPass = bcrypt.compareSync(request.body.senha, usersGet.senha);
        if (sendValidPass) {
          response.status(202).send(JSON.stringify({
            status: Boolean(true),
            message: 'Sua senha foi validada.',
          }));
        } else {
          response.status(401).send(JSON.stringify({
            status: Boolean(false),
            message: 'Sua senha ou token não foram validada. Favor verificar se está correto.',
            token: 'Não foi criado nenhum token para essa transição.',
          }));
        }
      }
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha e/ou Token, incorreto ou nulo. Favor verificar.',
      }));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error ', error);
    response.status(404).send(JSON.stringify({
      error: error.parent,
      fullError: error,
    }));
  }
};

module.exports = {
  GetPostUsers,
};
