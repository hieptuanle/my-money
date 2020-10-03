import { useRouter } from "next/router";
import styles from "../../styles/ViewMoneyEntry.module.css";
import { putData, deleteData } from "../../lib/fetcher";
import { useState, useRef, useEffect } from "react";
import MainLayout from "../../components/MainLayout";
import TopTitle from "../../components/TopTitle";
import TopDescription from "../../components/TopDescription";
import { useSession } from "next-auth/client";
import Spinner from "../../components/Spinner";

export default function ViewMoneyEntry({ params }) {
  const { session, loading } = useSession();
  const [moneyEntry, setMoneyEntry] = useState({
    type: "",
    amount: "",
    contact: "",
    reason: "",
  });
  const router = useRouter();
  const CONTACTS = ["VDH", "4handy", "Vy", "Dũng", "Khác"];
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const amountElm = useRef(null);
  const contactElm = useRef(null);
  const reasonElm = useRef(null);
  const typeElm = useRef(null);
  const [updating, setUpdating] = useState(false);
  const canSubmit =
    !updating &&
    moneyEntry.type &&
    moneyEntry.amount &&
    moneyEntry.contact &&
    moneyEntry.reason;

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/money-entries/" + params.moneyEntryId);
      const moneyEntry = await res.json();
      moneyEntry.contact = moneyEntry.contact || "";
      moneyEntry.type = moneyEntry.type || "";
      moneyEntry.amount = moneyEntry.amount || "";
      moneyEntry.reason = moneyEntry.reason || "";
      setMoneyEntry(moneyEntry);
    };
    fetchData();
  }, [session]);

  async function submit() {
    if (!moneyEntry.amount) {
      amountElm.current.focus();
      return setError("No amount specified.");
    }
    if (!moneyEntry.contact) {
      contactElm.current.focus();
      return setError("No contact specified.");
    }
    if (!moneyEntry.reason) {
      reasonElm.current.focus();
      return setError("No reason specified.");
    }
    setUpdating(true);
    try {
      const res = await putData("/api/money-entries/" + moneyEntry._id, {
        type: moneyEntry.type,
        amount: moneyEntry.amount,
        contact: moneyEntry.contact,
        reason: moneyEntry.reason,
      });
      setSuccess("Success!");
      setTimeout(() => {
        setSuccess("");
      }, 2000);
    } catch (e) {
      setError(e.message);
      setTimeout(() => {
        setError("");
      }, 2000);
    } finally {
      setUpdating(false);
    }
  }

  async function remove() {
    setUpdating(true);
    try {
      await deleteData("/api/money-entries/" + moneyEntry._id);
      setDeleteSuccess("Success!");
      router.push("/money-entries");
    } catch (e) {
      setDeleteError(e.message);
    } finally {
      setUpdating(false);
    }
  }

  function onChangeValue(field) {
    return function (e) {
      const newMoneyEntry = {
        ...moneyEntry,
        [field]: e.target.value,
      };
      setMoneyEntry(newMoneyEntry);
    };
  }

  if (!moneyEntry._id) return <Spinner></Spinner>;

  return (
    <MainLayout pageTitle="View">
      <main className={styles.main}>
        <TopTitle>
          View <span> {moneyEntry._id.slice(-4)}</span>
        </TopTitle>
        <TopDescription>Wanna change something?</TopDescription>

        <div className={styles.grid}>
          <label className={styles.card} htmlFor="type">
            <h3>Type</h3>
            <select
              ref={typeElm}
              id="type"
              name="type"
              value={moneyEntry.type}
              onChange={onChangeValue("type")}
            >
              {["Cho vay", "Nợ", ""].map((type) => (
                <option key={type} value={type}>
                  {type || "<Select one>"}
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
              value={moneyEntry.amount}
              placeholder="Eg: 30,000"
              onChange={onChangeValue("amount")}
            ></input>
          </label>

          <label className={styles.card} htmlFor="contact">
            <h3>Contact</h3>
            <select
              ref={contactElm}
              id="contact"
              name="contact"
              value={moneyEntry.contact}
              onChange={onChangeValue("contact")}
            >
              {CONTACTS.concat("").map((contact) => (
                <option key={contact} value={contact}>
                  {contact || "<Select one>"}
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
              value={moneyEntry.reason}
              placeholder="Eg: Breakfast"
              onChange={onChangeValue("reason")}
            ></input>
          </label>

          <button
            onClick={() => submit()}
            className={styles.card}
            disabled={!canSubmit}
          >
            <h3>Update</h3>
            <p style={{ color: "red" }}>{error}</p>
            <p>{success}</p>
          </button>

          <button
            className={styles["delete-button"] + " " + styles.card}
            onClick={() => {
              if (
                window.confirm(
                  "Do you really want to delete this entry? This action CANNOT be undone."
                )
              ) {
                remove();
              }
            }}
          >
            <h3>Delete</h3>
            <p>{deleteError}</p>
            <p>{deleteSuccess}</p>
          </button>
        </div>
      </main>
    </MainLayout>
  );
}

// params will contain the id for each generated page.
export async function getServerSideProps({ params }) {
  return {
    props: {
      params,
    },
  };
}
