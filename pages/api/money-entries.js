import MoneyEntry from "../../lib/services/MoneyEntry";
import withErrorHandler from "../../lib/errorHandler";

async function get(req, res) {
  const moneyEntries = await MoneyEntry.list();
  res.status(200).json(moneyEntries);
}

async function post(req, res) {
  const moneyEntry = await MoneyEntry.create({
    ...req.body,
    created: new Date(),
  });
  res.status(200).json(moneyEntry);
}

export default withErrorHandler(async (req, res) => {
  if (req.method === "GET") return await get(req, res);
  if (req.method === "POST") return await post(req, res);
  res.redirect("/404");
});
