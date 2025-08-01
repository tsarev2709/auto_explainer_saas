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

module.exports = {
  createProject,
  getProjects,
  getProjectById,
};
