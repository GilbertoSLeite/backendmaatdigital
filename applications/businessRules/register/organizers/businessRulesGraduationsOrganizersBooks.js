const graduationsOrganizersBooks = require('../../../../infrastructure/database').graduacoes_organizadores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const GraduationsOrganizersBooksPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsOrganizersBooksPost = await graduationsOrganizersBooks.create({
        id: request.body.id,
        organizador_id: request.body.organizador_id,
        graduacoes_id: request.body.graduacoes_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsOrganizersBooksPost,
        identificadorGraduacaoOrganizadorLivro: graduationsOrganizersBooksPost.id,
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
    console.log('Error graduationsOrganizersBooks.sGraduations ', error);
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

const GraduationsOrganizersBooksDel = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsOrganizersBooksDel = await graduationsOrganizersBooks.delete({
        where: {
          organizador_id: request.params.organizador_id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsOrganizersBooksDel.sGraduationsDel,
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
    console.log('Error graduationsOrganizersBooks.sGraduations ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetGraduationsOrganizersBooks = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const graduationsOrganizersBooksGet = await graduationsOrganizersBooks.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: graduationsOrganizersBooksGet,
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
    console.log('Error graduationsOrganizersBooks.sGraduations ', error);
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
  GraduationsOrganizersBooksPost,
  GraduationsOrganizersBooksDel,
  GetGraduationsOrganizersBooks,
};
