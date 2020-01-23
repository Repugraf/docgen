const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const hash = require('../util/hash');

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;

const { getCollection } = require('../util/db');
const usersCollection = getCollection('users');

router.post('/signup', async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) return res.status(403).send({ message: 'required fields are not provided!' });
    password = await hash(password);
    const result = await usersCollection.insertOne({ name, email, password });
    const insertedId = result.insertedId + '';
    const token = `${uuid()}-${uuid()}-${uuid()}`;
    await usersCollection.updateOne({ _id: ObjectID(insertedId) }, { $set: { token } });
    res.status(201).json({ message: "user added successfuly" });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(403).send({ message: 'required fields are not provided!' });
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(401).send({ message: 'user with this email was not found in the system' });
    const passwordIsValid = bcrypt.compare(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: 'wrong password' });
    let token = user.token;
    if (!token) {
      token = `${uuid()}-${uuid()}-${uuid()}`;
      await usersCollection.updateOne({ email }, { $set: { token } })
    }
    res.status(200).send({ token: user.token })

  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
})

module.exports = router;