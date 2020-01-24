const {ObjectID} = require('mongodb');
const { getCollection } = require('../util/db');
const usersCollection = getCollection('users');

exports.tokenMiddlware = async (req, res, next) => {
  const AuthHeader = req.headers.Authorization || req.headers.authorization;
  if (!AuthHeader) return res.status(401).send({ message: "Authorization header is not provided" });
  let token = AuthHeader.split(' ')[1];
  if (!token) return res.status(401).send({ message: "token is not provided" });

  const user = await usersCollection.findOne({ token });
  if (!user) return res.status(401).send({ message: "no user with this token" })

  req.user = user;
  next();
}