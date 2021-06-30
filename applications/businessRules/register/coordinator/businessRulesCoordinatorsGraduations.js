const coordinatorGraduations = require('../../../../infrastructure/database').graduacoes_coordenadores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const GraduationsCoordinatorPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorGraduationsPost = await coordinatorGraduations.create({
        id: request.body.id,
        coordenadores_id: request.body.coordenadores_id,
        graduacoes_id: request.body.graduacoes_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorGraduationsPost,
        identificadorGraduacaoCoordenador: coordinatorGraduationsPost.id,
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
    console.log('Error coordinatorGraduations ', error);
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

const GraduationsCoordinatorDel = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorGraduationsDel = await coordinatorGraduations.delete({
        where: {
          coordenadores_id: request.params.coordenadores_id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorGraduationsDel,
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
    console.log('Error coordinatorGraduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetGraduationsCoordinators = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorGraduationsGet = await coordinatorGraduations.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorGraduationsGet,
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
    console.log('Error coordinatorGraduations ', error);
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
  GraduationsCoordinatorPost,
  GraduationsCoordinatorDel,
  GetGraduationsCoordinators,
};
