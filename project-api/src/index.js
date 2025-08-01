const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/projectsRoutes');
const { createTable } = require('./models/projectModel');

dotenv.config();

const app = express();
app.use(express.json());

app.use('/api', router);

if (require.main === module) {
  const PORT = process.env.PORT || 4000;
  createTable().then(() => {
    app.listen(PORT, () => {
      console.log(`Project API running on port ${PORT}`);
    });
  }).catch((err) => {
    console.error('Failed to start server', err);
  });
}

module.exports = app;
