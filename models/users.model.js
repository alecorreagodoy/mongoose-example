const mongoose = require('mongoose');

const types = mongoose.Schema.Types;

const usersSchema = new mongoose.Schema({
    "_id": {
        type: types.ObjectId,
        require: true,
    }, 
    "username": {
        type: types.String,
        require: true,
        min: 3,
        max: 50
    },
    "email": {
        type: types.String,
        require: true,
        min: 5,
        max: 255
    },
    "password": {
        type: types.String,
        require: true
    }
})


module.exports = mongoose.model('Usuarios', usersSchema)