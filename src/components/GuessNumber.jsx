import React, { useState } from "react";
import Button from "./Button";
import FormElement from "./FormElement";
import FeedBack from "./FeedBack";
import styles from "./GuessNumber.module.css";

export default function GuessNumber() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("?");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [isWrong, setIsWrong] = useState(false);

  const [secretNumber, setsecretNumber] = useState(
    Math.trunc(Math.random() * 20 + 1)
  );

  function handleCheck() {
    // nothing happens when score is less than zero
    if (score <= 0) return;
    console.log("guessssss", guess, secretNumber, score);

    if (guess === secretNumber) {
      setResult(guess);
      setIsChecked(true);
      if (guess > highScore) {
        setHighScore(guess);
      }
    } else {
      setScore((s) => s - 1);
      // setResult("?");
      setIsWrong(true);
    }
  }

  function handleReset() {
    setResult("?");
    setGuess("");
    setScore(20);
    setIsChecked(false);
    setsecretNumber(Math.trunc(Math.random() * 20 + 1));
    setIsWrong(false);
    //setHighScore(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCheck();
  }

  function handleChange(e) {
    setGuess(Number(e.target.value));
  }

  const buttons = [
    { label: "check", onClick: handleCheck },
    { label: "again", onClick: handleReset },
  ];

  const isTooLow = guess && guess < secretNumber;
  const isTooHigh = guess && guess > secretNumber;

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.question}>{result}</div>

        <div>
          <main>
            <FormElement
              handleChange={handleChange}
              guess={guess}
              handleSubmit={handleSubmit}
            />
          </main>
          <aside>
            <FeedBack
              score={score}
              highScore={highScore}
              isTooHigh={isTooHigh}
              isTooLow={isTooLow}
              isChecked={isChecked}
              isWrong={isWrong}
            />

            {buttons.map((btn) => (
              <Button key={btn.label} btn={btn} />
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
