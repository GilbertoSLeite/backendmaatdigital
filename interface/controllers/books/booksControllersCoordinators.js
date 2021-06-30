const getPostPutBooksCoordinators = require('../../../applications/businessRules/books/businessRulesBooksCoordinators');

const PostCoordinators = async (request, response) => {
  try {
    return getPostPutBooksCoordinators.BooksPostCoordinators(request, response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error: ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
      errorDetail: error.parent,
    }));
    return error;
  }
};

const PutCoordinators = async (request, response) => {
  try {
    return getPostPutBooksCoordinators.BooksPutCoordinators(request, response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error: ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
      errorDetail: error.parent,
    }));
    return error;
  }
};

const GetCoordinators = async (request, response) => {
  try {
    return getPostPutBooksCoordinators.BooksGetCoordinators(request, response);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error: ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
      errorDetail: error.parent,
    }));
    return error;
  }
};

module.exports = {
  PostCoordinators,
  PutCoordinators,
  GetCoordinators,
};
