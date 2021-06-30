const getPostPutAuthorsGraduations = require('../../../../applications/businessRules/register/author/businessAuthorGraduations');

const PostAuthorsGraduationsBook = async (request, response) => {
  try {
    return await getPostPutAuthorsGraduations.GraduationsAuthorPost(request, response);
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

const DelAuthorsGraduations = async (request, response) => {
  try {
    return await getPostPutAuthorsGraduations.GraduationsAuthorDel(request, response);
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

const GetAuthorsGraduations = async (request, response) => {
  try {
    return await getPostPutAuthorsGraduations.GetGraduationsAuthors(request, response);
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
  PostAuthorsGraduationsBook,
  DelAuthorsGraduations,
  GetAuthorsGraduations,
};
