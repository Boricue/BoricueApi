import { Router } from "express";
import * as userController from "../controllers/paseos.controller";

const router = Router();

// C POST

// CREAR UN PASEO 
router.post('/paseo/', /*userController.isValidToken,*/ userController.postPaseo);

// R GET

// TRAER TODOS LOS PASEOS
router.get('/paseo', /*userController.isValidToken,*/ userController.getTodosPaseos);

// TRAER UN PASEO ESPECIFICO
router.get('/paseo/:id', /*userController.isValidToken,*/ userController.getPaseo);

// U PUT

// MODIFICAR UN PASEO
router.put('/paseo/:id', /*userController.isValidToken,*/ userController.updatePaseo);

// D DELETE

// BORRAR UN PASEO
router.delete('/paseo/:id', /*userController.isValidToken,*/ userController.deletePaseo);

export default router;