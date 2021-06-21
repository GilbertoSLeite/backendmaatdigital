const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = require('express').Router();
const Users = require('../../infrastructure/database').usuarios;
const TokenError = require('../../infrastructure/errorsHandling/tokenErro');

module.exports = (app) => {
  router.post('/', async (request, response) => {
    try {
      const usariosPost = await Users.findOne({
        where: {
          login: request.body.login,
        },
      });
      if (!usariosPost) {
        response.status(401).send({
          message: `Usuário ${request.body.login} não encontrado.`,
        });
      } else {
        bcrypt.compare(request.body.senha, usariosPost.senha, async (err, req) => {
          if (req && !err) {
            const token = jwt.sign({
              data: JSON.parse(JSON.stringify(usariosPost)),
            },
            'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=',
            {
              expiresIn: '2h',
            });
            jwt.verify(
              token,
              'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc=',
              (erro, data) => (erro ? TokenError[erro] : data),
            );
            response.send(JSON.stringify({
              status: Boolean(true),
              message: 'Sua senha foi validada.',
              token: `JWT ${token}`,
            }));
          } else {
            response.status(401).send(JSON.stringify({
              status: Boolean(false),
              message: 'Sua senha não foi validada. Favor verificar se está correto.',
              token: 'Não foi criado nenhum token para essa transição.',
            }));
          }
        });
      }
    } catch (error) {
      response.status(404).send(error);
    }
  });

  // Criando API
  app.use('/maatdigital/login', router);
};
