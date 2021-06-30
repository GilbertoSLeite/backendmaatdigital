const getPostPutBooksDesigners = require('../../../applications/businessRules/books/businessRulesBooksDesigners');

const PostDesigners = async (request, response) => {
  try {
    return getPostPutBooksDesigners.BooksPostDesigners(request, response);
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

const PutDesigners = async (request, response) => {
  try {
    return getPostPutBooksDesigners.BooksPutDesigners(request, response);
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

const GetDesigners = async (request, response) => {
  try {
    return getPostPutBooksDesigners.BooksGetDesigners(request, response);
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
  PostDesigners,
  PutDesigners,
  GetDesigners,
};
