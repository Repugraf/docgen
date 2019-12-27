require('dotenv').config();

const express = require('express');
const app = express();

const dummyRoutes = require('./router/dummyRoutes');

app.use('/api', dummyRoutes);

app.listen(process.env.PORT || 3000)