import { Router } from 'express';
import * as BitesController from './bites.controller';

const router = Router();
router
    .route('/bites')
    .get(BitesController.getBites);
router
    .route('/bite')
    .post(BitesController.createBite);

export default router;