const getPostPutBooksRespCovers = require('../../../applications/businessRules/books/businessRulesBooksRespCovers');

const PostRespCovers = async (request, response) => {
  try {
    return getPostPutBooksRespCovers.BooksPostRespCovers(request, response);
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

const PutRespCovers = async (request, response) => {
  try {
    return getPostPutBooksRespCovers.BooksPutRespCovers(request, response);
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

const GetRespCovers = async (request, response) => {
  try {
    return getPostPutBooksRespCovers.BooksGetRespCovers(request, response);
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
  PostRespCovers,
  PutRespCovers,
  GetRespCovers,
};
