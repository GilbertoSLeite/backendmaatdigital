const getPostPutCoordinators = require('../../../../applications/businessRules/register/coordinator/businessRulesCoordinators');

const PostCoordinatorsBook = async (request, response) => {
  try {
    return await getPostPutCoordinators.CoordinatorsPost(request, response);
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
    return await getPostPutCoordinators.CoordinatorsPut(request, response);
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
    return await getPostPutCoordinators.GetCoordinators(request, response);
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
  PostCoordinatorsBook,
  PutCoordinators,
  GetCoordinators,
};
