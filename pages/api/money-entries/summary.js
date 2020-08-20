import MoneyEntry from "../../../lib/services/MoneyEntry";
import withErrorHandler from "../../../lib/errorHandler";
import { startOfMonth, endOfMonth, parseISO } from "date-fns";

async function get(req, res) {
  const startDate = req.query.startDate
    ? parseISO(req.query.startDate)
    : new Date();
  const endDate = req.query.endDate ? parseISO(req.query.endDate) : new Date();

  const contactTypeEntries = await MoneyEntry.groupByContactType(
    startOfMonth(new Date(startDate)),
    endOfMonth(new Date(endDate))
  );

  res.json(contactTypeEntries);
}

export default withErrorHandler(async (req, res) => {
  if (req.method === "GET") return await get(req, res);

  res.redirect("404");
});
