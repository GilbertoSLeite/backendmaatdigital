module.exports = app => {

    const BookAuthor = require('../../../model/').autores;
    const jwt = require('jsonwebtoken');
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken')
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
                const autores_post = await BookAuthor.create({
                    id: req.body.id,
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_autor_id: req.body.pais_autor_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": autores_post,
                    "identificador_autor": autores_post.id,
                    "status": Boolean(true),
                }));
            } else {
                console.log('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
                    "status": Boolean(false),
                }));               
            };
        } catch (error) {
            console.log(error);
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
                const autores_put = await BookAuthor.update({
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_autor_id: req.body.pais_autor_id,
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
                    "full_data": autores_put,
                    "status": Boolean(true),
                }));
            } else {
                console.log('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
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
    }),async function (req, res) {
        try {
            token = await getToken(req.headers)        
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            })
            if (successAuth) {         
            const autores_get = await BookAuthor.findAll({
                order: [
                    ['id', 'ASC']
                ]
            })
            res.status(200).send(autores_get);  
            } else {
                console.log('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
                    "status": Boolean(false),
                }));                 
            }; 
        } catch (error) {
            console.log(error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));                
        };
    });

     //Rota para Busca de Dados
    router.get('/:primeiro_nome_pessoa', 
    passport.authenticate('jwt', {
        session: false
    }),async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {      
            const autores_get_nome = await BookAuthor.findOne({
                where: {
                    primeiro_nome_pessoa: req.params.primeiro_nome_pessoa
                }
            });   
            res.status(200).send(autores_get_nome);  
            } else {
                console.log('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
                    "status": Boolean(false),
                }));                 
            }; 
        } catch (error) {
            console.log(error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));                
        };
    });

    //Criando API
    app.use('/maatdigital/autores', router);
};