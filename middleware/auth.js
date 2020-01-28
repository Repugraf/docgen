const { ObjectID } = require('mongodb');
const { getCollection } = require('../util/db');
const usersCollection = getCollection('users');
const { isEmail } = require('validator');

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

exports.userIdSanitiser = (req, res, next) => {
  if (req.body) delete req.body.user_id;
  next();
}

exports.signupValidator = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name) return res.status(400).send({ message: 'name is requred!' });
  if (!isEmail(email)) return res.status(400).send({ message: 'email is not valid!' });
  if (!password && password.length < 5) 
    return res.status(403).send({ message: 'password should be at least 5 chars long!' });
  next();
}

exports.loginValidator = (req, res, next) => {
  const { email, password } = req.body;
  if (!isEmail(email)) return res.status(400).send({ message: 'email is not valid!' });
  if (!password && password.length < 5) 
    return res.status(403).send({ message: 'password should be at least 5 chars long!' });
  next();
}