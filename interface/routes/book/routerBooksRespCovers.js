const router = require('express').Router();

const BooksRespCoversControllers = require('../../controllers/books/BooksControllersRespCovers');

module.exports = (app) => {
  router.post('/', BooksRespCoversControllers.PostRespCovers);
  router.put('/:id', BooksRespCoversControllers.PutRespCovers);
  router.get('/', BooksRespCoversControllers.GetRespCovers);

  // Criando API
  app.use('/maatdigital/resp_capas_livros', router);
};
