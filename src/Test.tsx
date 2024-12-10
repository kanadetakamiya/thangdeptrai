import { useState } from "react";
import { Link } from "wouter";
import OpenAI from "openai";

import score from "./classes/score";
import apiKey from "./key.json";
import "./App.css";

export function test() {
  async function main() {
    const client = new OpenAI({
      apiKey: apiKey.key,
      dangerouslyAllowBrowser: true,
    });
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
  return (
    <div>
      <h1>Test</h1>
      <button onClick={main}>Test</button>
    </div>
  );
}

export default test;
