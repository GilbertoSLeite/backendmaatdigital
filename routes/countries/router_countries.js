module.exports = app => {

    const Countries = require('../../model').paises;
    var router = require('express').Router();

    //Buscando todas as informações
    router.get('/', async  function (req, res) {
        try {
            const paises_get = await Countries.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });          
            res.status(200).send(paises_get);             
        } catch (error) {
            console.error(error);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": Boolean(false)
                }));             
        };        
    });

    //Criando API
    app.use('/maatdigital/paises', router);
};