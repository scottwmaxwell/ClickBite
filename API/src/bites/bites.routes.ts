import { Router } from 'express';
import * as BitesController from './bites.controller';

const router = Router();
router
    .route('/bites')
    .get(BitesController.getBites);
router
    .route('/bitesByUsername/:username')
    .get(BitesController.getBitesByUsername);
router
    .route('/createBite')
    .post(BitesController.createBite);
router
    .route('/deleteBite/:id')
    .delete(BitesController.deleteBite);

export default router;