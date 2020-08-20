import styles from "../styles/TopTitle.module.css";

export default function TopTitle({ children }) {
  return <h1 className={styles.title}>{children}</h1>;
}
