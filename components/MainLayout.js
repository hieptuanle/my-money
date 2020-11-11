import React from "react";
import Head from "next/head";
import styles from "../styles/MainLayout.module.css";
import { signIn, signOut, singOut, useSession } from "next-auth/client";
import TopTitle from "./TopTitle";
import Spinner from "./Spinner";

export default function MainLayout({ children, pageTitle, hasMinWidth }) {
  const [session, loading] = useSession();
  if (loading && !session)
    return (
      <div>
        <Spinner />
      </div>
    );
  return (
    <div className={`${styles.container} ${hasMinWidth ? styles.min600 : ""}`}>
      <Head>
        <title>{pageTitle}</title>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        ></link>
      </Head>
      {session ? (
        <main className={`${styles.main} ${hasMinWidth ? styles.min600 : ""}`}>
          {children}
        </main>
      ) : (
        <main className={`${styles.main} ${hasMinWidth ? styles.min600 : ""}`}>
          <TopTitle>
            My <span>Money</span> 🤑
          </TopTitle>
          <div style={{ marginTop: "5em" }}>
            <button onClick={signIn} className={styles.signIn}>
              Sign in
            </button>
          </div>
        </main>
      )}

      <footer className={styles.footer}>
        <a
          href="https://twitter.com/hieptuanle5"
          target="_blank"
          rel="noopener noreferrer"
        >
          From Hiep Le.{" "}
        </a>
        &nbsp;
        {session ? (
          <button
            className={styles.signOut}
            onClick={() => {
              signOut().then(() => {
                window.location.reload();
              });
            }}
          >
            Sign Out
          </button>
        ) : null}
      </footer>
    </div>
  );
}
