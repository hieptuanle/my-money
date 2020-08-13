import MoneyEntry from "../../../lib/services/MoneyEntry";
import withErrorHandler from "../../../lib/errorHandler";

async function get(req, res) {
  const result = await MoneyEntry.get({ _id: req.query.moneyEntryId });
  if (result) {
    res.json(result);
  } else {
    res.status(400);
    res.json({ message: "No documents found!" });
  }
}

async function remove(req, res) {
  const result = await MoneyEntry.remove({ _id: req.query.moneyEntryId });
  res.json(result);
}

async function update(req, res) {
  const { _id, ...data } = req.body;
  const result = await MoneyEntry.update({
    _id: req.query.moneyEntryId,
    ...data,
  });
  res.json(result);
}

export default withErrorHandler(async (req, res) => {
  if (req.method === "GET") return await get(req, res);
  if (req.method === "DELETE") return await remove(req, res);
  if (req.method === "PUT") return await update(req, res);

  res.redirect("404");
});
