import message from '../config/message';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { initFirebase } from '../config/database/firebase';
const db = require('../config/database/firebase');
var admin = require("firebase-admin");
import jwt from "jsonwebtoken";

// Inicializar Firebase
initFirebase;

// R
//Obtener todos los usuarios de la base de datos
export const getPerros = async (req, res) => {
    try {
        const dog = {id: req.params.id}
        // Declarar colección
        const result = db.collection('usuario').doc(dog.id).get();
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
            res.json("El usuario " + id + " no existe");
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
        // Declarar datos del usuario
        const user = {
            "id": req.body.id,
            "nombre": req.body.nombre,
            "apellidos": req.body.apellidos,
            "municipio": req.body.municipio,
            "direccion": req.body.direccion,
            "telefono": req.body.telefono,
            "edad": req.body.edad,
            "pais": req.body.pais
        }

        // Declarar collección
        const usuariosRef = db.collection('usuario');

        // Declarar documento y actualizar los campos con los datos del usuario
        const result = await usuariosRef.doc(user.id).update({
            nombre: user.nombre,
            apellidos: user.apellidos,
            municipio: user.municipio,
            direccion: user.direccion,
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

//TODO: Terminar las funciones de añadir y borrar perros del usuario
// Añadir perros al usuario
export const addDog = async (req, res) => {
    try {
        // Declarar datos del usuario
        const dog = {
            "id": req.body.id,
            "perros": {
                "nombre": req.body.nombre,
                "peso": req.body.nombre_peso,
                "raza": req.body.nombre_raza,
            //    "img": req.body.nombre_perro,
                "estatura": req.body.nombre_estatura,
                "comportamiento": req.body.nombre_comportamiento,
                "vacunas": req.body.nombre_vacunas,
            }
        }

        // Declarar collecciónes
        const perroRef = db.collection('usuario');

        // Declarar documento y actualizar los campos con los datos del usuario
        // perros: db.FieldValue.arrayUnion(user.perros),
        const result = await perroRef.doc(dog.id).update({
            perros: dog.perros
        });

        res.json(result);
        message("Exito", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

export default getPerros;