const express = require('express');
const bodyParser = require('body-parser');
const Database = require('better-sqlite3');

const app = express();
const db = new Database('products.db');

// Create table if not exists
const createTableSQL = `CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  project_id INTEGER NOT NULL,
  title TEXT,
  description TEXT,
  target_audience TEXT,
  goals TEXT,
  tone TEXT,
  style TEXT,
  advantages TEXT,
  features TEXT,
  "references" TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`;
db.prepare(createTableSQL).run();

app.use(bodyParser.json());

// POST /api/products - create product
app.post('/api/products', (req, res) => {
  const { project_id, title, description, target_audience, goals, tone, style, advantages, features, references } = req.body;
  if (!project_id) {
    return res.status(400).json({ error: 'project_id is required' });
  }
  const stmt = db.prepare(`INSERT INTO products (project_id, title, description, target_audience, goals, tone, style, advantages, features, "references") VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);
  const info = stmt.run(project_id, title, description, target_audience, goals, tone, style, advantages, features, references);
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(info.lastInsertRowid);
  res.json(product);
});

// GET /api/products - list products by project_id
app.get('/api/products', (req, res) => {
  const { project_id } = req.query
  if (!project_id) {
    return res.status(400).json({ error: 'project_id is required' })
  }
  const products = db.prepare('SELECT * FROM products WHERE project_id = ?').all(project_id)
  res.json(products)
})

// GET /api/products/:project_id - get product by project
app.get('/api/products/:project_id', (req, res) => {
  const { project_id } = req.params;
  const product = db.prepare('SELECT * FROM products WHERE project_id = ? ORDER BY id DESC LIMIT 1').get(project_id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }
  res.json(product);
});

// PUT /api/products/:id - update product
app.put('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const fields = ['project_id', 'title', 'description', 'target_audience', 'goals', 'tone', 'style', 'advantages', 'features', 'references'];
  const updates = [];
  const values = [];
  for (const field of fields) {
    if (req.body[field] !== undefined) {
      const column = field === 'references' ? '"references"' : field;
      updates.push(`${column} = ?`);
      values.push(req.body[field]);
    }
  }
  if (updates.length === 0) {
    return res.status(400).json({ error: 'No fields to update' });
  }
  values.push(id);
  const stmt = db.prepare(`UPDATE products SET ${updates.join(', ')} WHERE id = ?`);
  const info = stmt.run(...values);
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Product not found' });
  }
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);
  res.json(product);
});

// DELETE /api/products/:id - delete product
app.delete('/api/products/:id', (req, res) => {
  const { id } = req.params
  const info = db.prepare('DELETE FROM products WHERE id = ?').run(id)
  if (info.changes === 0) {
    return res.status(404).json({ error: 'Product not found' })
  }
  res.json({ success: true })
})

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
