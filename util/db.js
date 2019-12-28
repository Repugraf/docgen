const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.DB_URL, { useUnifiedTopology: true });
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

const getDatabase = db => {
  try {
    if (db) return mongoConnection.db(db);
    return mongoConnection.db();
  } catch (err) {
    console.log(err);
  }
}

const getCollection = (col, db) => {
  try {
    if (!col) throw new Error('collection is not specified!');

    let database;

    if (!db) database = getDatabase();
    else database = getDatabase(db);

    return database.collection(col);
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