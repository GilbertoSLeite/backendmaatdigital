module.exports = app => {

    const Publisher = require('../../../model').editoras;
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
                const editora_post = Publisher.create({
                    id: req.body.id,
                    data_cadastro: req.body.data_cadastro,
                    nome_editora: req.body.nome_editora,
                    ano_fundacao: req.body.ano_fundacao,
                    pais_sede_id: req.body.pais_sede_id,
                    website_editora: req.body.website_editora,
                    status: req.body.status,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": editora_post,
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
                const editora_put = Publisher.update({
                    data_cadastro: req.body.data_cadastro,
                    nome_editora: req.body.nome_editora,
                    ano_fundacao: req.body.ano_fundacao,
                    pais_sede_id: req.body.pais_sede_id,
                    website_editora: req.body.website_editora,
                    status: req.body.status,
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": editora_put,
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

    //Rota para Busca de Dados
    router.get('/', async function (req, res) {
        try {            
            const editora_get = await Publisher.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });   
            res.status(200).send(editora_get);
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
    router.get('/:nome_editora', async function (req, res) {
        try {            
            const editora_get_nome = await Publisher.findAll({
                where: {
                    nome_editora: req.params.nome_editora
                }
            });   
            res.status(200).send(editora_get_nome);
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
    app.use('/maatdigital/editoras', router);
};