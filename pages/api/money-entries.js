import { connectToDatabase } from "../../lib/db";

async function get(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  // Select the "users" collection from the database
  const collection = await db.collection("moneyentries");

  // Select the users collection from the database
  const moneyEntries = await collection.find({}).toArray();

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ moneyEntries });
}

async function post(req, res) {
  const db = await connectToDatabase(process.env.MONGODB_URI);
  // Select the "users" collection from the database
  const collection = await db.collection("moneyentries");

  // Select the users collection from the database
  const result = await collection.insertOne(req.body);

  // Respond with a JSON string of all users in the collection
  res.status(200).json({ moneyEntry: req.body, result });
}

export default async (req, res) => {
  if (req.method === "GET") return await get(req, res);
  if (req.method === "POST") return await post(req, res);
  res.redirect("/404");
};
