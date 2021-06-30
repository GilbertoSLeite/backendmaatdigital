const getPostPutBooksRespEditorBook = require('../../../applications/businessRules/books/businessRulesBooksRespEditorBook');

const PostRespEditorBook = async (request, response) => {
  try {
    return getPostPutBooksRespEditorBook.BooksPostRespEditorBook(request, response);
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

const PutRespEditorBook = async (request, response) => {
  try {
    return getPostPutBooksRespEditorBook.BooksPutRespEditorBook(request, response);
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

const GetRespEditorBook = async (request, response) => {
  try {
    return getPostPutBooksRespEditorBook.BooksGetRespEditorBook(request, response);
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
  PostRespEditorBook,
  PutRespEditorBook,
  GetRespEditorBook,
};
