import Head from "next/head";
import styles from "../styles/Home.module.css";
import Link from "next/link";

export default function Home() {
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
          My <span>Money</span> 🤑
        </h1>

        <p className={styles.description}>Simple money management.</p>

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

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Summary</h3>
            <p>A table worth a thousand words.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>Friends</h3>
            <p>We live in a social world.</p>
          </a>
        </div>
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
