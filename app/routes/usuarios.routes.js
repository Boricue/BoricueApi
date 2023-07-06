import { Router } from "express";
import * as userController from "../controllers/usuarios.controller";

const router = Router();

// C POST
router.post('/usuarios/', /*userController.isValidToken,*/ userController.createUserDb);

// R GET
router.get('/usuarios/', /*userController.isValidToken,*/ userController.getUsers);
router.get('/usuarios/:id', /*userController.isValidToken,*/ userController.getUser);

// U PUT
router.put('/usuarios/:id', /*userController.isValidToken,*/ userController.updateUser);

// D Delete
router.delete('/usuarios/:id', /*userController.isValidToken,*/ userController.deleteUser);

export default router;