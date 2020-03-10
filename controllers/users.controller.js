const mongoose = require('mongoose');
const Usuarios = require('../models/users.model')
const bcrypt = require('bcrypt');

//Conectarme a mongoose
mongoose.connect('mongodb://localhost:27017/nocoffee', { useNewUrlParser: true, useUnifiedTopology: true });

exports.createUser = (req, res) => {
    bcrypt.hash(
        req.body.password,
        14,
        (error, hash) => {
            if (error) throw error;
            const data = {
                "username": req.body.username,
                "password": hash,
                "email": req.body.email,
                "_id": mongoose.Types.ObjectId()
            }
            const newUser = new Usuarios(data);
            newUser.save((error, result) => {
                if (error) throw error;
                res.send({ "message": "Ok usuario creado!", "_id": result._id })
            })
        }
    )
}

exports.getUser = (req, res) => {
    const id = req.params.id;
    Usuarios.findById(id, (error, result) => {
        if (error) throw error;
        res.send(result)
    })
}

exports.updateUser = (req, res) => {
    const data = {
        "_id": req.body._id,
        "username": req.body.username,
        "email": req.body.email
    }
    Usuarios.findByIdAndUpdate(
        req.body._id,
        {
            $set: data
        },
        (error, result) => {
            if (error) throw error;
            res.send({ "message": "Ok usuario actualizado" })
        }
    )
}

exports.deleteUser = (req, res) => {
    const _id = req.params.id;
    Usuarios.findByIdAndDelete(_id, (error, result) => {
        if (error) throw error;
        res.send({ "message": "Ok usuario borrado" })
    })
}