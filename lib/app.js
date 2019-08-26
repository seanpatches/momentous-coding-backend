const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const db = require('./queries');
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());

app.get('/', (request, response) => {
  response.json({ info: 'WIP: Momentous Coding, social programming network' })
})

app.get('/users', db.getUsers);
app.get('/users/:id', db.getUserById);
app.post('/users', db.createUser);
app.put('/users/:id', db.updateUser);
app.delete('/users/:id', db.deleteUser);

module.exports = app;
