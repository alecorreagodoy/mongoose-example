const express = require('express');
const bodyParser = require('body-parser');
const userController = require('./controllers/users.controller')
const cookieParser = require('cookie-parser');
const authController = require('./controllers/auth.controller')

const app = express();

//helmet
app.use(bodyParser.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/createUser', userController.createUser);

app.get('/user/:id', userController.getUser);

app.put('/changeUser', userController.updateUser);

app.delete('/delete/:id', userController.deleteUser);

app.post('/login', authController.login)

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});