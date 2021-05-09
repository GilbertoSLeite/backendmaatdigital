module.exports = app => {

    let router = require('express').Router();
    const Users = require('../../model').usuarios;
    let bcrypt = require('bcrypt');

    router.post('/', async function (req, res) {
        try {
            const usarios_post = await Users.findOne({
                where: {
                        login: req.body.login
                    },                
                });                
            if (!usarios_post) {
                res.status(401).send({
                    message: 'Login ' + req.body.login + ' não encontrado.',
                    });
            }else{
                bcrypt.compare(req.body.senha, usarios_post.senha, function (err, req) {
                    if (req && !err) {
                        res.send(Boolean(true))
                    } else {
                        res.send(Boolean(false))
                    };
                });
            };            
        } catch (error) {
            console.log(error);
            res.status(400).send('Ocorreu erro changePassaword: ' + error);
        };                  
    });

    app.use('/maatdigital/changepassword', router);

}