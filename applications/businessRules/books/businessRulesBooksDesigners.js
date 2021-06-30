const booksDesigners = require('../../../infrastructure/database').diagramadores_livros;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const BooksPostDesigners = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPostDesigners = await booksDesigners.create({
        id: request.body.id,
        livro_id: request.body.livro_id,
        diagramador_id: request.body.diagramador_id,
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPostDesigners,
        identificadorDiagramadorLivro: booksPostDesigners.id,
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
    console.log('Error booksDesigners ', error);
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

const BooksPutDesigners = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksPutDesigners = await booksDesigners.update({
        livro_id: request.body.livro_id,
        diagramador_id: request.body.diagramador_id,
      }, {
        where: {
          id: request.params.id,
        },
      });
      response.status(200).send(JSON.stringify({
        fullData: booksPutDesigners,
        identificadorDiagramadorLivro: booksPutDesigners.id,
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
    console.log('Error booksDesigners ', error);
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

const BooksGetDesigners = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const booksGetDesigners = await booksDesigners.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: booksGetDesigners,
        identificadorDiagramadorLivro: booksGetDesigners.id,
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
    console.log('Error booksDesigners ', error);
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
  BooksPostDesigners,
  BooksPutDesigners,
  BooksGetDesigners,
};
