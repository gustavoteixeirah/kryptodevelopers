const MongoClient = require('mongodb').MongoClient;
const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_NAME = process.env.MONGODB_NAME;

let cachedDb;

export const connectToDatabase = async () => {
  if (cachedDb) {
    console.log('👌 Using existing connection');
    return Promise.resolve(cachedDb);
  }

  return MongoClient.connect(MONGODB_URI)
    .then((client) => {
      let db = client.db(MONGODB_NAME);
      console.log('🔥 New DB Connection');
      cachedDb = db;
      return cachedDb;
    })
    .catch((error) => {
      console.log('Mongo connect Error');
      console.log(error);
    });
};