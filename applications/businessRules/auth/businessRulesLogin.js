const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const users = require('../../../infrastructure/database').usuarios;
const TokenError = require('../../../domain/auth/errorsHandling/tokenErro');

async function GetUser(request, response) {
  try {
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
      const token = jwt.sign({
        data: JSON.parse(JSON.stringify(usersGet)),
      }, 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=', { expiresIn: '2h' });
      const verify = jwt.verify(
        // eslint-disable-next-line no-console
        token, 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=', (erro, data) => (erro ? console.log(TokenError[erro]) : data),
      );
      if (verify && sendValidPass) {
        response.status(202).send(JSON.stringify({
          status: Boolean(true),
          message: 'Sua senha foi validada.',
          token: `JWT ${token}`,
        }));
      } else {
        response.status(401).send(JSON.stringify({
          status: Boolean(false),
          message: 'Sua senha ou token não foram validada. Favor verificar se está correto.',
          token: 'Não foi criado nenhum token para essa transição.',
        }));
      }
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('error ', error);
    response.status(404).send(JSON.stringify({
      error: error.parent,
      fullError: error,
    }));
    return error;
  }
}

module.exports = {
  GetUser,
};
