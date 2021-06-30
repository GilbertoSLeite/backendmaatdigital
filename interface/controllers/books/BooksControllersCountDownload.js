const getPostPutBooksCountDownloads = require('../../../applications/businessRules/books/businessRulesBooksCountDownload');

const PostCountDownloads = async (request, response) => {
  try {
    return getPostPutBooksCountDownloads.BooksPostCountDownloads(request, response);
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

const PutCountDownloads = async (request, response) => {
  try {
    return getPostPutBooksCountDownloads.BooksPutCountDownloads(request, response);
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

const GetCountDownloads = async (request, response) => {
  try {
    return getPostPutBooksCountDownloads.BooksGetCountDownloads(request, response);
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
  PostCountDownloads,
  PutCountDownloads,
  GetCountDownloads,
};
