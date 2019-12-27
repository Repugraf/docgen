const express = require('express');

const router = express.Router();

const { getCollection } = require('../util/db');

router.get('/', async (req, res) => {
  const dummyDataDB = await getCollection('dummyData');
  const data = await dummyDataDB.findOne();
  res.send(data);
});

module.exports = router;