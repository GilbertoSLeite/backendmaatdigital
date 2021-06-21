const router = require('express').Router();
const bcrypt = require('bcrypt');
const Users = require('../../infrastructure/database').usuarios;

module.exports = (app) => {
  router.post('/', async (request, response) => {
    try {
      const usuariosPost = await Users.findOne({
        where: {
          login: request.body.login,
        },
      });
      if (!usuariosPost) {
        response.status(401).send({
          message: `Login ${request.body.login} não encontrado.`,
        });
      } else {
        bcrypt.compare(request.body.senha, usuariosPost.senha, (err, req) => {
          if (req && !err) {
            response.send(Boolean(true));
          } else {
            response.send(Boolean(false));
          }
        });
      }
    } catch (error) {
      response.status(400).send(`Ocorreu erro changePassaword: ${error}`);
    }
  });

  app.use('/maatdigital/changepassword', router);
};
