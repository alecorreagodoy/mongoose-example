
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/users.model')

exports.login = (req, res) => {
    //1. Encontrar al usuario por su ID
    Usuarios.findById(
        req.body._id,
        (error, user) => {
            if (error) throw error;
            //2. Comprobar su contraseña
            bcrypt.compare(
                req.body.password,
                user.password,
                (error, coincidence) => {
                    if (error) throw error;
                    //3. Si es correcta, ponerle el token
                    if (coincidence) {
                        jwt.sign(
                            {"username": user.username},
                            "MI-SUPER-INDESCIFRABLE-CONTRASEÑA",
                            (error, token) => {
                                if (error) throw error;
                                res.cookie("arcoiris", token);
                                res.send({"message": "Bienvenido/a!", "token": token})
                            }
                        )
                    } else {
                        //4. Si es incorrecta, adiós muy buenas
                        res.send({"error": "Contraseña incorrecta!"})
                    }
                }
            )
        }
    )

}