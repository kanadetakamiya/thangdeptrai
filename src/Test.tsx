import { useEffect, useState } from "react";
import { runThread, question, submit } from "./Class/ai";
import skills from "./Class/skills";
import score from "./Class/score";
import "./Layout/App.css";
import { Link } from "wouter";
async function sceneBuild(
  answer: string,
  setAquestion: Function,
  setType: Function,
  setOptions: Function,
  setEstimation: Function,
  setNotes: Function
) {
  let message = "";
  async function process() {
    await submit(answer);
    await runThread();
    message = await question();
  }

  await process();
  const cur = JSON.parse(message);
  switch (cur.type.type) {
    case "question":
      console.log(cur.type.thought);
      setAquestion(cur.type.question.question);
      switch (cur.type.question.type) {
        case "multiple-choice":
          setType(false);
          setOptions(cur.type.question.options);
          break;
        case "open-ended":
          setType(true);
      }
      break;
    case "assessment":
      setEstimation(cur.type.correctedEstimation);
      setNotes(cur.type.notes);
      break;
    default:
      console.log(cur.type);
  }
}

function test() {
  const [answer, setAnswer] = useState(
    "My IELTS score is " + score[skills.TOTAL] + "."
  );
  const [aquestion, setAquestion] = useState("");
  const [type, setType] = useState(false);
  const [options, setOptions] = useState(["", "", "", ""]);
  const [mainDisplay, setMainDisplay] = useState("hide");
  const [disable, setDisable] = useState(false);
  const [checked, setChecked] = useState([false, false, false, false]);
  const [estimation, setEstimation] = useState(0);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    console.log(answer);
    sceneBuild(
      answer,
      setAquestion,
      setType,
      setOptions,
      setEstimation,
      setNotes
    ).then(() => {
      if (!type) {
        setChecked([false, false, false, false]);
      }
    });
    return () => {};
  }, [answer]);

  useEffect(() => {
    if (aquestion !== "") {
      setMainDisplay("mainDisplay");
      (document.getElementById("textAns") as HTMLInputElement).value = "";
      setDisable(false);
    }
    return () => {};
  }, [aquestion, options, type]);

  function updateChecked(index: number) {
    const newChecked = [false, false, false, false];
    newChecked[index] = true;
    setChecked(newChecked);
  }

  return (
    <div>
      <h1 className={mainDisplay == "hide" ? "mainDisplay" : "hide"}>
        Loading...
      </h1>
      <div className={notes == "" ? mainDisplay : "hide"}>
        <h2>{aquestion}</h2>
        <br></br>
        <div id="answers">
          <div id="radioAns" className={type ? "hide" : "mainDisplay"}>
            <table style={{ maxWidth: "100%", margin: "auto" }}>
              <tbody>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="answer0"
                      checked={checked[0]}
                      disabled={disable}
                      onChange={() => {
                        updateChecked(0);
                      }}
                      name="answer"></input>
                  </td>
                  <td className="options">
                    <label id="label0" htmlFor="answer0">
                      {options[0]}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="answer1"
                      checked={checked[1]}
                      disabled={disable}
                      onChange={() => {
                        updateChecked(1);
                      }}
                      name="answer"></input>
                  </td>
                  <td className="options">
                    <label id="label1" htmlFor="answer1">
                      {options[1]}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="answer2"
                      checked={checked[2]}
                      disabled={disable}
                      onChange={() => {
                        updateChecked(2);
                      }}
                      name="answer"></input>
                  </td>
                  <td className="options">
                    <label id="label2" htmlFor="answer2">
                      {options[2]}
                    </label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input
                      type="radio"
                      id="answer3"
                      checked={checked[3]}
                      disabled={disable}
                      onChange={() => {
                        updateChecked(3);
                      }}
                      name="answer"></input>
                  </td>
                  <td className="options">
                    <label id="label3" htmlFor="answer3">
                      {options[3]}
                    </label>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <textarea
            id="textAns"
            className={type ? "mainDisplay" : "hide"}
            rows={8}
            autoFocus={true}
            disabled={disable}
            style={{ resize: "none", width: "100%", margin: "auto" }}
            placeholder="Type your answer here"></textarea>
        </div>
        <br></br>
        <div style={{ textAlign: "center" }}>
          <button
            id="button"
            className="submit"
            disabled={disable}
            onClick={async () => {
              let value = "";
              switch (type) {
                case true:
                  value = (
                    document.getElementById("textAns") as HTMLInputElement
                  ).value;

                  break;
                case false:
                  let i = 0;
                  for (; i < 4; i++) {
                    if (checked[i]) {
                      value = options[i];
                      break;
                    }
                  }
                  if (i === 4) {
                    value = "";
                  }
                  break;
              }
              setDisable(true);
              setAnswer(value);
            }}>
            Submit
          </button>
        </div>
      </div>
      <div className={notes == "" ? "hide" : "mainDisplay"}>
        <h1>Estimation: {estimation}</h1>
        <br></br>
        <p style={{ fontSize: "20px" }}>
          <strong>Notes:</strong> {notes}
        </p>
        <br></br>
        <Link to="/home">
          <button className="submit">Home</button>
        </Link>
      </div>
    </div>
  );
}

export default test;
