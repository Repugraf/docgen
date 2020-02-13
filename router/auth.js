const { promisify } = require('util');
const express = require('express');
const uuid = require('uuid/v4');
const bcrypt = require('bcrypt');
const hash = require('../util/hash');
const { welcomeMail } = require('../services/mailing');
const { signupValidator, loginValidator, tokenMiddlware } = require('../middleware/auth');
const compare = promisify(bcrypt.compare);

const router = express.Router();

const mongodb = require('mongodb');
const { ObjectID } = mongodb;

const { getCollection } = require('../util/db');
const usersCollection = getCollection('users');

const getToken = async (email, id) => {
  const hashedEmailAndId = await hash(email + id + Date.now() + uuid());
  return `${uuid()}-${hashedEmailAndId}-${uuid()}`;
}

router.post('/signup', signupValidator, async (req, res) => {
  try {
    let { name, email, password } = req.body;
    password = await hash(password);
    const user = await usersCollection.findOne({ email });
    if (user) return res.status(400).send({ message: 'user with this email already exists' });
    const result = await usersCollection.insertOne({ name, email, password });
    const newUser = result.ops[0];
    const insertedId = result.insertedId + '';
    const token = await getToken(newUser.email + newUser._id);
    await usersCollection.updateOne({ _id: ObjectID(insertedId) }, { $set: { token } });
    res.status(201).json({ message: "user added successfuly" });
    await welcomeMail(email, name);
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.post('/login', loginValidator, async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await usersCollection.findOne({ email });
    if (!user) return res.status(401).send({ message: 'user with this email was not found in the system' });
    const passwordIsValid = await compare(password, user.password);
    if (!passwordIsValid) return res.status(401).send({ message: 'wrong password' });
    let token = user.token;
    if (!token) {
      token = await getToken(user.email + user._id);
      await usersCollection.updateOne({ email }, { $set: { token } })
    }
    res.status(200).send({ token })

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

router.get('/user', tokenMiddlware, (req, res) => (
  res.json({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email
  })
));

module.exports = router;