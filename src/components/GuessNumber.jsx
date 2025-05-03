import React, { useReducer, useRef, useState } from "react";
import Button from "./Button";
import FormElement from "./FormElement";
import FeedBack from "./FeedBack";
import styles from "./GuessNumber.module.css";

const initialState = {
  guess: "",
  result: "?",
  score: 20,
  highScore: 0,
  messageType: "",
  attempt: 0,
  gameOver: false,
};

// * the Reducer function below handles the state and action object
// * that will update state depending on the handler function

function reducer(state, action) {
  switch (action.type) {
    case "guess":
      return { ...state, guess: action.payload };
    case "result":
      return { ...state, result: state.guess };
    case "highScore":
      return { ...state, highScore: state.guess };
    case "messageType":
      return { ...state, messageType: action.payload };
    case "score":
      return { ...state, score: state.score - 1 };
    case "reset":
      return {
        ...state,
        guess: "",
        result: "?",
        score: 20,
        highScore: 0,
        messageType: "",
      };
    default:
      return initialState;
  }
}

export default function GuessNumber() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const secretNumber = useRef(Math.trunc(Math.random() * 20 + 1)); //? changed to useRef...

  // const [guess, setGuess] = useState("");
  // const [result, setResult] = useState("?");
  // const [score, setScore] = useState(20);
  // const [highScore, setHighScore] = useState(0);
  // const [isChecked, setIsChecked] = useState(false);
  // const [isWrong, setIsWrong] = useState(false);

  // destructuring the object
  const { guess, result, score, highScore, messageType, gameOver } = state;

  function handleCheck() {
    // nothing happens when score is less than zero
    if (score <= 0) return;
    // console.log("guessssss", guess, secretNumber, score);

    if (guess === secretNumber.current) {
      dispatch({ type: "result" });
      dispatch({ type: "messageType", payload: "CORRECT NUMBER 🎉😉" });
      // setResult(guess);
      // setIsChecked(true);
      if (guess > highScore) {
        dispatch({ type: "highScore" });
        // setHighScore(guess);
      }
    } else if (guess < secretNumber.current) {
      dispatch({ type: "score" });
      dispatch({ type: "messageType", payload: "Too Low 📉" });
      // setScore((s) => s - 1);
      // setResult("?");
      // setIsWrong(true);
    } else {
      dispatch({ type: "score" });
      dispatch({ type: "messageType", payload: "Too High 📈" });
    }
  }

  function handleReset() {
    // ! manually mutated secretNumber, cos useRef doesnt re-render UI
    dispatch({ type: "reset" });
    secretNumber.current = Math.trunc(Math.random() * 20 + 1);

    // console.log(secretNumber);
    // setResult("?");
    // setGuess("");
    // setScore(20);
    // setIsChecked(false);
    // setsecretNumber(Math.trunc(Math.random() * 20 + 1));
    // setIsWrong(false);
    //setHighScore(0);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleCheck();
  }

  function handleChange(e) {
    // setGuess(Number(e.target.value));
    dispatch({ type: "guess", payload: Number(e.target.value) });
  }

  const buttons = [
    { label: "check", onClick: handleCheck },
    { label: "again", onClick: handleReset },
  ];
  // const isTooLow = guess && guess < secretNumber;
  // const isTooHigh = guess && guess > secretNumber;

  return (
    <div>
      <section className={styles.section}>
        <div className={styles.question}>{result}</div>

        <div>
          <aside>
            <FeedBack
              score={score}
              highScore={highScore}
              // isTooHigh={isTooHigh}
              // isTooLow={isTooLow}
              // isChecked={isChecked}
              // isWrong={isWrong}
              message={messageType}
            />
          </aside>
          <main>
            <FormElement
              onChange={handleChange}
              guess={guess}
              onSubmitGuess={handleSubmit}
            />
            {buttons.map((btn) => (
              <Button key={btn.label} btn={btn} />
            ))}
          </main>
        </div>
      </section>
    </div>
  );
}
