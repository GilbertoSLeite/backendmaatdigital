const booksCoordinators = require('../../../infrastructure/database').coordenadores_livros;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const BooksPostCoordinators = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPostCoordinators = await booksCoordinators.create({
        id: request.body.id,
        coordenador_id: request.body.coordenador_id,
        livro_id: request.body.livro_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPostCoordinators,
        identificadorCoordenadorLivro: booksPostCoordinators.id,
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
    console.log('Error booksCoordinators ', error);
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

const BooksPutCoordinators = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPutCoordinators = await booksCoordinators.update({
        coordenador_id: request.body.coordenador_id,
        livro_id: request.body.livro_id,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPutCoordinators,
        identificadorCoordenadorLivro: booksPutCoordinators.id,
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
    console.log('Error booksCoordinators ', error);
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

const BooksGetCoordinators = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksGetCoordinators = await booksCoordinators.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: booksGetCoordinators,
        identificadorCoordenadorLivro: booksGetCoordinators.id,
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
    console.log('Error booksCoordinators ', error);
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
  BooksPostCoordinators,
  BooksPutCoordinators,
  BooksGetCoordinators,
};
