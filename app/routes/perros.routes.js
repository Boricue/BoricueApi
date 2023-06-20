import { Router } from "express";
import * as userController from "../controllers/perros.controller";

const router = Router();

// R GET

// TRAER TODOS LOS PERROS DEL USUARIO
router.get('/perros/:id', /*userController.isValidToken,*/ userController.getPerros);

// TRAER UN PERRO ESPECIFICO DEL USUARIO
router.get('/perros/:id,:perro', /*userController.isValidToken,*/ userController.getPerro);

// U PUT

// CREAR UN PERRO EN EL ARRAY DEL USUARIO
router.put('/perros/:id', /*userController.isValidToken,*/ userController.addPerro);

// MODIFICAR UN PERRO DEL USUARIO
router.put('/perros/:id', /*userController.isValidToken,*/ userController.updatePerro);

// D Delete
router.delete('/users/:id', /*userController.isValidToken,*/ userController.deletePerro);

export default router;