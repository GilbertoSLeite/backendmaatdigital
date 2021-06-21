const tokenError = {
  TokenExpiredError: 'Seu token expirou. Por favor efetuar novo login',
  JsonWebTokenError: 'Pode ter ocorrido erro com o token malformado, requisição de assinatura ou assintarua inválida.',
  NotBeforeError: 'Token não esta mais ativo.',
};

module.exports = tokenError;
