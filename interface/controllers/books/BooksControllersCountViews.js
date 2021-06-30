const getPostPutBooksCountViews = require('../../../applications/businessRules/books/businessRulesBooksCountViews');

const PostCountViews = async (request, response) => {
  try {
    return getPostPutBooksCountViews.BooksPostCountViews(request, response);
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

const PutCountViews = async (request, response) => {
  try {
    return getPostPutBooksCountViews.BooksPutCountViews(request, response);
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

const GetCountViews = async (request, response) => {
  try {
    return getPostPutBooksCountViews.BooksGetCountViews(request, response);
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
  PostCountViews,
  PutCountViews,
  GetCountViews,
};
