const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;
const { getCollection } = require('../util/db');
const projectsCollection = getCollection('projects');

const { tokenMiddlware } = require('../middleware/auth');

const { deleteProject } = require('../services/project');

router.get('/all', tokenMiddlware, async (req, res) => {
  try {
    const result = await projectsCollection.find({ user_id: req.user._id }).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/:id', tokenMiddlware, async (req, res) => {
  try {
    const _id = new ObjectID(req.params.id);
    const result = await projectsCollection.findOne({ $and: [{ user_id: req.user._id }, { _id }] });
    res.status(200).json(result);
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

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

router.patch('/update', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    const _id = body._id;
    delete body._id;
    await projectsCollection.updateOne({ $and: [{ user_id: req.user._id }, { _id }] }, { $set: body });
    res.json({ message: "updated successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put('/replace', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    const _id = body._id;
    await projectsCollection.replaceOne({ $and: [{ user_id: req.user._id }, { _id }] }, { ...body, user_id: req.user._id })
    res.json({ message: "replaced successfully" });
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete('/delete/:id', tokenMiddlware, async (req, res) => {
  try {
    const projectId = new ObjectID(req.params.id)
    await deleteProject(projectId, req.user);
    res.status(200).json({ message: 'project was deleted' });
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;