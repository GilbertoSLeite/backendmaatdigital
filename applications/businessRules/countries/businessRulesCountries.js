const countries = require('../../../infrastructure/database').paises;
const ValidatingAuth = require('../../security/ValidatingAuthentication');
const getToken = require('../../security/GetToken');

let token;

const GetCountries = async (request, response) => {
  try {
    token = await getToken(request.headers);
    const auth = ValidatingAuth(token);
    if (auth) {
      const paisGet = await countries.findAll({
        order: [
          ['id', 'ASC'],
        ],
      });
      response.status(200).send(JSON.stringify({
        fullData: paisGet,
        status: Boolean(true),
      }));
    } else {
      response.status(401).send(JSON.stringify({
        status: Boolean(false),
        messagem: 'Senha não foi reconhecida.',
      }));
    }
  } catch (error) {
    response.status(404).send(JSON.stringify({
      error: error.parent,
    }));
  }
};

module.exports = {
  GetCountries,
};
