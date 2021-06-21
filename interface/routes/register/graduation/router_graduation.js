module.exports = app => {

    const Graduation = require('../../../model/').graduacoes
    const jwt = require('jsonwebtoken');
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken');
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let typeError;
    let errorAuth;
    let successAuth;
     
     //Criando rotas de criação
    router.post('/',
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {   
                const graduation_post = Graduation.create({
                    id: req.body.id,
                    nome_graduacao: req.body.nome_graduacao, 
                    sigla_graduacao: req.body.sigla_graduacao,                   
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduation_post,
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
                typeError = 'Já existe cadastro, ' + error.parent.constraint + ' não pode duplicar cadastro.'               
            }
            if(error.name === 'SequelizeValidationError'){
                typeError = 'Campo, ' + error.parent.constraint + ' não pode ser nulo no cadastro.'
            }
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "tipo_error": typeError,
                    "status": false
                }));            
        };
    });

    //Criando a Rota de Atualização
    router.put('/:id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {   
                const graduation_put = Graduation.update({
                    nome_graduacao: req.body.nome_graduacao, 
                    sigla_graduacao: req.body.sigla_graduacao, 
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduation_put,
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
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {            
                const graduation_get = await Graduation.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });   
                res.status(200).send(graduation_get);
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
                    "status": Boolean(false),
                }));                
            };
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
    app.use('/maatdigital/graduacao', router)
};