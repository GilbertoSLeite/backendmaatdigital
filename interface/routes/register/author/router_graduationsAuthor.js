module.exports = app => {

    const GraduationsAuthor = require('../../../model').graduacoes_autores;
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
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
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
                console.error('Error: ',errorAuth)
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

    //Rota para Delete de Dados
    router.delete('/:autores_id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const graduacao_autores_delete = await GraduationsAuthor.destroy({
                    where: {
                            autores_id: req.params.autores_id
                        }
                });              
                res.status(200).send(JSON.stringify({
                    "full_data": graduacao_autores_delete,
                    "status": Boolean(true),
                }));
            } else {  
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
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

    //Rota para Busca de Dados
    router.get('/', 
    passport.authenticate('jwt', {
        session: false
    }),async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {          
                const graduacao_autores_get = await GraduationsAuthor.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });   
                res.status(200).send(graduacao_autores_get);
            } else {  
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
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

    //Rota para Busca de Dados
    router.get('/:autores_id', async function (req, res) {
        token = await getToken(req.headers);
        jwt.verify(token, mySecret, function (err, data) {
            (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
        });
        try {
            if (successAuth) {        
                const graduacao_autores_get = await GraduationsAuthor.findAll({
                    where: {
                            autores_id: req.params.autores_id
                        }
                });   
                res.status(200).send(graduacao_autores_get);
            } else {  
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
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
    app.use('/maatdigital/graduacao_autores', router);
};