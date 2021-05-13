module.exports = app => {

    const CoordinatorBook = require('../../../model').coordenadores;
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
                const coordenadores_post = await  CoordinatorBook.create({
                    id: req.body.id,
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_coordenador_id: req.body.pais_coordenador_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": coordenadores_post,
                    "identificador_coordenador": coordenadores_post.id,
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
                const coordenadores_put = await  CoordinatorBook.update({
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_coordenador_id: req.body.pais_coordenador_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": coordenadores_put,
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
    router.get('/', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {        
                const coordenadores_get = await CoordinatorBook.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });   
                res.status(200).send(coordenadores_get);
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
    app.use('/maatdigital/coordenadores', router);
};