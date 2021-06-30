const graduations = require('../../../../infrastructure/database').graduacoes;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const GraduationsPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsPost = await graduations.create({
        id: request.body.id,
        nome_graduacao: request.body.nome_graduacao,
        sigla_graduacao: request.body.sigla_graduacao,
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsPost,
        identificadorGraduacao: graduationsPost.id,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha ou Token não foram reconhecidos.',
      }));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error graduations ', error);
    // eslint-disable-next-line no-console
    console.log('response: ', response);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GraduationsPut = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsPut = await graduations.update({
        nome_graduacao: request.body.nome_graduacao,
        sigla_graduacao: request.body.sigla_graduacao,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsPut,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha ou Token não foram reconhecidos.',
      }));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error graduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetGraduations = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsGet = await graduations.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsGet,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha ou Token não foram reconhecidos.',
      }));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error graduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

module.exports = {
  GraduationsPost,
  GraduationsPut,
  GetGraduations,
};
