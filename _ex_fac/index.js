//https://expressjs.com/en/5x/starter/generator/

const express = require('express');
const app = express();
const port = 3000;
const clientes = [];

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.json('Bem-vindo a API de clientes');
});

app.post('/clientes', (req, res) => {
    let cli = req.body;
    cli.id = clientes.length+1;
    clientes.push(req.body);
    res.status(201).json(req.body);
});

app.get('/clientes', (req, res) => {
    res.json(clientes);
});

app.get('/clientes/:id', (req, res) => {
    let cli = clientes.find(c => c.id == req.params.id);
    if (!cli) {
        res.status(404).send('Cliente não existe');
    } else {
        res.json(cli);
    }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
