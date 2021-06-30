const getPostPutOrganizersBooks = require('../../../../applications/businessRules/register/organizers/businessRulesOrganizersBooks');

const PostOrganizersBooks = async (request, response) => {
  try {
    return await getPostPutOrganizersBooks.OrganizersBooksPost(request, response);
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

const PutOrganizersBooks = async (request, response) => {
  try {
    return await getPostPutOrganizersBooks.OrganizersBooksPut(request, response);
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

const GetOrganizersBooks = async (request, response) => {
  try {
    return await getPostPutOrganizersBooks.GetOrganizersBooks(request, response);
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
  PostOrganizersBooks,
  PutOrganizersBooks,
  GetOrganizersBooks,
};
