import { useState } from "react";
import { Link } from "wouter";
import score from "./Class/score";
import skills from "./Class/skills";

import "./Layout/App.css";

export function onboard() {
  const [lisScore, setLisScore] = useState(5.0);
  const [readScore, setReadScore] = useState(5.0);
  const [writeScore, setWriteScore] = useState(5.0);
  const [speakScore, setSpeakScore] = useState(5.0);
  const [totalScore, setTotalScore] = useState(5.0);
  enum signs {
    PLUS,
    MINUS,
  }
  function getScore(skill: skills) {
    switch (skill) {
      case skills.LIS:
        return lisScore;
      case skills.READ:
        return readScore;
      case skills.WRITE:
        return writeScore;
      case skills.SPEAK:
        return speakScore;
      default:
        throw new Error("Invalid skill");
    }
  }
  function adjust(skill: skills, sign: signs) {
    switch (sign) {
      case signs.PLUS:
        if (getScore(skill) < 9) {
          switch (skill) {
            case skills.LIS:
              setLisScore(lisScore + 0.5);
              break;
            case skills.READ:
              setReadScore(readScore + 0.5);
              break;
            case skills.WRITE:
              setWriteScore(writeScore + 0.5);
              break;
            case skills.SPEAK:
              setSpeakScore(speakScore + 0.5);
              break;
          }
        }
        break;
      case signs.MINUS:
        if (getScore(skill) > 1) {
          switch (skill) {
            case skills.LIS:
              setLisScore(lisScore - 0.5);
              break;
            case skills.READ:
              setReadScore(readScore - 0.5);
              break;
            case skills.WRITE:
              setWriteScore(writeScore - 0.5);
              break;
            case skills.SPEAK:
              setSpeakScore(speakScore - 0.5);
              break;
          }
        }
    }
    setTotalScore(
      Math.round((lisScore + readScore + writeScore + speakScore) / 2) / 2
    );
  }
  function slide(skill: skills, value: number) {
    switch (skill) {
      case skills.LIS:
        setLisScore(value);
        break;
      case skills.READ:
        setReadScore(value);
        break;
      case skills.WRITE:
        setWriteScore(value);
        break;
      case skills.SPEAK:
        setSpeakScore(value);
        break;
    }
    setTotalScore(
      Math.round((lisScore + readScore + writeScore + speakScore) / 2) / 2
    );
  }
  return (
    <div>
      <h1 style={{ fontSize: "xxx-large", padding: "1rem" }}>
        Let us know your recent IELTS score
      </h1>
      <div className="score">
        <div>
          <h2 style={{ fontSize: "xx-large" }}>Listening</h2>
          <h1>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.LIS, signs.MINUS)}>
              -
            </button>
            <span
              style={{
                verticalAlign: "middle",
                margin: "1.5rem",
              }}>
              {lisScore.toFixed(1)}
            </span>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.LIS, signs.PLUS)}>
              +
            </button>
          </h1>
          <input
            type="range"
            className="slider"
            min="1"
            max="9"
            step="0.5"
            value={lisScore}
            onInput={(e) =>
              slide(skills.LIS, parseFloat(e.currentTarget.value))
            }></input>
        </div>
        <div>
          <h2 style={{ fontSize: "xx-large" }}>Reading</h2>
          <h1>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.READ, signs.MINUS)}>
              -
            </button>
            <span
              style={{
                verticalAlign: "middle",
                margin: "1.5rem",
              }}>
              {readScore.toFixed(1)}
            </span>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.READ, signs.PLUS)}>
              +
            </button>
          </h1>
          <input
            type="range"
            className="slider"
            min="1"
            max="9"
            step="0.5"
            value={readScore}
            onInput={(e) =>
              slide(skills.READ, parseFloat(e.currentTarget.value))
            }></input>
        </div>
      </div>
      <div className="score">
        <div>
          <h2 style={{ fontSize: "xx-large" }}>Writing</h2>
          <h1>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.WRITE, signs.MINUS)}>
              -
            </button>
            <span
              style={{
                verticalAlign: "middle",
                margin: "1.5rem",
              }}>
              {writeScore.toFixed(1)}
            </span>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.WRITE, signs.PLUS)}>
              +
            </button>
          </h1>
          <input
            type="range"
            className="slider"
            min="1"
            max="9"
            step="0.5"
            value={writeScore}
            onInput={(e) =>
              slide(skills.WRITE, parseFloat(e.currentTarget.value))
            }></input>
        </div>
        <div>
          <h2 style={{ fontSize: "xx-large" }}>Speaking</h2>
          <h1>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.SPEAK, signs.MINUS)}>
              -
            </button>
            <span
              style={{
                verticalAlign: "middle",
                margin: "1.5rem",
              }}>
              {speakScore.toFixed(1)}
            </span>
            <button
              style={{ verticalAlign: "middle" }}
              onClick={() => adjust(skills.SPEAK, signs.PLUS)}>
              +
            </button>
          </h1>
          <input
            type="range"
            className="slider"
            min="1"
            max="9"
            step="0.5"
            value={speakScore}
            onInput={(e) =>
              slide(skills.SPEAK, parseFloat(e.currentTarget.value))
            }></input>
        </div>
      </div>
      <h2 style={{ fontSize: "xx-large" }}>
        Your overall: {(Math.round(totalScore * 10) / 10).toFixed(1)}
      </h2>
      <div>
        <Link to="/test">
          <button
            style={{
              fontSize: "x-large",
              marginRight: "0.5rem",
            }}
            onClick={() => {
              saveScore(0, 0, 0, 0, 0);
            }}>
            I haven't taken the test (Test now)
          </button>{" "}
        </Link>
        <button
          className="submit"
          style={{ fontSize: "x-large", marginLeft: "0.5rem" }}
          onClick={() => {
            document.getElementById("popup")!.style.display = "flex";

            saveScore(lisScore, readScore, writeScore, speakScore, totalScore);
          }}>
          Submit
        </button>
      </div>
      <div className="popup" id="popup">
        <div
          style={{
            backgroundColor: "white",
            padding: "2rem",
            borderRadius: "1rem",
          }}>
          <h2 style={{ paddingBottom: "1rem", fontSize: "xx-large" }}>
            Do you want to try our mock test?
          </h2>
          <Link to="/home">
            <button style={{ marginRight: "0.5rem" }}>No</button>{" "}
          </Link>{" "}
          <Link to="/test">
            <button className="submit">Yes</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function saveScore(
  lisScore: number,
  readScore: number,
  writeScore: number,
  speakScore: number,
  totalScore: number
) {
  score[skills.LIS] = lisScore;
  score[skills.READ] = readScore;
  score[skills.WRITE] = writeScore;
  score[skills.SPEAK] = speakScore;
  score[skills.TOTAL] = totalScore;
}

export default onboard;
