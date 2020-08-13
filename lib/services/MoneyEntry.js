import { getCollection as getNativeCollection } from "../db";
import { getObjectId } from "../helper";
import { ObjectId } from "mongodb";

const COLLECTION_NAME = "moneyentries";

/**
 * @returns {import("mongodb").Collection}
 */
async function getCollection() {
  return getNativeCollection(COLLECTION_NAME);
}

export async function list() {
  const collection = await getCollection();
  return collection.find({}).toArray();
}

export async function create(doc) {
  const collection = await getCollection();
  const newDoc = { _id: ObjectId(), ...doc };
  await collection.insertOne(newDoc);
  return newDoc;
}

export async function get(doc) {
  const collection = await getCollection();
  return collection.findOne({
    _id: getObjectId(doc),
  });
}

export async function update(doc) {
  const { _id, ...data } = doc;
  const collection = await getCollection();
  return collection.updateOne(
    {
      _id: getObjectId(doc),
    },
    {
      $set: data,
    }
  );
}

export async function remove(doc) {
  const collection = await getCollection();
  return collection.deleteOne({
    _id: getObjectId(doc),
  });
}

const MoneyEntry = {
  list,
  get,
  create,
  update,
  remove,
};

export default MoneyEntry;
