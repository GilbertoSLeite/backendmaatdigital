const getPostPutDiagrammingBook = require('../../../../applications/businessRules/register/diagramming/businessRulesDiagrammingsBooks');

const PostDiagrammingBook = async (request, response) => {
  try {
    return await getPostPutDiagrammingBook.DiagrammingPost(request, response);
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

const PutDiagrammingBook = async (request, response) => {
  try {
    return await getPostPutDiagrammingBook.DiagrammingPut(request, response);
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

const GetDiagrammingBook = async (request, response) => {
  try {
    return await getPostPutDiagrammingBook.GetDiagramming(request, response);
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
  PostDiagrammingBook,
  PutDiagrammingBook,
  GetDiagrammingBook,
};
