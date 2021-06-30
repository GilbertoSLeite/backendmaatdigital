const booksPublisher = require('../../../infrastructure/database').editores_responsaveis_livros;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const BooksPostPublisher = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPostPublisher = await booksPublisher.create({
        id: request.body.id,
        livro_id: request.body.livro_id,
        editoras_id: request.body.editoras_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPostPublisher,
        identificadorEditoraLivro: booksPostPublisher.id,
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
    console.log('Error booksPublisher ', error);
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

const BooksPutPublisher = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPutPublisher = await booksPublisher.update({
        livro_id: request.body.livro_id,
        editoras_id: request.body.editoras_id,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPutPublisher,
        identificadorEditoraLivro: booksPutPublisher.id,
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
    console.log('Error booksPublisher ', error);
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

const BooksGetPublisher = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksGetPublisher = await booksPublisher.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: booksGetPublisher,
        identificadorEditoraLivro: booksGetPublisher.id,
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
    console.log('Error booksPublisher ', error);
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

module.exports = {
  BooksPostPublisher,
  BooksPutPublisher,
  BooksGetPublisher,
};
