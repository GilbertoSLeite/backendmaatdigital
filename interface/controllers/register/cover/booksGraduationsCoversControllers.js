const getPostPutCoversGraduations = require('../../../../applications/businessRules/register/cover/businessRulesBooksGraduationsCovers');

const PostCoversGraduationsBook = async (request, response) => {
  try {
    return await getPostPutCoversGraduations.GetGraduationsCoverss(request, response);
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

const DelCoversGraduations = async (request, response) => {
  try {
    return await getPostPutCoversGraduations.GraduationsCoversDel(request, response);
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

const GetCoversGraduations = async (request, response) => {
  try {
    return await getPostPutCoversGraduations.GetGraduationsCoverss(request, response);
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
  PostCoversGraduationsBook,
  DelCoversGraduations,
  GetCoversGraduations,
};
