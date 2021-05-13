const dbConf = require('../config/db_config');

const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConf.DB, dbConf.USER, dbConf.PASSWORD, {
    host: dbConf.HOST,
    dialect: dbConf.dialect,
    operatorsAliases: 0, //Ao invés de usar false ou true usar 0 ou 1
    pool: {
        max: dbConf.pool.max,
        min: dbConf.pool.min,
        acquire: dbConf.pool.acquire,
        idle: dbConf.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.logs_logins = require('./login/logs/logs_logins')(sequelize, Sequelize);
db.usuarios = require('./login/users/users')(sequelize, Sequelize);
db.paises = require('./countries/countries')(sequelize, Sequelize);
db.autores = require('./register/author/bookAuthor')(sequelize, Sequelize);
db.graduacoes_autores = require('./register/author/graduationsAuthor')(sequelize, Sequelize);
db.coordenadores = require('./register/coordinator/coordinatorBook')(sequelize, Sequelize);
db.graduacoes_coordenadores = require('./register/coordinator/graduationsCoordinator')(sequelize, Sequelize);
db.capas = require('./register/cover/bookCover')(sequelize, Sequelize);
db.graduacoes_capas = require('./register/cover/graduationsCover')(sequelize, Sequelize);
db.diagramacoes = require('./register/diagramming/diagrammingBook')(sequelize, Sequelize);
db.graduacoes_diagramadores = require('./register/diagramming/graduationsDiagramming')(sequelize, Sequelize);
db.editores = require('./register/editor/responsibleEditor')(sequelize, Sequelize);
db.graduacoes_editores = require('./register/editor/graduationsResponsibleEditor')(sequelize, Sequelize);
db.organizadores = require('./register/organizer/organizerBook')(sequelize, Sequelize);
db.graduacoes_organizadores = require('./register/organizer/graduationsOrganizerBook')(sequelize, Sequelize);
db.editoras = require('./register/publisher/publisher')(sequelize, Sequelize);
db.areas_conhecimentos = require('./register/ddc/mainClasses/mainclasses')(sequelize, Sequelize);
db.subclasses_conhecimentos = require('./register/ddc/subclasses/subclasses')(sequelize, Sequelize);
db.graduacoes = require('./register/graduation/graduation')(sequelize, Sequelize);
db.livros = require('./books/books')(sequelize, Sequelize);
db.autores_livros = require('./books/bookAuthors')(sequelize, Sequelize);
db.visualizacoes_livros = require('./books/bookCountView')(sequelize, Sequelize);
db.downloads_livros = require('./books/bookCountDown')(sequelize, Sequelize);
db.capas_livros = require('./books/bookCovers')(sequelize, Sequelize);
db.diagramadores_livros = require('./books/bookDesigners')(sequelize, Sequelize);
db.editoras_livros = require('./books/bookPublisher')(sequelize, Sequelize);
db.coordenadores_livros = require('./books/coordinatorsBook')(sequelize, Sequelize);
db.organizadores_livros = require('./books/organizersBook')(sequelize, Sequelize);
db.editores_responsaveis_livros = require('./books/responsibleEditorsBook')(sequelize, Sequelize);

module.exports = db;