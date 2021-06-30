const diagramming = require('../../../../infrastructure/database').diagramacoes;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const DiagrammingPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingPost = await diagramming.create({
        id: request.body.id,
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_diagramador_id: request.body.pais_diagramador_id,
        numero_cpf: request.body.numero_cpf,
        sexo_pessoas: request.body.sexo_pessoas,
        raca_pessoas: request.body.raca_pessoas,
        status: request.body.status,
      });
      response.status(200).send(JSON.stringify({
        fullData: diagrammingPost,
        identificadorDiagramador: diagrammingPost.id,
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
    console.log('Error diagramming ', error);
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

const DiagrammingPut = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingPut = await diagramming.update({
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_diagramador_id: request.body.pais_diagramador_id,
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
        fullData: diagrammingPut,
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
    console.log('Error diagramming ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetDiagramming = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const diagrammingGet = await diagramming.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: diagrammingGet,
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
    console.log('Error diagramming ', error);
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
  DiagrammingPost,
  DiagrammingPut,
  GetDiagramming,
};
