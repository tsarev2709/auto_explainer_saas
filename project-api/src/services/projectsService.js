const model = require('../models/projectModel');

async function createProject(userId, data) {
  return model.insertProject(userId, data);
}

async function getProjects(userId) {
  return model.findProjectsByUser(userId);
}

async function getProjectById(userId, id) {
  return model.findProjectById(userId, id);
}

async function updateProject(userId, id, data) {
  return model.updateProject(userId, id, data);
}

async function deleteProject(userId, id) {
  return model.deleteProject(userId, id);
}

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  deleteProject,
};
