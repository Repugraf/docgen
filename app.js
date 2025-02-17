require('dotenv').config();

async function main() {
  try {
    const { createMongoConnection } = require('./util/db');
    await createMongoConnection();

    const express = require('express');

    const app = express();
    const { userIdSanitiser } = require('./middleware/auth');
    const { convertIdsToObjectID } = require('./middleware/util');
    const authRoutes = require('./router/auth');
    const endpointsRoutes = require('./router/endpoints');
    const projectsRoutes = require('./router/projects');
    const publicRoutes = require('./router/public');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(require('cors')());

    app.use(express.static('./dist'));

    app.use(userIdSanitiser);
    app.use(convertIdsToObjectID);
    app.use('/api/auth', authRoutes);
    app.use('/api/endpoints', endpointsRoutes);
    app.use('/api/projects', projectsRoutes);
    app.use('/api/public', publicRoutes);

    app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));

    app.listen(process.env.PORT || 3000);
  } catch (err) {
    console.error(err);
  }
}

main();