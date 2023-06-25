import { Router } from "express";
import * as paseosController from "../controllers/paseos.controller";

const router = Router();

// C POST

// CREAR UN PASEO 
router.post('/paseo/', /*paseosController.isValidToken,*/ paseosController.postPaseo);

// R GET

// TRAER TODOS LOS PASEOS
router.get('/paseo', /*paseosController.isValidToken,*/ paseosController.getTodosPaseos);

// TRAER UN PASEO ESPECIFICO
router.get('/paseo/:id', /*paseosController.isValidToken,*/ paseosController.getPaseo);

// U PUT

// MODIFICAR UN PASEO
router.put('/paseo/:id', /*paseosController.isValidToken,*/ paseosController.updatePaseo);

// D DELETE

// BORRAR UN PASEO
router.delete('/paseo/:id', /*paseosController.isValidToken,*/ paseosController.deletePaseo);

export default router;