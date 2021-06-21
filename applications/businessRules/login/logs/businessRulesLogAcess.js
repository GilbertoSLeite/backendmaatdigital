const logsAcess = require('../../../../infrastructure/database').logs_logins;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

async function GetLogsAcessGet(request, response) {
  try {
    token = getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const logsAcessGet = await logsAcess.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(logsAcessGet);
    } else {
      response.status(401).send(JSON.stringify({
        messagem: 'Senha não foi reconhecida.',
      }));
    }
  } catch (error) {
    response.status(404).send(JSON.stringify({
      error: error.parent,
    }));
    return error;
  }
}

async function PostLogsAcessGet(request, response) {
  try {
    token = getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const logAcessoPost = await logsAcess.create({
        id: request.body.id,
        usuario_tentativa: request.body.usuario_tentativa,
        nome_pais: request.body.nome_pais,
        nome_cidade: request.body.nome_cidade,
        nome_estado: request.body.nome_estado,
        latitude: request.body.latitude,
        longitude: request.body.longitude,
        ip: request.body.ip,
        data_tentativa: request.body.data_tentativa,
      });
      response.status(200).send(JSON.stringify({
        fullData: logAcessoPost,
        idData: logAcessoPost.id,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        messagem: 'Senha não foi reconhecida.',
      }));
    }
  } catch (error) {
    response.status(404).send(JSON.stringify({
      error: error.parent,
    }));
    return error;
  }
}

module.exports = {
  GetLogsAcessGet,
  PostLogsAcessGet,
};
