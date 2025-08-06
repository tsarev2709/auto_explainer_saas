const express = require('express');
const controller = require('../controllers/projectsController');
const { validateProject } = require('../validators/projectsValidator');
const { getUserId } = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Projects]
 *     responses:
 *       201:
 *         description: Project created
 */
router.post('/projects', getUserId, validateProject, controller.createProject);

/**
 * @swagger
 * /api/projects:
 *   get:
 *     summary: Get projects of current user
 *     tags: [Projects]
 *     responses:
 *       200:
 *         description: List of projects
 */
router.get('/projects', getUserId, controller.getProjects);

/**
 * @swagger
 * /api/projects/{id}:
 *   get:
 *     summary: Get project by ID
 *     tags: [Projects]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Project ID
 *     responses:
 *       200:
 *         description: Project data
 *       404:
 *         description: Not found
 */
router.get('/projects/:id', getUserId, controller.getProjectById);

router.put('/projects/:id', getUserId, validateProject, controller.updateProject);

router.delete('/projects/:id', getUserId, controller.deleteProject);

module.exports = router;
