const express = require('express');

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;

const { getCollection } = require('../util/db');
const endpointsCollection = getCollection('endpoints');

router.post('/add', async (req, res) => {
  try {
    const body = req.body;
    const result = await endpointsCollection.insertOne(body);
    const { insertedId } = result;
    res.status(201).json({ message: "endpoint inserted successfuly", insertedId });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get('/get-all', async (req, res) => {
  try {
    const result = await endpointsCollection.find().toArray();
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).sendStatus(err);
  }
});

router.get('/get/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await endpointsCollection.findOne({ _id: new ObjectID((`${id}`)) });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/get', async (req, res) => {
  try {
    const { body } = req;
    const result = await endpointsCollection.find(body).toArray();
    res.send(result);
  } catch (error) {
    console.log(err);
    req.status(500).send(err);
  }
});

router.patch('/update', async (req, res) => {
  try {
    const { body } = req;
    const id = new ObjectID(body._id);
    delete body._id;
    await endpointsCollection.updateOne({ _id: id }, { $set: body });
    res.json({ message: "updated succesfully" });
  } catch (err) {
    console.log(err);
    req.status(500).send(err);
  }
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const _id = new ObjectID(`${id}`);
    await endpointsCollection.deleteOne({ _id });
    res.json({ message: "deleted successfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

module.exports = router;