require('dotenv').config();

async function main() {
  try {
    const { createMongoConnection } = require('./util/db');
    await createMongoConnection();

    const express = require('express');


    const app = express();
    const { userIdSanitiser } = require('./middleware/auth');
    const endpointsRoutes = require('./router/endpoints');
    const authRoutes = require('./router/auth');

    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(require('cors')());

    app.use(express.static('./dist'));

    app.use(userIdSanitiser);
    app.use('/api/auth', authRoutes);
    app.use('/api/endpoints', endpointsRoutes);

    app.use((req, res) => res.sendFile(`${__dirname}/dist/index.html`));

    app.listen(process.env.PORT || 3000);
  } catch (err) {
    console.log(err);
  }
}

main();