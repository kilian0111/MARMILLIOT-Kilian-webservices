import express from 'express';
import SkillsController from "#src/controllers/skillsController";
import authGard from "#src/middleware/authGard";
import rbca from "#src/middleware/rbca";

const router = express.Router();

router.get('/', [authGard.protect, rbca.authorizationChecker], SkillsController.getAllSkills);
router.get('/:id', [authGard.protect, rbca.authorizationChecker], SkillsController.getSkillById);
router.post('/', [authGard.protect, rbca.authorizationChecker], SkillsController.addNewSkill);
router.put('/:id', [authGard.protect, rbca.authorizationChecker], SkillsController.updateSkill);
router.delete('/:id', [authGard.protect, rbca.authorizationChecker], SkillsController.deleteSkill);

export default router;
