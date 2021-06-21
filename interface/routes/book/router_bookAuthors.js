module.exports = app => {

    const jwt = require('jsonwebtoken');
    const BookAuthors = require('../../model').autores_livros
    let router = require('express').Router()
    const passport = require('passport')
    require('../../config/passport')(passport);
    let getToken = require('../../config/getToken')
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let typeError;
    let errorAuth;
    let successAuth;

    //Criando rota de inserção de dados
    router.post('/', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
    let mySecret = 'TFMgQ29uc3VsdG9yaWEgJiBTaXN0ZW1hcyBMVERBIERFU0RFIDIwMTc='
    let token;
    let typeError;
    let errorAuth;
    let successAuth;
            if (successAuth) {
                const authors_book_post = await BookAuthors.create({
                    id: req.body.id,
                    autor_id: req.body.autor_id, 
                    livro_id: req.body.livro_id,
                })
                res.status(200).send(JSON.stringify({
                    "full_data": authors_book_post,
                    "identificador_livro": authors_book_post.id,
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
            (error.name  ===  "SequelizeUniqueConstraintError") && (typeError = 'Já existe cadastro, ' + error.parent.constraint + ' não pode duplicar cadastro.')
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "tipo_error": typeError,
                    "status": false
                }));             
        };
    });

    //Criando rota de atualização de dados
    router.put('/:id', 
    passport.authenticate('jwt', {
        session: false
    }), async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const authors_book_put = await BookAuthors.update({
                    autor_id: req.body.autor_id, 
                    livro_id: req.body.livro_id,
                },{
                    where: {
                        id: req.params.id
                    }})
                res.status(200).send(JSON.stringify({
                    "full_data": authors_book_put,
                    "status": Boolean(true),
                }));
            }  else {  
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "messagem": 'Senha não foi reconhecida.'
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

    //Criando rota de recepção de informação 
    router.get('/', 
    passport.authenticate('jwt', {
        session: false
    }),async function (req, res) {
        try {
            token = await getToken(req.headers);
            jwt.verify(token, mySecret, function (err, data) {
                (data ? (successAuth = Boolean(true)) : ((errorAuth = err) || (successAuth = Boolean(false))))
            });
            if (successAuth) {
                const livro_get = await BookAuthors.findAll({
                order: [
                    ['id', 'ASC']
                ]
            }); 
            res.status(200).send(livro_get);  
            } else {
                console.error('Error: ',errorAuth)
                res.status(401).send(JSON.stringify({
                    "error": errorAuth,
                    "messagem": 'Senha ou Token não foi reconhecida.',
                    "status": Boolean(false),
                }));                 
            };          
        } catch (error) {
            console.error('Error: ', error);
            console.log(req.statusCode);
            res.status(404).send(JSON.stringify({
                    "full_erro": error,
                    "error_detalhado": error.parent,
                    "status": false
                }));            
        };
    });

    //Criando a API 
    app.use('/maatdigital/autores_livros', router);
}