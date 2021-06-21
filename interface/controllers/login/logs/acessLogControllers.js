const acessLog = require('../../../../applications/businessRules/login/logs/businessRulesLogAcess');

module.exports = {
  GetAcessLog(request, response) {
    return acessLog.GetLogsAcessGet(request, response);
  },
  PostAcessLog(request, response) {
    return acessLog.PostLogsAcessGet(request, response);
  },
};
