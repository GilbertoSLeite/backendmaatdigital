module.exports = app => {

    const ResponsibleEditor = require('../../../model').editores;
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
                const editores_post = await ResponsibleEditor.create({
                    id: req.body.id,
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_editor_id: req.body.pais_editor_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": editores_post,
                    "identificador_editor": editores_post.id,
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
                const editores_put = await ResponsibleEditor.update({
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_editor_id: req.body.pais_editor_id,
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
                    "full_data": editores_put,
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
                const editores_get = await ResponsibleEditor.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });   
                res.status(200).send(editores_get);
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
    app.use('/maatdigital/editores', router);
};