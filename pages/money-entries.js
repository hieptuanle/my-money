import styles from "../styles/ListMoneyEntries.module.css";
import { map } from "lodash";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import TopTitle from "../components/TopTitle";
import TopDescription from "../components/TopDescription";
import { formatNumber } from "../lib/format-number";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Spinner from "../components/Spinner";
import Link from "next/link";

export default function ListMoneyEntries() {
  const [moneyEntries, setMoneyEntries] = useState([]);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/money-entries/");
      const json = await res.json();
      setMoneyEntries(json);
    };
    setFetching(true);
    fetchData().finally(() => {
      setFetching(false);
    });
  }, []);
  const router = useRouter();

  if (fetching) {
    return <Spinner />;
  }

  return (
    <MainLayout pageTitle="Money Entries" hasMinWidth={true}>
      <>
        <TopTitle>
          List <span>Entries</span>
        </TopTitle>

        <TopDescription>A simple table.</TopDescription>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>No</th>
              <th>Created</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {map(moneyEntries, (moneyEntry, index) => {
              const created = moneyEntry.created;
              return (
                <tr key={moneyEntry._id}>
                  <td>
                    <Link href={"/money-entries/" + moneyEntry._id}>
                      <a>{index + 1}</a>
                    </Link>
                  </td>
                  <td>
                    {created ? format(new Date(created), "yyyy-MM-dd") : ""}
                  </td>
                  <td>{moneyEntry.type}</td>
                  <td>{moneyEntry.contact}</td>
                  <td>{moneyEntry.reason}</td>
                  <td className={styles.quantity}>
                    {formatNumber(moneyEntry.amount)}
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
