import { fetcher } from "../lib/fetcher";
import styles from "../styles/ListMoneyEntries.module.css";
import { map } from "lodash";
import { useRouter } from "next/router";
import BackButton from "../components/BackButton";
import MainLayout from "../components/MainLayout";
import TopTitle from "../components/TopTitle";
import TopDescription from "../components/TopDescription";

export default function ListMoneyEntries({ moneyEntries }) {
  const router = useRouter();
  return (
    <MainLayout pageTitle="Money Entries">
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
                  <td>{moneyEntry._id.slice(-4)}</td>
                  <td>
                    {created.getDate()}/{created.getMonth() + 1}
                  </td>
                  <td>{moneyEntry.type}</td>
                  <td>{moneyEntry.contact}</td>
                  <td>{moneyEntry.reason}</td>
                  <td>{moneyEntry.amount}</td>
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
  const moneyEntries = await fetcher(
    process.env.API_URL + "/api/money-entries/"
  );
  return {
    props: {
      moneyEntries,
    },
  };
}
