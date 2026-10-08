import express from 'express';
import {apiKeyMiddleware} from '../tools/index.js';
import {criarUsuarioFirebase} from '../tools/index.js';


const usersRouter = express.Router();


usersRouter.get('/',function(req, res, next) {
  res.send('Respondendo a rota /users');
});

usersRouter.post('/', 
  apiKeyMiddleware,
  function(req, res, next) {
    if(!req.body){
      res.status(400).send('Requisição inválida');
      return;
    }
    if (!req.body.email || !req.body.senha) {
      res.status(400).send('Requisição inválida');
      return;
    }
    criarUsuarioFirebase(req.body.email, req.body.senha);
    res.status(201);
    res.send('Usuário criado com sucesso!');
});

usersRouter.get('/you', 
  apiKeyMiddleware,
  function(req, res, next) {
  res.send('Eu sou o Backend:! ');
});


export {usersRouter};
