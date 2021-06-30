const authors = require('../../../../infrastructure/database').autores;
const ValidatingAuth = require('../../../security/ValidatingAuthentication');
const getToken = require('../../../security/GetToken');

let token;

const AuthorPost = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const authorPost = await authors.create({
        id: request.body.id,
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_autor_id: request.body.pais_autor_id,
        numero_cpf: request.body.numero_cpf,
        sexo_pessoas: request.body.sexo_pessoas,
        raca_pessoas: request.body.raca_pessoas,
        status: request.body.status,
      });
      response.status(200).send(JSON.stringify({
        fullData: authorPost,
        identificadorAutor: authorPost.id,
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
    console.log('Error authors ', error);
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

const AuthorPut = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const authorPut = await authors.update({
        data_cadastro: request.body.data_cadastro,
        primeiro_nome_pessoa: request.body.primeiro_nome_pessoa,
        segundo_nome_pessoa: request.body.segundo_nome_pessoa,
        ultimo_nome_pessoa: request.body.ultimo_nome_pessoa,
        pais_autor_id: request.body.pais_autor_id,
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
        fullData: authorPut,
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
    console.log('Error authors ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

const GetAuthors = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const authorsGet = await authors.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: authorsGet,
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
    console.log('Error authors ', error);
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
  AuthorPost,
  AuthorPut,
  GetAuthors,
};
