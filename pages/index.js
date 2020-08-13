import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🤑 My Money</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          My <span>Money</span> 🤑
        </h1>

        <p className={styles.description}>Simple money management.</p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h3>Create &rarr;</h3>
            <p>New money entry.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h3>List &rarr;</h3>
            <p>Show all your money entries.</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/master/examples"
            className={styles.card}
          >
            <h3>Summary &rarr;</h3>
            <p>A table worth a thousand words.</p>
          </a>

          <a
            href="https://vercel.com/import?filter=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h3>About &rarr;</h3>
            <p>Why this project?</p>
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
