import styles from "../../styles/CreateMoneyEntry.module.css";
import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { postData } from "../../lib/fetcher";
import MainLayout from "../../components/MainLayout";
import TopDescription from "../../components/TopDescription";
import TopTitle from "../../components/TopTitle";

export default function CreateMoneyEntry() {
  const router = useRouter();
  const CONTACTS = ["VDH", "4handy", "Vy", "Dũng", "Khác"];
  const [type, setType] = useState("Cho vay");
  const [amount, setAmount] = useState("");
  const [contact, setContact] = useState("VDH");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const amountElm = useRef(null);
  const contactElm = useRef(null);
  const reasonElm = useRef(null);
  const typeElm = useRef(null);
  const [updating, setUpdating] = useState(false);

  const canSubmit = !updating && amount && contact && reason;

  async function submit() {
    if (!type) {
      typeElm.current.focus();
      return setError("No type specified.");
    }
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
        type,
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
    <MainLayout pageTitle="Create">
      <main className={styles.main}>
        <TopTitle>
          Create <span> Entry</span>
        </TopTitle>
        <TopDescription>What are you spending on?</TopDescription>

        <div className={styles.grid}>
          <label className={styles.card} htmlFor="type">
            <h3>Type</h3>
            <select
              ref={typeElm}
              id="tpe"
              name="type"
              value={type}
              onChange={onChangeInput(setType)}
            >
              {["Cho vay", "Nợ"].map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.card} htmlFor="amount">
            <h3>Amount</h3>
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
            <h3>Contact</h3>
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
            <h3>Reason</h3>
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
            <h3>Submit</h3>
            <p>{error}</p>
            <p>{success}</p>
          </button>
        </div>
      </main>
    </MainLayout>
  );
}
