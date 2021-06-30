const gPPGraduationsOrganizersBooks = require('../../../../applications/businessRules/register/organizers/businessRulesGraduationsOrganizersBooks');

const PostGraduationsOrganizersBooksBook = async (request, response) => {
  try {
    return await gPPGraduationsOrganizersBooks.GraduationsOrganizersBooksPost(request, response);
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

const DelGraduationsOrganizersBooks = async (request, response) => {
  try {
    return await gPPGraduationsOrganizersBooks.GraduationsOrganizersBooksDel(request, response);
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

const GetGraduationsOrganizersBooks = async (request, response) => {
  try {
    return await gPPGraduationsOrganizersBooks.GetGraduationsOrganizersBooks(request, response);
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
  PostGraduationsOrganizersBooksBook,
  DelGraduationsOrganizersBooks,
  GetGraduationsOrganizersBooks,
};
