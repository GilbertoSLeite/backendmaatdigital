const getPostPutCoversBook = require('../../../../applications/businessRules/register/cover/businessRulesBooksCovers');

const PostCoversBook = async (request, response) => {
  try {
    return await getPostPutCoversBook.CoversPost(request, response);
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

const PutCoversBook = async (request, response) => {
  try {
    return await getPostPutCoversBook.CoversPut(request, response);
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

const GetCoversBook = async (request, response) => {
  try {
    return await getPostPutCoversBook.GetCovers(request, response);
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
  PostCoversBook,
  PutCoversBook,
  GetCoversBook,
};
