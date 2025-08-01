const express = require('express');
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: '../.env' });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const app = express();
app.use(express.json());

// Middleware to get user_id from Authorization header token
function getUserId(req) {
  const auth = req.headers['authorization'];
  if (!auth) return null;
  // Expect header in format 'Bearer <token>'
  const token = auth.split(' ')[1] || auth;
  // Here token is assumed to be the user_id directly
  return token;
}

app.post('/api/projects', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });

  const { title, description, format, target_audience, goals, tone, style } = req.body;
  try {
    const { rows } = await pool.query(
      `INSERT INTO projects (user_id, title, description, format, target_audience, goals, tone, style)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
      [userId, title, description, format, target_audience, goals, tone, style]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/projects', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE user_id = $1', [userId]);
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ error: 'Unauthorized' });
  const id = req.params.id;
  try {
    const { rows } = await pool.query('SELECT * FROM projects WHERE id = $1 AND user_id = $2', [id, userId]);
    if (rows.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Project API running on port ${PORT}`);
});
