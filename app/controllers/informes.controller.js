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
export const postInforme = async (req, res) => {
    try {
        const informe = {
            "id": "informe" + Math.floor(Math.random() * 99999999) + 1,
            "nombreCompleto": req.body.nombreCompletoInforme,
            "correoElectronico": req.body.correoInforme,
            "asunto": req.body.asuntoInforme,
            "descripcion": req.body.descripcionInforme,
        }
        // Declarar colección
        const informeRef = db.collection('informes');

        // Crear el documento y llenar los campos
        const result = await informeRef.doc(informe.id).set(informe);

        console.log(result);
        message("¡FUNCIONA!", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

// R
//Traer todos los paseos de la base de datos
export const getTodosInforme = async (req, res) => {
    try {       
        // Obtener la colección de paseos
        const informeRef = db.collection('informes');
        
        // Obtener todos los paseos
        const querySnapshot = await informeRef.get();
        
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
export const getInforme = async (req, res) => {
    try {
        // Declarar datos del usuario
        const id = req.params.id ?? "none";
        // Declarar colección
        const result = db.collection('informes').doc(id);
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

// D
//Borrar o cancelar un paseo
export const deleteInforme = async (req, res) => {
    try {
        // Datos del usuario
        const informe = { "id": req.params.id }

        // Declarar la colección
        const informeRef = db.collection('informes');

        // Declarar documento y borrarlo
        const result = await informeRef.doc(informe.id).delete();

        res.json(result);
        message("Se borro el informe", "success");
    } catch (error) {
        message(error.message, "danger");
        res.status(500);
    }
}

export default postInforme;