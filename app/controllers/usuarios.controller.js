import message from '../config/message';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { initFirebase } from '../config/database/firebase';
const db = require('../config/database/firebase');
var admin = require("firebase-admin");
import jwt from "jsonwebtoken";
import { body, validationResult } from 'express-validator';

// Inicializar Firebase
initFirebase;

// C
// Registrar el nuevo usuario en la base de datos
export const createUserDb = async (req, res) => {
    try {
        // Validaciones de express-validator
        await body('id').notEmpty().exists().isEmail().run(req);
        await body('nombre').notEmpty().exists().isString().run(req);
        await body('municipio').notEmpty().exists().isString().run(req);
        await body('direccion').notEmpty().exists().isString().run(req);
        await body('paseoLatitude').notEmpty().exists().run(req);
        await body('paseoLongitude').notEmpty().exists().run(req);
        await body('telefono').notEmpty().exists().isMobilePhone().run(req);
        await body('edad').notEmpty().exists().isString().run(req);
        await body('pais').notEmpty().exists().isString().run(req);
    
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            message("Error en las validaciones", "danger");
             return res.status(400).json({ errors: errors.array() });
        }

        // Declarar datos del usuario
        const user = {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "ubicacion": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude
            },
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais,
            "perros": [],
            "chats": []
        }

        //Declarar colección
        const usuariosRef = db.collection('usuario');

        // Crear el documento, sus campos y llenarlos
        const result = await usuariosRef.doc(user.id).set({
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            ubicacion: user.ubicacion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais,
            perros: user.perros,
            chats: user.chats
        });

        res.json(result);
        message("Exito", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

// R
//Obtener todos los usuarios de la base de datos
export const getUsers = async (req, res) => {
    try {
        const result = db.collection('usuario').get();
        result.then((querySnapshot) => {
            const data = [];
            querySnapshot.forEach((doc) => {
                data.push(doc.data());
            });
            let jsonData = JSON.stringify(data);
            res.json(JSON.parse(jsonData));
        })
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}
// Obtener un usuario en particular de la base de datos
export const getUser = async (req, res) => {
    try {
        // Declarar datos del usuario
        const id = req.params.id ?? "none";
        // Declarar colección
        const result = db.collection('usuario').doc(id);
        const doc = await result.get();
        const data = doc.data();
        let jsonData = JSON.stringify(data);

        if (doc.exists) {
            res.json(JSON.parse(jsonData));
        } else {
            console.log('No existe este usuario: ' + id);
            res.json(false);
        }

    } catch (error) {
        console.log(error);
        message(error.message, "danger");
        res.status(500);
    }
}

// U
// Actualizar información del usuario
export const updateUser = async (req, res) => {
    try {
        
        // Validaciones de express-validator
        await body('nombre').notEmpty().exists().isString().run(req);
        await body('municipio').notEmpty().exists().isString().run(req);
        await body('direccion').notEmpty().exists().isString().run(req);
        await body('paseoLatitude').notEmpty().exists().run(req);
        await body('paseoLongitude').notEmpty().exists().run(req);
        await body('telefono').notEmpty().exists().isMobilePhone().run(req);
        await body('edad').notEmpty().exists().isString().run(req);
        await body('pais').notEmpty().exists().isString().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            message("Error en las validaciones", "danger");
             return res.status(400).json({ errors: errors.array() });
        }

        // Declarar datos del usuario
        const user = {
            "nombre": req.body.nombre,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "ubicacion": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude
            },
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais
        }

        // Declarar collección
        const usuariosRef = db.collection('usuario');

        // Declarar documento y actualizar los campos con los datos del usuario
        const result = await usuariosRef.doc(user.id).update({
            nombre: user.nombre,
            municipio: user.municipio,
            direccion: user.direccion,
            ubicacion: user.ubicacion,
            telefono: user.telefono,
            edad: user.edad,
            pais: user.pais
        });

        res.json(result);
        message("Exito", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

// D
export const deleteUser = async (req, res) => {
    try {
        // Datos del usuario
        const user = { "id": req.params.id }

        // Declarar la colección
        const usuariosRef = db.collection('usuario');

        // Declarar documento y borrarlo
        const result = await usuariosRef.doc(user.id).delete();

        res.json(result);
        message("Exito", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

/*export const isValidToken = (req, res, next) => {

    // const tokenClient = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub21icmUiOiJMVUlTIEJFQ0VSUlJBIiwiaWQiOiIxMDQyMzc2MjAxNDg2MTQ0MTA0NDQiLCJlbWFpbCI6ImVsaW5nZW5pZXJvcHJvZmVzb3JAZ21haWwuY29tIiwiaWF0IjoxNjgwMDQzMTQ1LCJleHAiOjE2ODAwNDY3NDV9.CN8oJ3L2Gbc4-HYf9-T2-zTFEyeTMDLe0y4bLAPmGlM";
    const tokenClient = req.cookies.eib_per;
    // console.log(req.cookie);
    try {
        jwt.verify(tokenClient, process.env.SECRET_KEY, (err, decoded) => {
            if (!err) {
                // res.send("todo bien");
                next();
            } else {
                res.send({ "error": "El token es errado o ha caducado " })
            }
            // console.log(err);
        })
    } catch (error) {
        res.send({ "error": "El token es errado o ha caducado " })
    }
}*/

export default createUserDb;