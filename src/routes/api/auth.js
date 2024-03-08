import express from 'express';
import authController from '#src/controllers/authController'

const router = express.Router();

// v1/api/auth/login
router.post('/login', authController.login);

router.post('/refresh', authController.refreshToken);


export default router;
