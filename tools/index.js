import { firebaseAuth } from "../tools/firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";


function apiKeyMiddleware(req, res, next) {
  let apiKey = req.headers['api_key'];
  if (!apiKey || apiKey !== '123') {
    res.status(401).send('API key inválida');
    return;
  }
  next();
}

function criarUsuarioFirebase (email, senha) {
  createUserWithEmailAndPassword(firebaseAuth, email, senha)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}


export {apiKeyMiddleware, criarUsuarioFirebase};