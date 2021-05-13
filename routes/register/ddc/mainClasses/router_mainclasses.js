module.exports = app => {

    const Mainclasses = require('../../../../model').areas_conhecimentos;
    const jwt = require('jsonwebtoken');
    var router = require('express').Router();
    const passport = require('passport')
    require('../../../../config/passport')(passport);
    let getToken = require('../../../../config/getToken')
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let errorAuth;
    let successAuth;

    //Buscando todas as informações
    router.get('/', 
    passport.authenticate('jwt', {
        session: false
    }), async  function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {  
                const areas_conhecimentos_get = await Mainclasses.findAll({
                        order: [
                            ['id', 'ASC']
                        ]
                    });          
                res.status(200).send(areas_conhecimentos_get);  
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
                    "status": Boolean(false),
                }));                
            };           
        } catch (error) {
            console.log(req.statusCode);
            console.error(error);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };        
    });

    //Criando API
    app.use('/maatdigital/areaconhecimento', router);
};