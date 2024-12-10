import { useState } from "react";
import { Link } from "wouter";
import OpenAI from "openai";
import score from "./classes/score";

import "./App.css";
let key = window.prompt("Enter your OpenAI API key:");
if (key == null) key = "";
const client = new OpenAI({
  apiKey: key,
  dangerouslyAllowBrowser: true,
});

export function test() {
  return (
    <div>
      <h1>Test</h1>
      <button onClick={main}>Test</button>
    </div>
  );
}

export default test;

async function main() {
  const stream = await client.chat.completions.create({
    model: "gpt-4o",
    messages: [
      { role: "user", content: "Translate 'How are you' to Japanese" },
    ],
    stream: true,
  });
  for await (const chunk of stream) {
    console.log(chunk.choices[0].delta.content);
  }
}
