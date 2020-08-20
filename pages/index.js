import styles from "../styles/Home.module.css";
import Link from "next/link";
import MainLayout from "../components/MainLayout";
import TopTitle from "../components/TopTitle";
import TopDescription from "../components/TopDescription";

export default function Home() {
  return (
    <MainLayout pageTitle="My Money">
      <>
        <TopTitle>
          My <span>Money</span> 🤑
        </TopTitle>
        <TopDescription showBackButton={false}>
          Simple money management.
        </TopDescription>

        <div className={styles.grid}>
          <Link href="/money-entries/create">
            <a className={styles.card}>
              <h3>Create</h3>
              <p>New money entry.</p>
            </a>
          </Link>

          <Link href="/money-entries">
            <a className={styles.card}>
              <h3>List</h3>
              <p>Show all your money entries.</p>
            </a>
          </Link>

          <Link href="/money-entries/summary">
            <a className={styles.card}>
              <h3>Summary</h3>
              <p>A table worth a thousand words.</p>
            </a>
          </Link>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Friends</h3>
            <p>We live in a social world.</p>
          </a>
        </div>
      </>
    </MainLayout>
  );
}
