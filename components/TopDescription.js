import styles from "../styles/TopDescription.module.css";
import BackButton from "./BackButton";

export default function TopDescription({ children, showBackButton = true }) {
  return (
    <p className={styles.description}>
      {!!showBackButton && <BackButton />} {children}
    </p>
  );
}
