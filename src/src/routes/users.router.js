import { Router } from 'express';
import usersController from '../controllers/users.controller.js';
import colors from 'colors';
import { routerUSERS } from '../middleware/ConsoleLog/routerConsoleLog.js';
import uploader from '../utils/uploader.js';

const router = Router();

router.get('/', routerUSERS, usersController.getAllUsers);
router.get('/:uid', routerUSERS, usersController.getUser);
router.post('/', routerUSERS, usersController.addUser);
router.put('/:uid', routerUSERS, usersController.updateUser);
router.delete('/:uid', routerUSERS, usersController.deleteUser);
router.post('/:uid/documents', routerUSERS, uploader.fields([ { name: 'documents', maxCount: 10 },
                                                              { name: 'image', maxCount: 10 }, ]), usersController.addDocuments);

export default router;