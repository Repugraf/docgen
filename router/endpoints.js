const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;
const { getCollection } = require('../util/db');
const endpointsCollection = getCollection('endpoints');

const { tokenMiddlware } = require('../middleware/auth');

router.post('/add', tokenMiddlware, async (req, res) => {
  try {
    const body = req.body;
    const result = await endpointsCollection.insertOne({ ...body, user_id: req.user._id });
    const { insertedId } = result;
    res.status(201).json({ message: "endpoint inserted successfuly", insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/get-all', tokenMiddlware, async (req, res) => {
  try {
    const result = await endpointsCollection.find({ user_id: new ObjectID(req.user._id) }).toArray();
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).sendStatus(err);
  }
});

router.get('/get-all/:id', tokenMiddlware, async (req, res) => {
  try {
    const projectId = req.url.id;
    const result = await endpointsCollection.find(
      {
        $and: [
          { user_id: new ObjectID(req.user._id) },
          { project_id: new ObjectID(projectId) }
        ]
      })
      .toArray();
    res.status(200).json(result)
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
})

router.get('/get/:id', tokenMiddlware, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await endpointsCollection.findOne({ $and: [{ user_id: req.user._id }, { _id: new ObjectID((`${id}`)) }] });
    res.send(result);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/get', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    const result = await endpointsCollection.find({ $and: [{ user_id: req.user._id }, { ...body }] }).toArray();
    res.send(result);
  } catch (error) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.patch('/update', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    const id = new ObjectID(body._id);
    delete body._id;
    await endpointsCollection.updateOne({ $and: [{ user_id: req.user._id }, { _id: id }] }, { $set: body });
    res.json({ message: "updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.put('/replace', tokenMiddlware, async (req, res) => {
  try {
    const { body } = req;
    if (!body._id) return res.status(403).json({ message: "_id is not provided!" });
    const id = new ObjectID(body._id);
    body._id = id;
    await endpointsCollection.replaceOne({ $and: [{ user_id: req.user._id }, { _id: id }] }, { ...body, user_id: req.user._id });
    res.json({ message: "replaced successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.delete('/delete/:id', tokenMiddlware, async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new ObjectID(`${id}`);
    await endpointsCollection.deleteOne({ $and: [{ user_id: req.user._id }, { _id }] });
    res.json({ message: "deleted successfuly" });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

module.exports = router;