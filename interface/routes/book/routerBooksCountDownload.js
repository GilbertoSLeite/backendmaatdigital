const router = require('express').Router();

const BooksCountDownloadsControllers = require('../../controllers/books/BooksControllersCountDownload');

module.exports = (app) => {
  router.post('/', BooksCountDownloadsControllers.PostCountDownloads);
  router.put('/:id', BooksCountDownloadsControllers.PutCountDownloads);
  router.get('/', BooksCountDownloadsControllers.GetCountDownloads);

  // Criando API
  app.use('/maatdigital/downloads_livros', router);
};
