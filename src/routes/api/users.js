import express from 'express';
import usersController from '#src/controllers/usersController'
import authGard from "#src/middleware/authGard";
import rbca from "#src/middleware/rbca";

const router = express.Router();


router.get('/', [authGard.protect, rbca.authorizationChecker], usersController.allUsers);
router.get('/:id', [authGard.protect, rbca.authorizationChecker], usersController.findOneUserById);
router.post('/', [authGard.protect, rbca.authorizationChecker], usersController.createUser);
router.put('/:id', [authGard.protect, rbca.authorizationChecker], usersController.updateUser);
router.patch('/:id', [authGard.protect, rbca.authorizationChecker], usersController.partialUpdate);
router.delete('/:id', [authGard.protect, rbca.authorizationChecker], usersController.deleteUser);


export default router;
