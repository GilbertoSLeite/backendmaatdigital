const coverGraduations = require('../../../../infrastructure/database').graduacoes_capas;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const GraduationsCoversPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coversGraduationsPost = await coverGraduations.create({
        id: request.body.id,
        capas_id: request.body.capas_id,
        graduacoes_id: request.body.graduacoes_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: coversGraduationsPost,
        identificadorGraduacaoRespCapa: coversGraduationsPost.id,
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
    console.log('Error coversGraduations ', error);
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

const GraduationsCoversDel = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coversGraduationsDel = await coverGraduations.delete({
        where: {
          capas_id: request.params.capas_id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: coversGraduationsDel,
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
    console.log('Error coversGraduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetGraduationsCoverss = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coversGraduationsGet = await coverGraduations.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: coversGraduationsGet,
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
    console.log('Error coversGraduations ', error);
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
  GraduationsCoversPost,
  GraduationsCoversDel,
  GetGraduationsCoverss,
};
