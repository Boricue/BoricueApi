import { Router } from "express";
import * as InformesController from "../controllers/informes.controller";

const router = Router();

// C POST

// CREAR UN INFORME/SUGERENCIA 
router.post('/Informe/', /*paseosController.isValidToken,*/ InformesController.postInforme);

// R GET

// TRAER TODOS LOS INFORMES/SUGERENCIAS 
router.get('/Informe', /*paseosController.isValidToken,*/ InformesController.getTodosInforme);

// TRAER UN INFORME/SUGERENCIA ESPECIFICO
router.get('/Informe/:id', /*paseosController.isValidToken,*/ InformesController.getInforme);

// D DELETE

// BORRAR UN INFORME/SUGERENCIA 
router.delete('/Informe/:id', /*paseosController.isValidToken,*/ InformesController.deleteInforme);

export default router;