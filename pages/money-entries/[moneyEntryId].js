import { useRouter } from "next/router";
import styles from "../../styles/ViewMoneyEntry.module.css";
import Head from "next/head";
import swr from "swr";
import { fetcher, putData } from "../../lib/fetcher";
import { create } from "lodash";
import { useState, useRef } from "react";

export default function ViewMoneyEntry({ moneyEntry }) {
  const router = useRouter();
  const CONTACTS = ["VDH", "4handy", "Vy", "Dũng", "Khác"];
  const [amount, setAmount] = useState(moneyEntry.amount);
  const [contact, setContact] = useState(moneyEntry.contact || "");
  const [reason, setReason] = useState(moneyEntry.reason);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const amountElm = useRef(null);
  const contactElm = useRef(null);
  const reasonElm = useRef(null);
  const [updating, setUpdating] = useState(false);
  const canSubmit = !updating && amount && contact && reason;

  async function submit() {
    if (!amount) {
      amountElm.current.focus();
      return setError("No amount specified.");
    }
    if (!contact) {
      contact.current.focus();
      return setError("No contact specified.");
    }
    if (!reason) {
      reasonElm.current.focus();
      return setError("No reason specified.");
    }
    setUpdating(true);
    try {
      await putData("/api/money-entries/" + moneyEntry._id, {
        amount,
        contact,
        reason,
      });
      setUpdating(false);
      setSuccess("Success!");
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating(false);
    }

    setSuccess("Success!");
  }

  function onChangeInput(changeFnc) {
    return function (e) {
      changeFnc(e.target.value);
      setError("");
      setSuccess("");
    };
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>View</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        ></link>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          View <span> {moneyEntry._id.slice(-4)}</span>
        </h1>
        <p className={styles.description}>
          <a onClick={() => router.back()}>&larr;</a>
          Wanna change something?
        </p>

        <div className={styles.grid}>
          <label className={styles.card} htmlFor="amount">
            <h3>Amount &rarr;</h3>
            <input
              ref={amountElm}
              id="amount"
              name="amount"
              type="text"
              value={amount}
              placeholder="Eg: 30,000"
              onChange={onChangeInput(setAmount)}
            ></input>
          </label>

          <label htmlFor="contact" className={styles.card}>
            <h3>Contact &rarr;</h3>
            <select
              ref={contactElm}
              id="contact"
              name="contact"
              value={contact}
              onChange={onChangeInput(setContact)}
            >
              {CONTACTS.concat("").map((contact) => (
                <option key={contact} value={contact}>
                  {contact || "<Select one>"}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.card} htmlFor="reason">
            <h3>Reason &rarr;</h3>
            <input
              ref={reasonElm}
              id="reason"
              name="reason"
              type="text"
              value={reason}
              placeholder="Eg: Breakfast"
              onChange={onChangeInput(setReason)}
            ></input>
          </label>

          <button
            onClick={() => submit()}
            className={styles.card}
            disabled={!canSubmit}
          >
            <h3>Update &rarr;</h3>
            <p>{error}</p>
            <p>{success}</p>
          </button>
        </div>
      </main>
      <footer className={styles.footer}>
        <a target="_blank" rel="noopener noreferrer">
          From Hiep Le
        </a>
      </footer>
    </div>
  );
}

// export async function getStaticPaths() {
//   const moneyEntries = await fetcher(
//     process.env.API_URL + "/api/money-entries"
//   );

//   const paths = moneyEntries.map((moneyEntry) => {
//     return `/money-entries/${moneyEntry._id}`;
//   });

//   // fallback: false means pages that don’t have the
//   // correct id will 404.
//   return { paths, fallback: false };
// }

// params will contain the id for each generated page.
export async function getServerSideProps({ params }) {
  const moneyEntry = await fetcher(
    process.env.API_URL + "/api/money-entries/" + params.moneyEntryId
  );
  return {
    props: {
      moneyEntry,
    },
  };
}
