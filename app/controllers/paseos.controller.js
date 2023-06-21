import message from '../config/message';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { initFirebase } from '../config/database/firebase';
const db = require('../config/database/firebase');
var admin = require("firebase-admin");
import jwt from "jsonwebtoken";

// Inicializar Firebase
initFirebase;

// C
//Obtener todos los usuarios de la base de datos
export const postPaseo = async (req, res) => {
    try {
        const paseo = {
            //"id": "",//
            "descripcion": req.body.descripcionPaseo,
            "destino": [

            ],
            "dueno": [

            ],
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": [

            ],
            "perro": [

            ],
            "precio": req.body.precioPaseo
        }

        //Declarar colección
        const paseoRef = db.collection('paseo');

        // Crear el documento, sus campos y llenarlos
        const result = await paseoRef.doc(paseo.tituloPaseo).set({
            nombre: user.nombre,
            apellidos: user.apellidos,
            calificacion_paseador: user.calificacion_paseador,
            calificacion_dueno: user.calificacion_dueno,
            municipio: user.municipio,
            direccion: user.direccion,
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
//Traer todos los paseos de la base de datos
export const getTodosPaseos = async (req, res) => {
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

//Traer un paseo de la base de datos
export const getPaseo = async (req, res) => {
    try {
        // Declarar datos del usuario
        const id = req.params.id ?? "none";
        // Declarar colección
        const result = db.collection('paseo').doc(id);
        const doc = await result.get();
        const data = doc.data();
        let jsonData = JSON.stringify(data);

        if (doc.exists) {
            res.json(JSON.parse(jsonData));
        } else {
            console.log('No existe este paseo: ' + id);
            res.json("El paseo " + id + " no existe");
        }

    } catch (error) {
        console.log(error);
        message(error.message, "danger");
        res.status(500);
    }
}

// U
//Modifica un paseo 
export const updatePaseo = async (req, res) => {
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

// D
//Borrar o cancelar un paseo
export const deletePaseo = async (req, res) => {
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

export default postPaseo;