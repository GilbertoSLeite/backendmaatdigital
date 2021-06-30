const getPostPutDiagrammingGraduations = require('../../../../applications/businessRules/register/diagramming/businessRulesGraduationsDiagrammingsBooks');

const PostDiagrammingGraduationsBook = async (request, response) => {
  try {
    return await getPostPutDiagrammingGraduations.GetGraduationsDiagrammings(request, response);
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

const DelDiagrammingGraduations = async (request, response) => {
  try {
    return await getPostPutDiagrammingGraduations.GraduationsDiagrammingDel(request, response);
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

const GetDiagrammingGraduations = async (request, response) => {
  try {
    return await getPostPutDiagrammingGraduations.GetGraduationsDiagrammings(request, response);
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
  PostDiagrammingGraduationsBook,
  DelDiagrammingGraduations,
  GetDiagrammingGraduations,
};
