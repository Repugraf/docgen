const mongodb = require('mongodb');
const MongoClienent = mongodb.MongoClient;

let connection;

const getInstanse = async () => {
  try {
    const client = new MongoClienent(process.env.DB_URL, { useUnifiedTopology: true });
    if (connection) {
      return connection;
    } else {
      connection = await client.connect();
      console.log('connected to database!');
      return connection;
    }
  } catch (err) {
    console.log(err)
  }
}

const getCollection = async name => {
  try {
    const db = (await getInstanse()).db();
    return db.collection(name);
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  getCollection
};