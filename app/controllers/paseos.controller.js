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
            "id": "paseo" + Math.random(),
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
        const paseoRef = db.collection('paseo');

        // Crear el documento y llenar los campos
        const result = await paseoRef.doc(paseo.id).set(paseo);

        res.json(result);
        message("¡FUNCIONA!", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

// R
//Traer todos los paseos de la base de datos
export const getTodosPaseos = async (req, res) => {
    try {
        const paseoId = req.params.id;
        
        // Obtener la colección de paseos
        const paseosRef = db.collection('paseo');
        
        // Obtener todos los paseos
        const querySnapshot = await paseosRef.get();
        
        const data = [];
        
        // Recorrer los documentos y agregar los datos a la matriz 'data'
        querySnapshot.forEach((doc) => {
            data.push(doc.data());
        });
        
        res.json(data);
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

//Traer un paseo especifico de la base de datos
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