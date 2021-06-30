const diagrammingGraduations = require('../../../../infrastructure/database').graduacoes_diagramadores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const GraduationsDiagrammingPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingsGraduationPost = await diagrammingGraduations.create({
        id: request.body.id,
        diagramador_id: request.body.diagramador_id,
        graduacoes_id: request.body.graduacoes_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: diagrammingsGraduationPost,
        identificadorGraduacaoDiagramador: diagrammingsGraduationPost.id,
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
    console.log('Error diagrammingsGraduations ', error);
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

const GraduationsDiagrammingDel = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingsGraduationsDel = await diagrammingGraduations.delete({
        where: {
          diagramador_id: request.params.diagramador_id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: diagrammingsGraduationsDel,
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
    console.log('Error diagrammingsGraduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetGraduationsDiagrammings = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingsGraduationsGet = await diagrammingGraduations.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: diagrammingsGraduationsGet,
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
    console.log('Error diagrammingsGraduations ', error);
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
  GraduationsDiagrammingPost,
  GraduationsDiagrammingDel,
  GetGraduationsDiagrammings,
};
