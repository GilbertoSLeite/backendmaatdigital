module.exports = app => {

    const Users = require('../../../model').usuarios;
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken');
    let token;

    //Criando rota de colheta de dados por identificador
    router.get('/:id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const usuarios_get_id = await Users.findAll({
                    where: {
                        id: req.params.id
                    }
                }); 
                res.status(200).send(usuarios_get_id); 
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
                    "status": Boolean(false)
                }));             
        };
    });

    //Criando a API
    app.use('/maatdigital/usuarios_id', router);
};