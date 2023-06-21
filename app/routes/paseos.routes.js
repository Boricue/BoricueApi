import { Router } from "express";
import * as userController from "../controllers/perros.controller";

const router = Router();

// R GET

// TRAER TODOS LOS PASEOS DEL USUARIO
router.get('/paseos/:id', /*userController.isValidToken,*/ userController.getPerros);

// TRAER UN PASEO ESPECIFICO DEL USUARIO
router.get('/paseos/:id,:paseo', /*userController.isValidToken,*/ userController.getPerro);

// U PUT

// CREAR UN PASEO EN EL ARRAY DEL USUARIO
router.post('/anadirPaseo/:id', /*userController.isValidToken,*/ userController.addPerro);

// MODIFICAR UN PERRO DEL USUARIO
router.put('/actualizarPerro/:id', /*userController.isValidToken,*/ userController.updatePerro);

// D Delete
router.put('/borrarPerro/:id', /*userController.isValidToken,*/ userController.deletePerro);

export default router;