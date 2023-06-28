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
//Obtener todos los usuarios de la base de datos
export const postPaseo = async (req, res) => {
    try {
        // Validaciones de express-validator
        await body('autor').notEmpty().exists().isEmail().run(req);
        await body('titulo').notEmpty().exists().isString().run(req);
        await body('descripcion').notEmpty().exists().isString().run(req);
        await body('tipo').notEmpty().exists().isString().run(req);
        await body('estado').notEmpty().exists().isString().run(req);
        await body('hora_fin').notEmpty().exists().isString().run(req);
        await body('hora_inicio').notEmpty().exists().isString().run(req);
        await body('precio').notEmpty().exists().isString().run(req);
        await body('medio_de_pago').notEmpty().exists().isString().run(req);
        await body('paseador').notEmpty().exists().isObject().run(req);
        await body('perro').notEmpty().exists().isArray().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            message("Error en las validaciones", "danger");
             return res.status(400).json({ errors: errors.array() });
        }

        // Obtener fecha actual
        const fechaActual = new Date();
        // Obtener componentes de la fecha
        const year = fechaActual.getFullYear();
        const month = fechaActual.getMonth() + 1;
        const day = fechaActual.getDate();
        const hours = fechaActual.getHours();
        const minutes = fechaActual.getMinutes();
        const seconds = fechaActual.getSeconds();

        const paseo = {
            "id": `paseo${year}${month}${day}${hours}${minutes}${seconds}`,
            "autor": req.body.autor,
            "titulo": req.body.titulo,
            "descripcion": req.body.descripcion,
            "destino": {
                "_latitude":req.body.destino._latitude,
                "_longitude": req.body.destino._longitude
            },
            "tipo": req.body.tipo,
            "nombre_destino": req.body.nombre_destino,
            "estado": "programado",
            "hora_fin": req.body.hora_fin,
            "hora_inicio": req.body.hora_inicio,
            "precio": req.body.precio,
            "medio_de_pago": req.body.medio_de_pago,
            "paseador": req.body.paseador,
            "perro": req.body.perro
        }
        console.log(paseo.id);
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
        //const paseoId = req.params.id;
        
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
        
        // Validaciones de express-validator
        await body('autor').notEmpty().exists().isEmail().run(req);
        await body('titulo').notEmpty().exists().isString().run(req);
        await body('descripcion').notEmpty().exists().isString().run(req);
        await body('tipo').notEmpty().exists().isString().run(req);
        await body('estado').notEmpty().exists().isString().run(req);
        await body('hora_fin').notEmpty().exists().isString().run(req);
        await body('hora_inicio').notEmpty().exists().isString().run(req);
        await body('precio').notEmpty().exists().isString().run(req);
        await body('medio_de_pago').notEmpty().exists().isString().run(req);
        await body('paseador').notEmpty().exists().isObject().run(req);
        await body('perro').notEmpty().exists().isArray().run(req);

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            message("Error en las validaciones", "danger");
             return res.status(400).json({ errors: errors.array() });
        }
        // Declarar datos del usuario
        const paseo = {
            "descripcion": req.body.descripcionPaseo,
            "destino": {
                "_latitude":req.body.paseoLatitude,
                "_longitude": req.body.paseoLongitude,
            },
            "estado": req.body.estadoPaseo,
            "fecha": req.body.fechaPaseo,
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
        // Datos del usuario
        const paseo = { "id": req.params.id }

        // Declarar la colección
        const paseoRef = db.collection('paseo');

        // Declarar documento y borrarlo
        const result = await paseoRef.doc(paseo.id).delete();

        res.json(result);
        message("Se borro el paseo", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

export default postPaseo;