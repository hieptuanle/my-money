import styles from "../styles/ListMoneyEntries.module.css";
import { map } from "lodash";
import { useRouter } from "next/router";
import MainLayout from "../components/MainLayout";
import TopTitle from "../components/TopTitle";
import TopDescription from "../components/TopDescription";
import { formatNumber } from "../lib/format-number";
import { useSession } from "next-auth/client";
import { useEffect, useState } from "react";

export default function ListMoneyEntries() {
  const [session, loading] = useSession();
  const [moneyEntries, setMoneyEntries] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/money-entries/");
      const json = await res.json();
      setMoneyEntries(json);
    };
    fetchData();
  }, [session]);
  const router = useRouter();

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
              <th>ID</th>
              <th>Created</th>
              <th>Type</th>
              <th>Contact</th>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {map(moneyEntries, (moneyEntry, index) => {
              const created = new Date(moneyEntry.created);
              return (
                <tr
                  key={moneyEntry._id}
                  onClick={() => {
                    router.push("/money-entries/" + moneyEntry._id);
                  }}
                >
                  <td>{index + 1}</td>
                  <td>{moneyEntry._id}</td>
                  <td>
                    {created.getDate()}/{created.getMonth() + 1}
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
