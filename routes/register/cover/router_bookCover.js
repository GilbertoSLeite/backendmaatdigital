module.exports = app => {

    const CoverBook = require('../../../model').capas;
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
                const capas_post = await  CoverBook.create({
                    id: req.body.id,
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_capa_id: req.body.pais_capa_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                });
                res.status(200).send(JSON.stringify({
                    "full_data": capas_post,
                    "identificador_capa": CoverBook.id,
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
                const capas_put = await  CoverBook.update({
                    data_cadastro: req.body.data_cadastro,
                    primeiro_nome_pessoa: req.body.primeiro_nome_pessoa,
                    segundo_nome_pessoa: req.body.segundo_nome_pessoa,
                    ultimo_nome_pessoa: req.body.ultimo_nome_pessoa,
                    pais_capa_id: req.body.pais_capa_id,
                    numero_cpf: req.body.numero_cpf,
                    sexo_pessoas: req.body.sexo_pessoas,
                    raca_pessoas: req.body.raca_pessoas,
                    status: req.body.status,
                },{
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).send(JSON.stringify({
                    "full_data": capas_put,
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

    //Rota para Busca de Dados
    router.get('/', async function (req, res) {
        try {            
            const capas_get = await CoverBook.findAll({
                order: [
                    ['id', 'ASC']
                ]
            });   
            res.status(200).send(capas_get);
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
    app.use('/maatdigital/resp_capas', router);
};