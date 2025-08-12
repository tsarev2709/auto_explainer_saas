const request = require('supertest');
const { v4: uuidv4 } = require('uuid');
const app = require('../src/index');
const pool = require('../src/db');
const { createTable } = require('../src/models/projectModel');

const testUserId = uuidv4();

beforeAll(async () => {
  await createTable();
});

beforeEach(async () => {
  await pool.query('DELETE FROM projects');
});

afterAll(async () => {
  await pool.end();
});

describe('POST /api/projects', () => {
  it('creates a project successfully', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'Test', format: '16:9' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Test');
  });

  it('returns validation error for empty title', async () => {
    const res = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: '' });
    expect(res.status).toBe(400);
  });
});

describe('GET /api/projects', () => {
  it('returns list of projects', async () => {
    await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'Project 1', format: '16:9' });
    const res = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
  });
});

describe('GET /api/projects/:id', () => {
  it('returns project by id', async () => {
    const createRes = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'Project', format: '16:9' });
    const id = createRes.body.id;
    const res = await request(app)
      .get(`/api/projects/${id}`)
      .set('Authorization', `Bearer ${testUserId}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(id);
  });

  it('returns 404 if not found', async () => {
    const res = await request(app)
      .get('/api/projects/9999')
      .set('Authorization', `Bearer ${testUserId}`);
    expect(res.status).toBe(404);
  });
});

describe('PUT /api/projects/:id', () => {
  it('updates a project', async () => {
    const createRes = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'Old', format: '16:9' });
    const id = createRes.body.id;
    const res = await request(app)
      .put(`/api/projects/${id}`)
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'New', format: '1:1' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('New');
  });
});

describe('DELETE /api/projects/:id', () => {
  it('deletes a project', async () => {
    const createRes = await request(app)
      .post('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`)
      .send({ title: 'ToDelete', format: '16:9' });
    const id = createRes.body.id;
    const res = await request(app)
      .delete(`/api/projects/${id}`)
      .set('Authorization', `Bearer ${testUserId}`);
    expect(res.status).toBe(204);
    const listRes = await request(app)
      .get('/api/projects')
      .set('Authorization', `Bearer ${testUserId}`);
    expect(listRes.body.length).toBe(0);
  });
});
