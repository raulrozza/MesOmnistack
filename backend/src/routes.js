const express = require('express');

// Adicionar apenas após o controller estar pronto
const AnswerController = require('./Controllers/AnswerController');
const RoomController = require('./Controllers/RoomController');

const routes = express.Router();

// Quinta
routes.delete('/room/:id', RoomController.destroy);
// Terceira
routes.get('/room/:id', RoomController.show);
// Segunda
routes.get('/rooms', RoomController.index);
// Primeira rota
routes.post('/room', RoomController.store);
// Quarta
routes.put('/room/:id', RoomController.update);

//Última
routes.post('/answer', AnswerController.store);

module.exports = routes;