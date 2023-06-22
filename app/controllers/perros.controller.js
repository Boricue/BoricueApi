import message from '../config/message';
import { arrayUnion, arrayRemove } from "firebase/firestore";
import { initFirebase } from '../config/database/firebase';
const db = require('../config/database/firebase');
var admin = require("firebase-admin");
import jwt from "jsonwebtoken";

// Inicializar Firebase
initFirebase;

//C
//añadir un perro al usuario
export const addPerro = async (req, res) => {
    try {
        // Declarar datos del usuario
        const paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude,
            },
            "dueno": {
                "id_dueno":req.body.duenoIdPaseo,
                "img_dueno":req.body.duenoImgPaseo,
                "nombre_dueno":req.body.duenoNombrePaseo,
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
                "id_paseador":req.body.paseadorIdPaseo,
                "img_paseador":req.body.paseadorImgPaseo,
                "nombre_paseador":req.body.paseadorNombrePaseo,
            },
            "perro": {
                "id_perro":req.body.perroIdPaseo,
                "img_perro":req.body.perroImgPaseo,
                "localizacion":req.body.perroLocalizacionPaseo,
                "nombre_perro":req.body.perroNombrePaseo,
            },
            "precio": req.body.precioPaseo
        }

        // Declarar colección
        const paseoRef  = db.collection('paseo');

        // Declarar documento y actualizar los campos con los datos del usuario
        const result = await paseoRef.doc(req.params.id).update(paseo);

        res.json(result);
        message("SI SE PUDO", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

//R
// Obtener un perro en particular del usuario
export const getPerro = async (req, res) => {
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

// Obtener todos los perros del usuario
export const getPerros = async (req, res) => {
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

//U
// Actualizar un perro del usuario

export const  updatePerros = async (req, res) => {
    try {
        // Declarar datos del usuario
        const paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude,
            },
            "dueno": {
                "id_dueno":req.body.duenoIdPaseo,
                "img_dueno":req.body.duenoImgPaseo,
                "nombre_dueno":req.body.duenoNombrePaseo,
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
                "id_paseador":req.body.paseadorIdPaseo,
                "img_paseador":req.body.paseadorImgPaseo,
                "nombre_paseador":req.body.paseadorNombrePaseo,
            },
            "perro": {
                "id_perro":req.body.perroIdPaseo,
                "img_perro":req.body.perroImgPaseo,
                "localizacion":req.body.perroLocalizacionPaseo,
                "nombre_perro":req.body.perroNombrePaseo,
            },
            "precio": req.body.precioPaseo
        }

        // Declarar colección
        const paseoRef  = db.collection('paseo');

        // Declarar documento y actualizar los campos con los datos del usuario
        const result = await paseoRef.doc(req.params.id).update(paseo);

        res.json(result);
        message("SI SE PUDO", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

//D
// Eliminar un perro del usuario

export const deletePerro = async (req, res) => {
    try {
        // Declarar datos del usuario
        const paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude,
            },
            "dueno": {
                "id_dueno":req.body.duenoIdPaseo,
                "img_dueno":req.body.duenoImgPaseo,
                "nombre_dueno":req.body.duenoNombrePaseo,
            },
            "estado": req.body.estadoPaseo,
            "hora_fin": req.body.horaFinPaseo,
            "hora_inicio": req.body.horaInicioPaseo,
            "medio_de_pago": req.body.medioPagoPaseo,
            "nombre_destino": req.body.nombreDestinoPaseo,
            "paseador": {
                "id_paseador":req.body.paseadorIdPaseo,
                "img_paseador":req.body.paseadorImgPaseo,
                "nombre_paseador":req.body.paseadorNombrePaseo,
            },
            "perro": {
                "id_perro":req.body.perroIdPaseo,
                "img_perro":req.body.perroImgPaseo,
                "localizacion":req.body.perroLocalizacionPaseo,
                "nombre_perro":req.body.perroNombrePaseo,
            },
            "precio": req.body.precioPaseo
        }

        // Declarar colección
        const paseoRef  = db.collection('paseo');

        // Declarar documento y actualizar los campos con los datos del usuario
        const result = await paseoRef.doc(req.params.id).update(paseo);

        res.json(result);
        message("SI SE PUDO", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

export default getPerros;