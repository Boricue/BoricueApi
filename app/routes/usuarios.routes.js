import { Router } from "express";
import * as userController from "../controllers/usuarios.controller";

const router = Router();

// C POST
router.post('/usuarios/', /*userController.isValidToken,*/ userController.createUserAuth);
router.post('/usuarios/', /*userController.isValidToken,*/ userController.createUserDb);

// R GET
router.get('/usuarios/', /*userController.isValidToken,*/ userController.getusuarios);
router.get('/usuarios/:id', /*userController.isValidToken,*/ userController.getUser);

// U PUT
router.put('/usuarios/', /*userController.isValidToken,*/ userController.updateUser);

// D Delete
router.delete('/usuarios/:id', /*userController.isValidToken,*/ userController.deleteUser);

export default router;