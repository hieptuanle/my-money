import MainLayout from "../../components/MainLayout";
import TopTitle from "../../components/TopTitle";
import TopDescription from "../../components/TopDescription";
import styles from "../../styles/SummaryMoneyEntries.module.css";
import { startOfMonth, endOfMonth, formatISO } from "date-fns";
import { fetcher } from "../../lib/fetcher";
import { map } from "lodash";
import { formatNumber } from "../../lib/format-number";

export default function SummaryMoneyEntries({ contactTypeEntries }) {
  return (
    <MainLayout pageTitle="Summary">
      <>
        <TopTitle>
          Summary <span>Table</span>
        </TopTitle>
        <TopDescription>Who owns who?</TopDescription>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Contact</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {map(contactTypeEntries, (contactTypeEntry, index) => {
              return (
                <tr
                  key={contactTypeEntry.type + "_" + contactTypeEntry.contact}
                >
                  <td>{index + 1}</td>
                  <td>{contactTypeEntry.contact}</td>
                  <td>{contactTypeEntry.type}</td>
                  <td className={styles.quantity}>
                    {formatNumber(contactTypeEntry.amount)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
    </MainLayout>
  );
}

export async function getServerSideProps() {
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());

  const contactTypeEntries = await fetcher(
    process.env.API_URL +
      "/api/money-entries/summary?startDate=" +
      encodeURIComponent(formatISO(startDate)) +
      "&endDate=" +
      encodeURIComponent(formatISO(endDate))
  );
  return {
    props: {
      contactTypeEntries,
    },
  };
}
