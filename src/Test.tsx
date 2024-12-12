import { useEffect, useState } from "react";
import { runThread, question, submit } from "./Class/ai";
import skills from "./Class/skills";
import score from "./Class/score";
import "./Layout/App.css";
async function sceneBuild(
  answer: string,
  setAquestion: Function,
  setType: Function,
  setOptions: Function
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

  useEffect(() => {
    console.log(answer);
    sceneBuild(answer, setAquestion, setType, setOptions).then(() => {
      if (!type) {
        setChecked([false, false, false, false]);
      }
    });
    return () => {};
  }, [answer]);

  useEffect(() => {
    if (aquestion !== "") {
      setMainDisplay("mainDisplay");
      setDisable(false);
    }
    return () => {};
  }, [aquestion]);

  function updateChecked(index: number) {
    const newChecked = [false, false, false, false];
    newChecked[index] = true;
    setChecked(newChecked);
  }

  return (
    <div>
      <h2 className={mainDisplay}>{aquestion}</h2>
      <br></br>
      <div className="score">
        <div>
          <input
            type={type ? "text" : "radio"}
            id="answer"
            className={
              (type ? "mainAnsText" : "mainAnsRadio") +
              " " +
              (mainDisplay === "hide" ? "hide" : type ? "hide" : "show")
            }
            checked={checked[0]}
            onChange={() => {
              updateChecked(0);
            }}
            name="answer"></input>
          <label
            id="label0"
            htmlFor="answer"
            className={
              mainDisplay === "hide" ? "hide" : type ? "hide" : "show"
            }>
            {options[0]}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="answer1"
            className={mainDisplay === "hide" ? "hide" : type ? "hide" : "show"}
            checked={checked[1]}
            onChange={() => {
              updateChecked(1);
            }}
            name="answer"></input>
          <label
            id="label1"
            htmlFor="answer1"
            className={
              mainDisplay === "hide" ? "hide" : type ? "hide" : "show"
            }>
            {options[1]}
          </label>
        </div>
      </div>
      <br></br>
      <div className="score">
        <div>
          <input
            type="radio"
            id="answer2"
            className={mainDisplay === "hide" ? "hide" : type ? "hide" : "show"}
            checked={checked[2]}
            onChange={() => {
              updateChecked(2);
            }}
            name="answer"></input>
          <label
            id="label2"
            htmlFor="answer2"
            className={
              mainDisplay === "hide" ? "hide" : type ? "hide" : "show"
            }>
            {options[2]}
          </label>
        </div>
        <div>
          <input
            type="radio"
            id="answer3"
            className={mainDisplay === "hide" ? "hide" : type ? "hide" : "show"}
            checked={checked[3]}
            onChange={() => {
              updateChecked(3);
            }}
            name="answer"></input>
          <label
            id="label3"
            htmlFor="answer3"
            className={
              mainDisplay === "hide" ? "hide" : type ? "hide" : "show"
            }>
            {options[3]}
          </label>
        </div>
      </div>
      <br></br>
      <div className={mainDisplay} style={{ textAlign: "center" }}>
        <button
          id="button"
          className="submit"
          disabled={disable}
          onClick={async () => {
            let value = "";
            switch (type) {
              case true:
                value = (document.getElementById("answer") as HTMLInputElement)
                  .value;
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
      <h1
        className="popup"
        style={{ display: mainDisplay == "hide" ? "flex" : "none" }}>
        Loading...
      </h1>
    </div>
  );
}

export default test;
