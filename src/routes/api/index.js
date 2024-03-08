import express from 'express';
import ping from './ping.js';
import auth from './auth.js';
import users from "#src/routes/api/users";
import roles from "#src/routes/api/roles";
import skills from "#src/routes/api/skills";
import projects from "#src/routes/api/projects";

const router = express.Router();

// api/v1/
router.get('/', (req, res) => {
    res.json({
        message: 'API/V1',
    });
});


// api/v1/ping
router.use('/ping', ping);
router.use('/auth', auth);
router.use('/users', users);
router.use('/roles', roles);
router.use('/skills', skills);
router.use('/projects', projects);

export default router;
