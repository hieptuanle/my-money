import React from "react";
import Head from "next/head";
import styles from "../styles/MainLayout.module.css";

export default function MainLayout({ children, pageTitle }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{pageTitle}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        ></link>
      </Head>

      <main className={styles.main}>{children}</main>
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
