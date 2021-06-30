const mainClasses = require('../../../../../infrastructure/database').areas_conhecimentos;
const ValidatingAuth = require('../../../../security/ValidatingAuthentication');
const getToken = require('../../../../security/GetToken');

let token;

const GetMainClassess = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const mainClassesGet = await mainClasses.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: mainClassesGet,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha ou Token não foram reconhecidos.',
      }));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('Error mainClasses ', error);
    response.status(404).send(JSON.stringify({
      status: Boolean(false),
      errorDetail: error.parent,
      errorFull: error,
      errorCode: response.statusCode,
      errorMessage: response.statusMessage,
    }));
  }
};

module.exports = {
  GetMainClassess,
};
