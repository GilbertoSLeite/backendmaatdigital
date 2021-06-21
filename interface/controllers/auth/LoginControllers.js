const getUser = require('../../../applications/businessRules/auth/businessRulesLogin');

module.exports = {
  Users(request, response) {
    return getUser.GetUser(request, response);
  },
};
