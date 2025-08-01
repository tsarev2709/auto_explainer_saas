const service = require('../services/projectsService');

async function createProject(req, res) {
  try {
    const project = await service.createProject(req.userId, req.validatedBody);
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function getProjects(req, res) {
  try {
    const projects = await service.getProjects(req.userId);
    res.json(projects);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

async function getProjectById(req, res) {
  try {
    const project = await service.getProjectById(req.userId, req.params.id);
    if (!project) return res.status(404).json({ error: 'Not found' });
    res.json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};
