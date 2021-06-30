const subClasses = require('../../../../../infrastructure/database').subclasses_conhecimentos;
const ValidatingAuth = require('../../../../security/ValidatingAuthentication');
const getToken = require('../../../../security/GetToken');

let token;

const GetSubClasses = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const subClassesGet = await subClasses.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: subClassesGet,
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
    console.log('Error subClasses ', error);
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
  GetSubClasses,
};
