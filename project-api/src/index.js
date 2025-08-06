const express = require('express');
const dotenv = require('dotenv');
const router = require('./routes/projectsRoutes');
const voiceoverRoutes = require('./routes/voiceoverRoutes');
const { createTable } = require('./models/projectModel');
const swagger = require('../swagger');

dotenv.config();

const app = express();
app.use(express.json());

swagger(app);

app.use('/api', router);
app.use('/api', voiceoverRoutes);

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
