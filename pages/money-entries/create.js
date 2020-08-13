import styles from "../../styles/CreateMoneyEntry.module.css";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { route } from "next/dist/next-server/server/router";
import { postData } from "../../lib/fetcher";

export default function CreateMoneyEntry() {
  const router = useRouter();
  const CONTACTS = ["VDH", "4handy", "Vy", "Dũng", "Khác"];
  const [amount, setAmount] = useState("");
  const [contact, setContact] = useState("VDH");
  const [reason, setReason] = useState("");
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
      const newMoneyEntry = await postData("/api/money-entries", {
        amount,
        contact,
        reason,
      });
      setSuccess("Success!");
      router.push("/money-entries/" + newMoneyEntry._id);
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating(false);
    }
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
        <title>Create</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        ></link>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Create <span> Entry</span>
        </h1>

        <p className={styles.description}>
          <a onClick={() => router.back()}>&larr;</a>
          What are you spending on?
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
              {CONTACTS.map((contact) => (
                <option key={contact} value={contact}>
                  {contact}
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
            onClick={submit}
            className={styles.card}
            disabled={!canSubmit}
          >
            <h3>Submit &rarr;</h3>
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
