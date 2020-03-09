const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users.controller')

const app = express();

app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/createUser', userController.createUser);

app.get('/user/:id', userController.getUser)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});