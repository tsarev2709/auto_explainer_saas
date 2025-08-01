const express = require('express');
const controller = require('../controllers/projectsController');
const { validateProject } = require('../validators/projectsValidator');
const { getUserId } = require('../middleware/auth');

const router = express.Router();

router.post('/projects', getUserId, validateProject, controller.createProject);
router.get('/projects', getUserId, controller.getProjects);
router.get('/projects/:id', getUserId, controller.getProjectById);

module.exports = router;
