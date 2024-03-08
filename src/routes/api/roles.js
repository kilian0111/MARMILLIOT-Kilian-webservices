import express from 'express';
import rolesController from "#src/controllers/rolesController";
import authGard from "#src/middleware/authGard";
import rbca from "#src/middleware/rbca";

const router = express.Router();

router.get('/', [authGard.protect, rbca.authorizationChecker], rolesController.getAllRoles);
router.get('/:id', [authGard.protect, rbca.authorizationChecker], rolesController.getRoleById);
router.post('/', [authGard.protect, rbca.authorizationChecker], rolesController.addNewRole);
router.put('/:id', [authGard.protect, rbca.authorizationChecker], rolesController.updateRole);
router.patch('/:id', [authGard.protect, rbca.authorizationChecker], rolesController.partialUpdateRole);
router.delete('/:id', [authGard.protect, rbca.authorizationChecker], rolesController.deleteRole);

export default router;
