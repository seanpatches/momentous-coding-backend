const express = require('express');
const bodyParser = require('body-parser');
const app = express();

console.log(app.listen)

app.use(bodyParser.json());

app.get('/', (request, response) => {
  response.json({ info: 'Node.js, Express, and Postgres API' })
})

module.exports = app;
