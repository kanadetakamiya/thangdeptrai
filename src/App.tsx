import { useState } from "react";
import { Router, Route, Link } from "wouter";
import "./App.css";

function home() {
  const [lisScore, setLisScore] = useState(6.5);
  const [readScore, setReadScore] = useState(6.5);
  const [writeScore, setWriteScore] = useState(6.5);
  const [speakScore, setSpeakScore] = useState(6.5);
  const [totalScore, setTotalScore] = useState(6.5);
  enum skills {
    LIS,
    READ,
    WRITE,
    SPEAK,
  }
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
              {(Math.round(lisScore * 10) / 10).toFixed(1)}
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
              {(Math.round(readScore * 10) / 10).toFixed(1)}
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
              {(Math.round(writeScore * 10) / 10).toFixed(1)}
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
              {(Math.round(speakScore * 10) / 10).toFixed(1)}
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
        <button
          style={{
            fontSize: "larger",
            backgroundColor: "white",
            cursor: "pointer",
          }}
          onClick={() => {}}>
          <Link to="/test" style={{ color: "#333" }}>
            I haven't taken the test (Test now)
          </Link>
        </button>
        <button className="submit" style={{ cursor: "pointer" }}>
          <Link to="/home">Submit</Link>
        </button>
      </div>
    </div>
  );
}

function test() {
  console.log();
  return (
    <div>
      <h1>Test</h1>
    </div>
  );
}

function placeHolder() {
  return (
    <div>
      <h1>Home</h1>
    </div>
  );
}
function App() {
  return (
    <Router>
      <Route path="/" component={home} />
      <Route path="/test" component={test} />
      <Route path="/home" component={placeHolder} />
    </Router>
  );
}

export default App;
