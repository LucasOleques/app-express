import { firebaseAuth } from "../tools/firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  validatePassword
} from "firebase/auth";


function apiKeyMiddleware(req, res, next) {
  let apiKey = req.headers['api_key'];
  if (!apiKey || apiKey !== '123') {
    res.status(401).send('Unauthorized: API key inválida');
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

function loginUsuarioFirebase (email, senha){
  signInWithEmailAndPassword(firebaseAuth, email, senha)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });
}

async function validaSenhaUsuarioFirebase (senha) {
  const status = await validatePassword(firebaseAuth, senha);
  if (!status.isValid) {
    const needsLowerCase = status.containsLowercaseLetter !== true;
    return { isValid: false, needsLowerCase};
  }
  return { isValid: true };
}


export {
  apiKeyMiddleware,
  criarUsuarioFirebase,
  loginUsuarioFirebase,
  validaSenhaUsuarioFirebase
};