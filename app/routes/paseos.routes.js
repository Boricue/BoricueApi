import { Router } from "express";
import * as userController from "../controllers/paseos.controller";

const router = Router();

// C POST
router.post('/paseo/', /*userController.isValidToken,*/ userController.postPaseo);

// R GET
router.get('/paseo/', /*userController.isValidToken,*/ userController.getTodosPaseos);
router.get('/paseo/:id', /*userController.isValidToken,*/ userController.getPaseo);

// U PUT
router.put('/paseo/:id', /*userController.isValidToken,*/ userController.updatePaseo);

// D Delete
router.delete('/paseo/:id', /*userController.isValidToken,*/ userController.deletePaseo);

export default router;