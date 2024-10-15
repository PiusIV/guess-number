import React from "react";
import styles from "./FormElement.module.css";

function FormElement({ handleSubmit, guess, handleChange }) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <input
        type="number"
        name="number"
        id="number"
        min="0"
        max="20"
        className={styles.input}
        placeholder="Enter a number..."
        onChange={handleChange}
        value={guess}
      />
    </form>
  );
}

export default FormElement;
