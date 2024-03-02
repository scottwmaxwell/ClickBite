import { Router } from 'express';
import * as UsersController from './users.controller';

const router = Router();
router
    .route('/users')
    .get(UsersController.getUsers);
router
    .route('/usersByUsername/:username')
    .get(UsersController.getUsersByUsername);
router
    .route('/createUser')
    .post(UsersController.createUser);
router
    .route('/deleteUser/:id')
    .delete(UsersController.deleteUser);

export default router;