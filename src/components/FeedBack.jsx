import React from "react";

function FeedBack({ isTooLow, isTooHigh, score, highScore, isChecked }) {
  return (
    <div>
      <p>{isChecked ? "Correct Number! 🎉" : "Start Guessing...🕸"}</p>
      {isTooLow && <span>Too Low!</span>}
      {isTooHigh && <span>Too High!</span>}

      {/* <p>{feedBack}</p> */}

      {score > 1 ? (
        <span>You have {score} trials left</span>
      ) : (
        <span style={{ color: "red" }}>Game Over</span>
      )}
      {/* <p>You have {score} trials left</p> */}
      <p>Highscore is {highScore}</p>
    </div>
  );
}

export default FeedBack;
