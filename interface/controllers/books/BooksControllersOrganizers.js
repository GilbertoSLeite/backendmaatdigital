const getPostPutBooksOrganizers = require('../../../applications/businessRules/books/businessRulesBooksOrganizers');

const PostOrganizers = async (request, response) => {
  try {
    return getPostPutBooksOrganizers.BooksPostOrganizers(request, response);
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

const PutOrganizers = async (request, response) => {
  try {
    return getPostPutBooksOrganizers.BooksPutOrganizers(request, response);
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

const GetOrganizers = async (request, response) => {
  try {
    return getPostPutBooksOrganizers.BooksGetOrganizers(request, response);
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
  PostOrganizers,
  PutOrganizers,
  GetOrganizers,
};
