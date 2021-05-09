module.exports = app => {

    const GraduationsDiagramming = require('../../../model').graduacoes_diagramadores;
    let router = require('express').Router();
    const passport = require('passport');
    require('../../../config/passport')(passport);
    let getToken = require('../../../config/getToken');
    let token;
    let tipoErro;
    
    //Criando rotas de criação
    router.post('/',
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const graduacao_diagramadores_post = await  GraduationsDiagramming.create({
                    id: req.body.id,
                    diagramador_id: req.body.diagramador_id,
                    graduacoes_id: req.body.graduacoes_id,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduacao_diagramadores_post,
                    "status": Boolean(true),
                }));
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
                    "status": Boolean(false),
                }));                
            };
        } catch (error) {
            console.error(error);
            if (error.name  ===  "SequelizeUniqueConstraintError") {
                tipoErro = 'Já existe cadastro, ' + error.parent.constraint + ' não pode duplicar cadastro.'               
            }
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "tipo_error": tipoErro,
                    "status": false
                }));            
        };
    });

    //Criando a Rota de Atualização
    router.put('/:id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        token = await getToken(req.headers);
        try {
            if (token) {
                const graduacao_diagramadores_put = await  GraduationsDiagramming.update({
                    diagramador_id: req.body.diagramador_id,
                    graduacoes_id: req.body.graduacoes_id,
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": graduacao_diagramadores_put,
                    "status": Boolean(true),
                }));
            } else {
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.',
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
    router.delete('/:diagramador_id', async function (req, res) {
        try {            
            const graduacao_diagramadores_delete = await GraduationsDiagramming.destroy({
                where: {
                        diagramador_id: req.params.diagramador_id
                    }
            });              
            res.status(200).send(JSON.stringify({
                "full_data": graduacao_diagramadores_delete,
                "status": Boolean(true),
            }));
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
    router.get('/', async function (req, res) {
        try {            
            const graduacao_diagramadores_get = await GraduationsDiagramming.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });   
            res.status(200).send(graduacao_diagramadores_get);
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
    router.get('/:id', async function (req, res) {
        try {            
            const graduacao_diagramadores_get = await GraduationsDiagramming.findAll({
                where: {
                        id: req.params.id
                    }
            });   
            res.status(200).send(graduacao_diagramadores_get);
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
    app.use('/maatdigital/graduacao_diagramadores', router);
};