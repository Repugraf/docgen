const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URL || 'mongodb://localhost:27017/docgen', { useUnifiedTopology: true });
let mongoConnection;

const createMongoConnection = async () => {
  try {
    if (!client.isConnected()) {
      mongoConnection = await client.connect();
      console.log('connected to database!');
    }
  } catch (err) {
    console.log(err);
  }
}

const getMongoConnection = async () => {
  try {
    await createMongoConnection();
    return mongoConnection;
  } catch (err) {
    console.log(err);
  }
}

const closeMongoConnection = async () => {
  try {
    client.close();
    mongoConnection = null;
  } catch (err) {
    console.log(err);
  }
}

/**
 * 
 * @param {string} [db] - db name. optional 
 */
const getDatabase = db => {
  try {
    if (db) return mongoConnection.db(db);
    return mongoConnection.db();
  } catch (err) {
    console.log(err);
  }
}

/**
 * 
 * @param {string} collection - collection name
 * @param {string} [db] - db name. optional
 */
const getCollection = (collection, db) => {
  try {
    if (!collection) throw new Error('collection is not specified!');

    let database;

    if (!db) database = getDatabase();
    else database = getDatabase(db);

    return database.collection(collection);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  createMongoConnection,
  getMongoConnection,
  closeMongoConnection,
  getDatabase,
  getCollection
}