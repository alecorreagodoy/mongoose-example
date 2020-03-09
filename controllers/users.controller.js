const mongoose = require('mongoose');
const Usuarios = require('../models/users.model')

//Conectarme a mongoose
mongoose.connect('mongodb://localhost:27017/nocoffee', {useNewUrlParser: true, useUnifiedTopology: true });

exports.createUser = (req, res) => {
    const data = {
        "_id": mongoose.Types.ObjectId(),
        "username": req.body.username,
        "email": req.body.email
    }
    const newUser = new Usuarios(data);
    newUser.save((error) => {
        if (error) throw error;
        res.send({"message": "Usuario guardado!"})
    })
}

exports.getUser = (req, res) => {
    const id = req.params.id;
    Usuarios.findById(id, (error, result) => {
        if (error) throw error;
        res.send(result)
    })
}