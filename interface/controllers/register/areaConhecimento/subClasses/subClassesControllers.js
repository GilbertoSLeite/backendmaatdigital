const getPostPutSubClasses = require('../../../../../applications/businessRules/register/areaConhecimento/subClasses/businessRulesSubClasses');

const GetBooksSubClasses = async (request, response) => {
  try {
    return await getPostPutSubClasses.GetSubClasses(request, response);
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
  GetBooksSubClasses,
};
