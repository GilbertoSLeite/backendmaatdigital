module.exports = app => {

    const GraduationsAuthor = require('../../../model').graduacoes_autores;
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken');
    let token;
    let tipoErro;
    
    //Criando rotas de criação
    router.post('/',
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const graduacao_autores_post = await GraduationsAuthor.create({
                    id: req.body.id,
                    autores_id: req.body.autores_id,
                    graduacoes_id: req.body.graduacoes_id,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduacao_autores_post,
                    "status": Boolean(true),
                }));
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
                    "status": Boolean(false),
                }));                
            };
        } catch (error) {
            console.error(error);
            if (error.name  ===  "SequelizeUniqueConstraintError") {
                tipoErro = 'Já existe cadastro, ' + error.parent.constraint + ' não pode duplicar cadastro.'               
            }
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "tipo_error": tipoErro,
                    "status": false
                }));            
        };
    });

    //Criando a Rota de Atualização
    router.put('/:id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const graduacao_autores_put = await GraduationsAuthor.update({
                    autores_id: req.body.autores_id,
                    graduacoes_id: req.body.graduacoes_id,
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduacao_autores_put,
                    "status": Boolean(true),
                }));
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
                    "status": Boolean(false),
                }));                
            };
        } catch (error) {
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));              
        };
    });

    //Rota para Delete de Dados
    router.delete('/:autores_id', async function (req, res) {
        try {            
            const graduacao_autores_delete = await GraduationsAuthor.destroy({
                where: {
                        autores_id: req.params.autores_id
                    }
            });              
            res.status(200).send(JSON.stringify({
                "full_data": graduacao_autores_delete,
                "status": Boolean(true),
            }));
        } catch (error) {
            console.error(error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));                
        };
    });

    //Rota para Busca de Dados
    router.get('/', async function (req, res) {
        try {            
            const graduacao_autores_get = await GraduationsAuthor.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });   
            res.status(200).send(graduacao_autores_get);
        } catch (error) {
            console.error(error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));                
        };
    });

    //Rota para Busca de Dados
    router.get('/:autores_id', async function (req, res) {
        try {            
            const graduacao_autores_get = await GraduationsAuthor.findAll({
                where: {
                        autores_id: req.params.autores_id
                    }
            });   
            res.status(200).send(graduacao_autores_get);
        } catch (error) {
            console.error(error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));                
        };
    });

    //Criando API
    app.use('/maatdigital/graduacao_autores', router);
};