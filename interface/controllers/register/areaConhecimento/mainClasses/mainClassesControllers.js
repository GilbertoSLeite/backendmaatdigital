const getPostPutMainClasses = require('../../../../../applications/businessRules/register/areaConhecimento/mainClasses/businessRulesMainClasses');

const GetBooksMainClasses = async (request, response) => {
  try {
    return await getPostPutMainClasses.GetMainClassess(request, response);
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
  GetBooksMainClasses,
};
