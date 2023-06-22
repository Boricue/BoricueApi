import { Router } from "express";
import * as userController from "../controllers/perros.controller";

const router = Router();

// TRAER TODOS LOS PERROS DEL USUARIO
router.get('/usuarios/:id/perros', /*userController.isValidToken,*/ userController.getPerros);

// TRAER UN PERRO ESPECÍFICO DEL USUARIO
router.get('/usuarios/:id/perros/:idPerro', /*userController.isValidToken,*/ userController.getPerro);

// CREAR UN PERRO EN EL ARRAY DEL USUARIO
router.put('/usuarios/:id/perros', /*userController.isValidToken,*/ userController.addPerro);

// ACTUALIZAR UN PERRO DEL USUARIO
router.put('/usuarios/:id/perros/:idPerro', /*userController.isValidToken,*/ userController.updatePerro);

// ELIMINAR UN PERRO DEL USUARIO
router.put('/usuario/:id/perros/:idPerro', /*userController.isValidToken,*/ userController.deletePerro);

export default router;