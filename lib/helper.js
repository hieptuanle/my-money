import { ObjectId } from "mongodb";
import { isString, get } from "lodash";

export function getObjectId(obj) {
  const id = get(obj, "_id") || obj;
  if (isString(id) && ObjectId.isValid(id)) return new ObjectId(id);
  return id;
}
