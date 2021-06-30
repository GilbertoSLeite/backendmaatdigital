const router = require('express').Router();

const BooksRespEditorBookControllers = require('../../controllers/books/BooksControllersRespEditorBook');

module.exports = (app) => {
  router.post('/', BooksRespEditorBookControllers.PostRespEditorBook);
  router.put('/:id', BooksRespEditorBookControllers.PutRespEditorBook);
  router.get('/', BooksRespEditorBookControllers.GetRespEditorBook);

  // Criando API
  app.use('/maatdigital/editores_responsaveis_livros', router);
};
