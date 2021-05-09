module.exports = app => {

    const Subclasses = require('../../../../model').subclasses_conhecimentos;
    var router = require('express').Router();

    //Buscando todas as informações
    router.get('/', async  function (req, res) {
        try {
            const subclasses_conhecimentos_get = await Subclasses.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });          
            res.status(200).send(subclasses_conhecimentos_get);             
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
    app.use('/maatdigital/subclasses_conhecimento', router);
};