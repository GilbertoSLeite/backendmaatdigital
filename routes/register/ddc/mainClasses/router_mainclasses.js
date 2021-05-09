module.exports = app => {

    const Mainclasses = require('../../../../model').areas_conhecimentos;
    var router = require('express').Router();

    //Buscando todas as informações
    router.get('/', async  function (req, res) {
        try {
            const areas_conhecimentos_get = await Mainclasses.findAll({
                    order: [
                        ['id', 'ASC']
                    ]
                });          
            res.status(200).send(areas_conhecimentos_get);             
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