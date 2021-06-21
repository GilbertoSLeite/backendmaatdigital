module.exports = app => {

    const Users = require('../../../model').usuarios;
    const jwt = require('jsonwebtoken');
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken')
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let errorAuth;
    let successAuth;

    //Criando Rota de Criação de Dados
    router.post('/',
    passport.authenticate('jwt',{
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const usuario_post = await Users.create({
                    id: req.body.id,
                    nome_usuario: req.body.nome_usuario,
                    email: req.body.email ,
                    login: req.body.login ,
                    senha: req.body.senha ,
                    status: req.body.status ,        
                });               
                res.status(200).send(JSON.stringify({
                    "full_data": usuario_post,
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
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };        
    });

    //Criando Rota de Atualização de Dados
    router.put('/:id',
    passport.authenticate('jwt',{
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const usuario_put = await Users.update({
                    nome_usuario: req.body.nome_usuario,
                    email: req.body.email ,
                    login: req.body.login ,
                    senha: req.body.senha ,
                    status: req.body.status ,  
                },
                   {
                        where: {
                            id: req.params.id
                    }
                });               
                res.status(200).send(JSON.stringify({
                    "full_data": usuario_put,
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
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };        
    });

    //Criando rota de colheta de dados
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
                const usuarios_get = await Users.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                }); 
                res.status(200).send(usuarios_get); 
            } else {
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
                }));                  
            };            
        } catch (error) {
            console.error(error);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };
    });

    //Criando rota de colheta de dados por identificador
    router.get('/:email', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const usuarios_get_email = await Users.findAll({
                    where: {
                        email: req.params.email
                    }
                }); 
                res.status(200).send(usuarios_get_email); 
            } else {
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
                }));                  
            };            
        } catch (error) {
            console.error(error);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };
    });

    //Criando a API
    app.use('/maatdigital/usuarios', router);
};