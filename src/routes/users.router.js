import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import colors from 'colors';
import { routerUSERS } from '../middleware/ConsoleLog/routerConsoleLog.js';

const router = Router();

router.get('/', routerUSERS, usersController.getAllUsers);
router.get('/:uid', routerUSERS, usersController.getUser);
router.post('/', routerUSERS, usersController.addUser);
router.put('/:uid', routerUSERS, usersController.updateUser);
router.delete('/:uid', routerUSERS, usersController.deleteUser);
router.post('api/users/:uid/documents', routerUSERS, usersController.addUser);

export default router;