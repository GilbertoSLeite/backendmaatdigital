const getCountries = require('../../../applications/businessRules/countries/businessRulesCountries');

module.exports = {
  Countries(request, response) {
    return getCountries.GetCountries(request, response);
  },
};
