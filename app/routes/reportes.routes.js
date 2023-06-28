import { Router } from "express";
import * as reportesController from "../controllers/reportes.controller";

const router = Router();

// C POST

// CREAR UN REPORTE 
router.post('/Reporte/', /*paseosController.isValidToken,*/ reportesController.postReporte);

// R GET

// TRAER TODOS LOS REPORTES
router.get('/Reporte', /*paseosController.isValidToken,*/ reportesController.getTodosReporte);

// TRAER UN PASEO REPORTE ESPECIFICO
router.get('/Reporte/:id', /*paseosController.isValidToken,*/ reportesController.getReporte);

// D DELETE

// BORRAR UN REPORTE
router.delete('/Reporte/:id', /*paseosController.isValidToken,*/ reportesController.deleteReporte);

export default router;