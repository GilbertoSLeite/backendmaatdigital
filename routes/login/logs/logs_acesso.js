module.exports = app => {

    const Logs_Logins = require('../../../model').logs_logins;
    const jwt = require('jsonwebtoken');
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken');
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let errorAuth;
    let successAuth;

    //Rota de inserção de dados
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
                const logs_logins_post = await Logs_Logins.create({
                    id: req.body.id,
                    usuario_tentativa: req.body.usuario_tentativa,
                    nome_pais: req.body.nome_pais,
                    nome_cidade: req.body.nome_cidade,
                    nome_estado: req.body.nome_estado,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    ip: req.body.ip,
                    data_tentativa: req.body.data_tentativa,
                });             
                res.status(200).send(JSON.stringify({
                    "full_data": logs_logins_post,
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
                const logs_logins_get = await Logs_Logins.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                }); 
                res.status(200).send(logs_logins_get); 
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
                    "status": false
                }));             
        };
    });

    //Criando rota de colheta de dados por identificador
    router.get('/:usuario_tentativa', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const logs_logins_get_usuario_tentativa = await Logs_Logins.findAll({
                    where: {
                        usuario_tentativa: req.params.usuario_tentativa
                    }
                }); 
                res.status(200).send(logs_logins_get_usuario_tentativa); 
            } else {
                res.status(401).send(JSON.stringify({
                        "messagem": 'Senha não foi reconhecida.'
                    }));                 
            };            
        } catch (error) {
            console.error(error);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));             
        };
    });

    //Criando API
    app.use('/maatdigital/logs_logins', router);
};