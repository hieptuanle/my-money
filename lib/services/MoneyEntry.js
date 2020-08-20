import { getCollection as getNativeCollection } from "../db";
import { getObjectId } from "../helper";
import { ObjectId } from "mongodb";
import Validator from "validatorjs";
import { values, flatten, join } from "lodash";

const COLLECTION_NAME = "moneyentries";

const rules = {
  _id: "required",
  type: "required",
  contact: "required",
  reason: "required",
  amount: "required|numeric",
  time: "required|date",
  created: "required|date",
};

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
  const newDoc = { _id: ObjectId(), ...doc, created: new Date() };
  const validation = new Validator(newDoc, rules);
  if (validation.fails()) {
    throw new Error(join(flatten(values(validation.errors.all())), ", "));
  }
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
  const validation = new Validator(doc, rules);
  if (validation.fails()) {
    throw new Error(validation.errors.first());
  }
  return collection.updateOne(
    {
      _id,
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

/**
 * Get summary for each type for each contact
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns {Promise<{ contact: string, type: string, amount: number }>} result
 */
export async function groupByContactType(startDate, endDate) {
  const collection = await getCollection();
  return collection
    .aggregate([
      {
        $match: {
          created: {
            $gte: startDate,
            $lte: endDate,
          },
        },
      },
      {
        $group: {
          _id: {
            contact: "$contact",
            type: { $ifNull: ["$type", "N/A"] },
          },
          amount: { $sum: "$amount" },
        },
      },
      {
        $project: {
          _id: 0,
          contact: "$_id.contact",
          type: "$_id.type",
          amount: 1,
        },
      },
      {
        $sort: {
          contact: 1,
          type: 1,
        },
      },
    ])
    .toArray();
}

const MoneyEntry = {
  list,
  get,
  create,
  update,
  remove,
  groupByContactType,
};

export default MoneyEntry;
