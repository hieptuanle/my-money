import MoneyEntry from "../../../lib/services/MoneyEntry";
import withErrorHandler from "../../../lib/errorHandler";
import requireAuthentication from "../../../lib/authentication";

async function get(req, res) {
  const moneyEntry = await MoneyEntry.get({ _id: req.query.moneyEntryId });
  if (moneyEntry) {
    res.json(moneyEntry);
  } else {
    res.status(400);
    res.json({ message: "No documents found!" });
  }
}

async function remove(req, res) {
  await MoneyEntry.remove({ _id: req.query.moneyEntryId });
  res.json({ _id: req.query.moneyEntryId });
}

async function update(req, res) {
  const { _id, ...data } = req.body;
  await MoneyEntry.update({
    _id: req.query.moneyEntryId,
    ...data,
  });
  res.json({
    _id: req.query.moneyEntryId,
    ...data,
    updated: new Date(),
  });
}

export default requireAuthentication(
  withErrorHandler(async (req, res) => {
    if (req.method === "GET") return await get(req, res);
    if (req.method === "DELETE") return await remove(req, res);
    if (req.method === "PUT") return await update(req, res);

    res.redirect("404");
  })
);
