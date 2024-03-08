import express from 'express';
import projectsControlller from "#src/controllers/projectsControlller";
import authGard from "#src/middleware/authGard";
import rbca from "#src/middleware/rbca";

const router = express.Router();

router.get('/', projectsControlller.getAllProjects);
router.get('/:id', projectsControlller.getProjectById);
router.post('/', [authGard.protect, rbca.authorizationChecker], projectsControlller.addNewProject);
router.put('/:id', [authGard.protect, rbca.authorizationChecker], projectsControlller.updateProject);
router.patch('/:id', [authGard.protect, rbca.authorizationChecker], projectsControlller.partialUpdateProject);
router.delete('/:id', [authGard.protect, rbca.authorizationChecker], projectsControlller.deleteProject);

export default router;
