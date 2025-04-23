import React from "react";
import styles from "./FormElement.module.css";

function FormElement({ onSubmitGuess, guess, onChange }) {
  return (
    <form action="" onSubmit={onSubmitGuess}>
      <input
        type="number"
        name="number"
        id="number"
        min="0"
        max="20"
        className={styles.input}
        placeholder="Enter a number..."
        onChange={onChange}
        value={guess}
      />
    </form>
  );
}

export default FormElement;
