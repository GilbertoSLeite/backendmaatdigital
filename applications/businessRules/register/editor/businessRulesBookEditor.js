const bookEditor = require('../../../../infrastructure/database').editores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const BookEditorPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const bookEditorPost = await bookEditor.create({
        id: request.body.id,
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_editor_id: request.body.pais_editor_id,
        numero_cpf: request.body.numero_cpf,
        sexo_pessoas: request.body.sexo_pessoas,
        raca_pessoas: request.body.raca_pessoas,
        status: request.body.status,
      });
      response.status(200).send(JSON.stringify({
        fullData: bookEditorPost,
        identificadorEditorLivro: bookEditorPost.id,
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
    console.log('Error bookEditor ', error);
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

const BookEditorPut = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const bookEditorPut = await bookEditor.update({
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_editor_id: request.body.pais_editor_id,
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
        fullData: bookEditorPut,
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
    console.log('Error bookEditor ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetBookEditor = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const bookEditorGet = await bookEditor.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: bookEditorGet,
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
    console.log('Error bookEditor ', error);
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
  BookEditorPost,
  BookEditorPut,
  GetBookEditor,
};
