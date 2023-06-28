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
export const postReporte = async (req, res) => {
    try {
        const reporte = {
            "id": "reporte" + Math.floor(Math.random() * 99999999) + 1,
            "autorReporte": req.body.autorReporte,
            "reportado": req.body.reportado,
            "descripcionReporte": req.body.descripcionReporte,
        }
        // Declarar colección
        const reporteRef = db.collection('reportes');

        // Crear el documento y llenar los campos
        const result = await reporteRef.doc(reporte.id).set(reporte);

        console.log(result);
        message("¡FUNCIONA!", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

// R
//Traer todos los paseos de la base de datos
export const getTodosReporte = async (req, res) => {
    try {
        //const paseoId = req.params.id;
        
        // Obtener la colección de paseos
        const reporteRef = db.collection('reportes');
        
        // Obtener todos los paseos
        const querySnapshot = await reporteRef.get();
        
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
export const getReporte = async (req, res) => {
    try {
        // Declarar datos del usuario
        const id = req.params.id ?? "none";
        // Declarar colección
        const result = db.collection('reportes').doc(id);
        const doc = await result.get();
        const data = doc.data();
        let jsonData = JSON.stringify(data);

        if (doc.exists) {
            res.json(JSON.parse(jsonData));
        } else {
            console.log('No existe este reporte: ' + id);
            res.json("El reporte " + id + " no existe");
        }

    } catch (error) {
        console.log(error);
        message(error.message, "danger");
        res.status(500);
    }
}

// D
//Borrar o cancelar un paseo
export const deleteReporte = async (req, res) => {
    try {
        // Datos del usuario
        const reporte = { "id": req.params.id }

        // Declarar la colección
        const reporteRef = db.collection('reportes');

        // Declarar documento y borrarlo
        const result = await reporteRef.doc(reporte.id).delete();

        res.json(result);
        message("Se borro el reportes", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

export default postReporte;