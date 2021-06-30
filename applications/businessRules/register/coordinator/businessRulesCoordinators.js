const coordinators = require('../../../../infrastructure/database').coordenadores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const CoordinatorsPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorPost = await coordinators.create({
        id: request.body.id,
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_coordenador_id: request.body.pais_autor_id,
        numero_cpf: request.body.numero_cpf,
        sexo_pessoas: request.body.sexo_pessoas,
        raca_pessoas: request.body.raca_pessoas,
        status: request.body.status,
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorPost,
        identificadorCoordenador: coordinatorPost.id,
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
    console.log('Error coordinators ', error);
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

const CoordinatorsPut = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorPut = await coordinators.update({
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_coordenador_id: request.body.pais_autor_id,
        numero_cpf: request.body.numero_cpf,
        sexo_pessoas: request.body.sexo_pessoas,
        raca_pessoas: request.body.raca_pessoas,
        status: request.body.status,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorPut,
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
    console.log('Error coordinators ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetCoordinators = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const coordinatorsGet = await coordinators.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: coordinatorsGet,
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
    console.log('Error coordinators ', error);
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
  CoordinatorsPost,
  CoordinatorsPut,
  GetCoordinators,
};
