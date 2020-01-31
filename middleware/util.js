const { ObjectID } = require('mongodb');

exports.convertIdsToObjectID = (req, res, next) => {
  const { body } = req;
  if (body) {
    const bodyIds = Object.keys(body).filter(e => e.includes('_id'));
    if (bodyIds.length) bodyIds.forEach(e => body[e] = new ObjectID(body[e]));
  }

  next();
}