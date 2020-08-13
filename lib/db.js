import url from "url";
import { MongoClient, Db } from "mongodb";

let cachedDb = null;

export async function connectToDatabase(uri) {
  // If the database connection is cached,
  // use it instead of creating a new connection
  if (cachedDb) {
    return cachedDb;
  }

  // If no connection is cached, create a new one
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Select the database through the connection,
  // using the database path of the connection string
  const db = await client.db(url.parse(uri).pathname.substr(1));

  // Cache the database connection and return the connection
  cachedDb = db;
  return db;
}

/**
 * @returns {Promise<Db>}
 */
export async function getDb() {
  return await connectToDatabase(process.env.MONGODB_URI);
}

/**
 * Get collection
 * @param {string} collection
 * @returns {import("mongodb").Collection}
 */

export async function getCollection(collection) {
  const db = await getDb();
  return db.collection(collection);
}
