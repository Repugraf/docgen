const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;
const { getPublicProject } = require('../services/project');

router.get('/:id', async (req, res) => {
  const id = new ObjectID(req.params.id);
  const project = await getPublicProject(id);
  if (!project) return res.sendStatus(404);
  res.json(project);
});

module.exports = router;