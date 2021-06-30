const booksCovers = require('../../../infrastructure/database').resp_capas_livros;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const BooksPostCovers = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPostCovers = await booksCovers.create({
        id: request.body.id,
        livro_id: request.body.livro_id,
        name_capas: request.body.name_capas,
        path_capas: request.body.path_capas,
        size_capas: request.body.size_capas,
        type_capas: request.body.type_capas,
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPostCovers,
        identificadorCapaLivro: booksPostCovers.id,
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
    console.log('Error booksCovers ', error);
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

const BooksPutCovers = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPutCovers = await booksCovers.update({
        livro_id: request.body.livro_id,
        name_capas: request.body.name_capas,
        path_capas: request.body.path_capas,
        size_capas: request.body.size_capas,
        type_capas: request.body.type_capas,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPutCovers,
        identificadorCapaLivro: booksPutCovers.id,
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
    console.log('Error booksCovers ', error);
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

const BooksGetCovers = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksGetCovers = await booksCovers.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: booksGetCovers,
        identificadorCapaLivro: booksGetCovers.id,
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
    console.log('Error booksCovers ', error);
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
  BooksPostCovers,
  BooksPutCovers,
  BooksGetCovers,
};
