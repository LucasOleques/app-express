import express from 'express';
import {
  apiKeyMiddleware,
  criarUsuarioFirebase,
  loginUsuarioFirebase,
  validaSenhaUsuarioFirebase
} from '../tools/index.js';

const usersRouter = express.Router();


usersRouter.get('/',function(req, res, next) {
  res.send('Respondendo a rota /users');
});

usersRouter.post('/', 
  apiKeyMiddleware,
  function(req, res, next) {
    if(!req.body){
      res.status(400).send('Bad Request: Requisição inválida');
      return;
    }
    if (!req.body.email || !req.body.senha) {
      res.status(400).send('Bad Request: Requisição inválida');
      return;
    }
    criarUsuarioFirebase(req.body.email, req.body.senha);
    res.status(201);
    res.send('Usuário criado com sucesso!');
});

usersRouter.post('/login', 
  apiKeyMiddleware,
  async function(req, res, next) {
    if(!req.body){
      res.status(400).send('Bad Request: Requisição inválida');
      return;
    }
    if (!req.body.email || !req.body.senha) {
      res.status(400).send('Bad Request: Requisição inválida');
      return;
    }
    const senhaValida = await validaSenhaUsuarioFirebase(req.body.senha);
    if (!senhaValida.isValid) {
      res.status(401).send('Unauthorized: E-mail ou senha inválidos');
      return;
    }
    loginUsuarioFirebase(req.body.email, req.body.senha);
    res.status(200);
    res.send('Login realizado com sucesso!');
});

usersRouter.get('/you', 
  apiKeyMiddleware,
  function(req, res, next) {
  res.send('Eu sou o Backend:! ');
});


export {usersRouter};
