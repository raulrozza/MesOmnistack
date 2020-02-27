const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Environment variables
const {port, MONGO_URL} = require('../config');

// Inserir só depois das rotas prontas
const routes = require('./routes.js');

const server = express();

// Try to connect with mongo and set up the server.
// Digitar sem o objeto dentro. Apenas após dar o warning, colocar os objs
mongoose.connect(MONGO_URL, { useUnifiedTopology: true, useNewUrlParser: true });

server.use(cors());

// Inserir após problemas de json na rota. Antes disso, não colocar
server.use(express.json());

// Criar rota get para o navegador, testar rota no insomnia. Então, criar o arquivo Routes

server.use(routes);


server.listen(port, () => console.log(`Server started on port ${port}`));