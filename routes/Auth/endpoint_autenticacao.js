module.exports = app => {

    const jwt = require('jsonwebtoken');
    const router = require('express').Router();
    const Users = require('../../model').usuarios;
    const bcrypt = require('bcrypt');

    router.post('/', async function (req, res) {
        try {
            const usarios_post = await Users.findOne({ 
                where: { 
                    login: req.body.login 
                    } 
                });
                if (!usarios_post) {
                    res.status(401).send({
                        message: 'Usuário ' + req.body.login + ' não encontrado.',
                    });                    
                } else { 
                    bcrypt.compare(req.body.senha, usarios_post.senha, function (err, req) {
                        if (req && !err) {
                            var token = jwt.sign(
                                JSON.parse(JSON.stringify(usarios_post)),
                                'nodeauthsecret',
                                { 
                                    expiresIn: 86400 * 30 
                                    }
                            );
                            jwt.verify(
                                token,
                                'nodeauthsecret',
                                function (err, data) {
                                    console.log((!err) ? '' : err, data);
                                });
                            res.send(JSON.stringify({
                                status: Boolean(true),
                                message: "Sua senha foi validada.",
                                token: 'JWT ' + token,
                            }));
                        } else {
                            res.status(401).send(JSON.stringify({
                                status: Boolean(false),
                                message: 'Sua senha não foi validada. Favor verificar se está correto.',
                                token: 'Não foi criado nenhum token para essa transição.',
                            }));
                        };
                    });                   
                };         
        } catch (error) {
            console.error(error);
            res.status(404).send(error);         
        };        
    });

    //Criando API
    app.use('/maatdigital/login', router);

}