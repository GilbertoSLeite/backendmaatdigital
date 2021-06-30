const getPostPutCoordinatorsGraduations = require('../../../../applications/businessRules/register/coordinator/businessRulesCoordinatorsGraduations');

const PostCoordinatorsGraduationsBook = async (request, response) => {
  try {
    return await getPostPutCoordinatorsGraduations.GraduationsCoordinatorPost(request, response);
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

const DelCoordinatorsGraduations = async (request, response) => {
  try {
    return await getPostPutCoordinatorsGraduations.GraduationsCoordinatorDel(request, response);
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

const GetCoordinatorsGraduations = async (request, response) => {
  try {
    return await getPostPutCoordinatorsGraduations.GetGraduationsCoordinators(request, response);
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
  PostCoordinatorsGraduationsBook,
  DelCoordinatorsGraduations,
  GetCoordinatorsGraduations,
};
