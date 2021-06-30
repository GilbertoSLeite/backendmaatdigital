const getPostUser = require('../../../applications/businessRules/auth/businessRulesChangePasswords');

module.exports = {
  UsersChangePassword(request, response) {
    return getPostUser.GetPostUsers(request, response);
  },
};
