const mongodb = require('mongodb');
const { ObjectID } = mongodb;
const { getCollection, getSession } = require('../util/db');
const projectsCollection = getCollection('projects');
const endpointsCollection = getCollection('endpoints');

exports.deleteProject = async (projectId, user) => {
  const session = getSession();

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  try {
    await session.withTransaction(async () => {
      await projectsCollection.deleteOne(
        { $and: [{ user_id: user.id }, { _id: projectId }] },
        { session }
      );
      await endpointsCollection.deleteMany(
        { $and: [{ user_id: user.id }, { project_id: projectId }] },
        { session }
      );
    }, transactionOptions);
  } finally {
    await session.endSession();
  }
}

exports.getPublicProject = async (projectId) => {
  const project = await projectsCollection.findOne({ _id: projectId });
  if (!project) return null;
  const endpoints = await endpointsCollection.find({ project_id: project._id, user_id: project.user_id }).toArray();
  project.endpoints = endpoints;
  return project;
}