const countries = require('../../../infrastructure/database').paises;

async function GetCountries(request, response) {
  try {
    const paisGet = await countries.findAll({
      order: [
        ['id', 'ASC'],
      ],
    });
    response.status(200).send(paisGet);
    return paisGet;
  } catch (error) {
    response.status(404).send(JSON.stringify({
      error: error.parent,
    }));
    return error;
  }
}

module.exports = {
  GetCountries,
};
