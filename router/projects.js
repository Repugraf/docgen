const express = require('express');

const router = express.Router();

const { getCollection } = require('../util/db');
const projectsCollection = getCollection('projects');

const { tokenMiddlware } = require('../middleware/auth');

const { deleteProject } = require('../services/project');

router.post('/create', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    if (body._id) delete body._id;
    await projectsCollection.insertOne({ ...body, user_id: req.user._id });
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete('/delete/:id', tokenMiddlware, async (req, res) => {
  try {
    const projectId = req.url.id;
    await deleteProject(projectId, req.user);
    res.status(200).json({ message: 'project was deleted' });
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
})

module.exports = router;