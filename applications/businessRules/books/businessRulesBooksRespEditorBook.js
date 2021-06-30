const booksRespEditorBook = require('../../../infrastructure/database').editores_responsaveis_livros;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const BooksPostRespEditorBook = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPostRespEditorBook = await booksRespEditorBook.create({
        id: request.body.id,
        livro_id: request.body.livro_id,
        editores_id: request.body.editores_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPostRespEditorBook,
        identificadorRespCapaLivro: booksPostRespEditorBook.id,
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
    console.log('Error booksRespEditorBook ', error);
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

const BooksPutRespEditorBook = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPutRespEditorBook = await booksRespEditorBook.update({
        livro_id: request.body.livro_id,
        editores_id: request.body.editores_id,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPutRespEditorBook,
        identificadorRespCapaLivro: booksPutRespEditorBook.id,
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
    console.log('Error booksRespEditorBook ', error);
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

const BooksGetRespEditorBook = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksGetRespEditorBook = await booksRespEditorBook.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: booksGetRespEditorBook,
        identificadorRespCapaLivro: booksGetRespEditorBook.id,
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
    console.log('Error booksRespEditorBook ', error);
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
  BooksPostRespEditorBook,
  BooksPutRespEditorBook,
  BooksGetRespEditorBook,
};
