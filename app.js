require('dotenv').config();

async function main() {
  try {
    const express = require('express');
    const { createMongoConnection } = require('./util/db');

    await createMongoConnection();

    const app = express();
    const endpointsRoutes = require('./router/endpoints');

    app.use(express.urlencoded({extended: true}));
    app.use(express.json());
    app.use(require('cors')());

    app.use(express.static('./dist'));

    app.use('/api/endpoints', endpointsRoutes);

    app.listen(process.env.PORT || 3000);
  } catch (err) {
    console.log(err);
  }
}

main();