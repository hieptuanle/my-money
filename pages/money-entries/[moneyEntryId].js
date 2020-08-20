import { useRouter } from "next/router";
import styles from "../../styles/ViewMoneyEntry.module.css";
import { fetcher, putData, deleteData } from "../../lib/fetcher";
import { useState, useRef } from "react";
import MainLayout from "../../components/MainLayout";
import TopTitle from "../../components/TopTitle";
import TopDescription from "../../components/TopDescription";

export default function ViewMoneyEntry({ moneyEntry }) {
  const router = useRouter();
  const CONTACTS = ["VDH", "4handy", "Vy", "Dũng", "Khác"];
  const [amount, setAmount] = useState(moneyEntry.amount);
  const [type, setType] = useState(moneyEntry.type || "");
  const [contact, setContact] = useState(moneyEntry.contact || "");
  const [reason, setReason] = useState(moneyEntry.reason);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");
  const amountElm = useRef(null);
  const contactElm = useRef(null);
  const reasonElm = useRef(null);
  const typeElm = useRef(null);
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
      setSuccess("Success!");
    } catch (e) {
      setError(e.message);
    } finally {
      setUpdating(false);
    }

    setSuccess("Success!");
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

  function onChangeInput(changeFnc) {
    return function (e) {
      changeFnc(e.target.value);
      setError("");
      setSuccess("");
    };
  }

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
              value={type}
              onChange={onChangeInput(setType)}
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
              value={amount}
              placeholder="Eg: 30,000"
              onChange={onChangeInput(setAmount)}
            ></input>
          </label>

          <label className={styles.card} htmlFor="contact">
            <h3>Contact</h3>
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
            onClick={() => submit()}
            className={styles.card}
            disabled={!canSubmit}
          >
            <h3>Update</h3>
            <p>{error}</p>
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
