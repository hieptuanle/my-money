import { fetcher } from "../lib/fetcher";
import Head from "next/head";
import Link from "next/link";
import styles from "../styles/ListMoneyEntries.module.css";
import { map } from "lodash";
import { useRouter } from "next/router";

export default function ListMoneyEntries({ moneyEntries }) {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <Head>
        <title>My Money</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        ></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          List <span>Entries</span>
        </h1>

        <p className={styles.description}>
          <a onClick={() => router.back()}>&larr;</a> A simple table.
        </p>

        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Created</th>
              <th>Contact</th>
              <th>Reason</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {map(moneyEntries, (moneyEntry, index) => {
              const created = new Date(moneyEntry.created);
              return (
                <tr key={moneyEntry._id}>
                  <td>{index + 1}</td>
                  <td>
                    {created.getDate()}/{created.getMonth() + 1}
                  </td>
                  <td>{moneyEntry.contact}</td>
                  <td>{moneyEntry.reason}</td>
                  <td>{moneyEntry.amount}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/hieptuanle5"
          target="_blank"
          rel="noopener noreferrer"
        >
          From Hiep Le
        </a>
      </footer>
    </div>
  );
}

export async function getStaticProps({ params }) {
  const moneyEntries = await fetcher(
    process.env.API_URL + "/api/money-entries/"
  );
  return {
    props: {
      moneyEntries,
    },
  };
}
