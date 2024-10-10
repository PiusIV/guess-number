import React from "react";
import styles from "../components/Button.module.css";

function Button({ btn }) {
  return (
    <button onClick={btn.onClick} className={styles.button}>
      {btn.label}
    </button>
  );
}

export default Button;
