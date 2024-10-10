import React, { useState } from "react";
import Button from "./Button";
import styles from "./GuessNumber.module.css";

export default function GuessNumber() {
  const [guess, setGuess] = useState("");
  const [result, setResult] = useState("?");
  const [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [isChecked, setIsChecked] = useState(false);
  const [secretNumber, setsecretNumber] = useState(
    Math.trunc(Math.random() * 20 + 1)
  );

  function handleCheck() {
    console.log("guessssss", guess, secretNumber, score);

    if (guess === secretNumber) {
      setResult(guess);
      setIsChecked(true);
      if (guess > highScore) {
        setHighScore(guess);
      }
    } else {
      setScore((s) => s - 1);
      setResult("?");
    }
  }

  function handleReset() {
    setResult("?");
    setGuess("");
    setScore(20);
    setIsChecked(false);
    setsecretNumber(Math.trunc(Math.random() * 20 + 1));
    //setHighScore(0);
  }

  const buttons = [
    { label: "check", onClick: handleCheck },
    { label: "again", onClick: handleReset },
  ];

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.question}>
          {guess == secretNumber ? result : "?"}
        </div>

        <div>
          <main>
            <input
              type="number"
              name="number"
              id="number"
              className={styles.input}
              placeholder="Enter a number..."
              onChange={(e) => setGuess(Number(e.target.value))}
              value={guess}
            />
          </main>
          <aside>
            <div>
              <p>{isChecked ? "Correct Number! 🎉" : "Start Guessing...🕸"}</p>
              <p>Score: {score}</p>
              <p>Highscore: {highScore}</p>
            </div>
            {buttons.map((btn) => (
              <Button key={btn.label} btn={btn} />
            ))}
          </aside>
        </div>
      </section>
    </div>
  );
}
