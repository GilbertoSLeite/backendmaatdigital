const getPostPutBookEditorGraduations = require('../../../../applications/businessRules/register/editor/businessRulesGraduationBookEditor');

const PostBookEditorGraduationsBook = async (request, response) => {
  try {
    return await getPostPutBookEditorGraduations.GraduationsBookEditorPost(request, response);
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

const DelBookEditorGraduations = async (request, response) => {
  try {
    return await getPostPutBookEditorGraduations.GraduationsBookEditorDel(request, response);
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

const GetBookEditorGraduations = async (request, response) => {
  try {
    return await getPostPutBookEditorGraduations.GetGraduationsBookEditors(request, response);
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
  PostBookEditorGraduationsBook,
  DelBookEditorGraduations,
  GetBookEditorGraduations,
};
