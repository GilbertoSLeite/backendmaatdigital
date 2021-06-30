const getPostPutGraduations = require('../../../../applications/businessRules/register/graduations/businessRulesGraduations');

const PostGraduations = async (request, response) => {
  try {
    return await getPostPutGraduations.GraduationsPost(request, response);
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

const PutGraduations = async (request, response) => {
  try {
    return await getPostPutGraduations.GraduationsPut(request, response);
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

const GetGraduations = async (request, response) => {
  try {
    return await getPostPutGraduations.GetGraduations(request, response);
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
  PostGraduations,
  PutGraduations,
  GetGraduations,
};
