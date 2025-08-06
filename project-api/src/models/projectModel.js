const pool = require('../db');

async function createTable() {
  await pool.query(`CREATE TABLE IF NOT EXISTS projects (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    format TEXT,
    target_audience TEXT,
    goals TEXT,
    tone TEXT,
    style TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  )`);
}

async function insertProject(userId, data) {
  const {
    title,
    description,
    format,
    target_audience,
    goals,
    tone,
    style,
  } = data;
  const { rows } = await pool.query(
    `INSERT INTO projects (user_id, title, description, format, target_audience, goals, tone, style)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [userId, title, description, format, target_audience, goals, tone, style]
  );
  return rows[0];
}

async function findProjectsByUser(userId) {
  const { rows } = await pool.query('SELECT * FROM projects WHERE user_id = $1 ORDER BY id', [userId]);
  return rows;
}

async function findProjectById(userId, id) {
  const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, userId]);
  return rows[0];
}

async function updateProject(userId, id, data) {
  const {
    title,
    description,
    format,
    target_audience,
    goals,
    tone,
    style,
  } = data;
  const { rows } = await pool.query(
    `UPDATE projects SET title = $1, description = $2, format = $3, target_audience = $4, goals = $5, tone = $6, style = $7
     WHERE id = $8 AND user_id = $9 RETURNING *`,
    [title, description, format, target_audience, goals, tone, style, id, userId]
  );
  return rows[0];
}

async function deleteProject(userId, id) {
  await pool.query('DELETE FROM projects WHERE id = $1 AND user_id = $2', [id, userId]);
}

module.exports = {
  createTable,
  insertProject,
  findProjectsByUser,
  findProjectById,
  updateProject,
  deleteProject,
};
