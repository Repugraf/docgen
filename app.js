require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('cors')());

const endpointsRoutes = require('./router/endpoints');

app.use('/api/endpoints', endpointsRoutes);

app.listen(process.env.PORT || 3000);