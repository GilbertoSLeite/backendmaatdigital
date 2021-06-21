const Sequelize = require('sequelize');

const dbConf = require('../config/db_config');

const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
  host: dbConf.HOST,
  dialect: dbConf.dialect,
  operatorsAliases: 0, // Ao invés de usar false ou true usar 0 ou 1
  pool: {
    max: dbConf.pool.max,
    min: dbConf.pool.min,
    acquire: dbConf.pool.acquire,
    idle: dbConf.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.logs_logins = require('./schema/login/logs/logs_logins')(sequelize, Sequelize);
db.usuarios = require('./schema/login/users/users')(sequelize, Sequelize);
db.paises = require('./schema/countries/countries')(sequelize, Sequelize);
db.autores = require('./schema/register/author/bookAuthor')(sequelize, Sequelize);
db.graduacoes_autores = require('./schema/register/author/graduationsAuthor')(sequelize, Sequelize);
db.coordenadores = require('./schema/register/coordinator/coordinatorBook')(sequelize, Sequelize);
db.graduacoes_coordenadores = require('./schema/register/coordinator/graduationsCoordinator')(sequelize, Sequelize);
db.capas = require('./schema/register/cover/bookCover')(sequelize, Sequelize);
db.graduacoes_capas = require('./schema/register/cover/graduationsCover')(sequelize, Sequelize);
db.diagramacoes = require('./schema/register/diagramming/diagrammingBook')(sequelize, Sequelize);
db.graduacoes_diagramadores = require('./schema/register/diagramming/graduationsDiagramming')(sequelize, Sequelize);
db.editores = require('./schema/register/editor/responsibleEditor')(sequelize, Sequelize);
db.graduacoes_editores = require('./schema/register/editor/graduationsResponsibleEditor')(sequelize, Sequelize);
db.organizadores = require('./schema/register/organizer/organizerBook')(sequelize, Sequelize);
db.graduacoes_organizadores = require('./schema/register/organizer/graduationsOrganizerBook')(sequelize, Sequelize);
db.editoras = require('./schema/register/publisher/publisher')(sequelize, Sequelize);
db.areas_conhecimentos = require('./schema/register/areaConhecimento/mainClasses/mainclasses')(sequelize, Sequelize);
db.subclasses_conhecimentos = require('./schema/register/areaConhecimento/subclasses/subclasses')(sequelize, Sequelize);
db.graduacoes = require('./schema/register/graduation/graduation')(sequelize, Sequelize);
db.livros = require('./schema/books/books')(sequelize, Sequelize);
db.autores_livros = require('./schema/books/bookAuthors')(sequelize, Sequelize);
db.visualizacoes_livros = require('./schema/books/bookCountView')(sequelize, Sequelize);
db.downloads_livros = require('./schema/books/bookCountDown')(sequelize, Sequelize);
db.capas_livros = require('./schema/books/bookCovers')(sequelize, Sequelize);
db.resp_capas_livros = require('./schema/books/bookRespCovers')(sequelize, Sequelize);
db.diagramadores_livros = require('./schema/books/bookDesigners')(sequelize, Sequelize);
db.editoras_livros = require('./schema/books/bookPublisher')(sequelize, Sequelize);
db.coordenadores_livros = require('./schema/books/coordinatorsBook')(sequelize, Sequelize);
db.organizadores_livros = require('./schema/books/organizersBook')(sequelize, Sequelize);
db.editores_responsaveis_livros = require('./schema/books/responsibleEditorsBook')(sequelize, Sequelize);

module.exports = db;
