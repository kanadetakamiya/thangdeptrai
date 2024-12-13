import OpenAI from "openai";
import apiKey from "./key.json";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod.mjs";

const prompt = `You are a professional English as a foreign language teacher.
You must ask a series of questions to determine the level of a new learner.
The learner will start by providing a test result for IELTS.
If they said that their IELTS score is 0, that means they have never taken an IELTS test.
The questions must be relevant to the level of the learner.
Also check if the learner possesses higher or lower level than the inputted test result.

Before giving any question, generate some thoughts on what needs to be asked.
After about 10 questions and answers, generate an assessment on the corrected estimation of the score and some notes about weaknesses and strengths of the learner.

Ask simple questions that can be answered using a word or 1-2 sentences.
There will be 7 multiple-choice questions and 3 open-ended questions.
The multiple-choice questions should have 4 options but only 1 answer.

Make sure to include simple questions that can test vocabulary and grammar understanding of the learner, as well as questions on ideation and complicated usage of the language.`;

const format = z.object({
  type: z.union([
    z.object({
      type: z.literal("question"),
      thought: z.string(),
      question: z.union([
        z.object({
          type: z.literal("multiple-choice"),
          question: z.string(),
          options: z.array(z.string()),
        }),
        z.object({
          type: z.literal("open-ended"),
          question: z.string(),
        }),
      ]),
    }),
    z.object({
      type: z.literal("assessment"),
      correctedEstimation: z.number(),
      notes: z.string(),
    }),
  ]),
});

const client = new OpenAI({
  apiKey: apiKey.key,
  dangerouslyAllowBrowser: true,
});

const onboardingAI = client.beta;

const assistant = await onboardingAI.assistants.create({
  model: "gpt-4o-2024-08-06",
  name: "onboarding_test",
  temperature: 0.2,
  instructions: prompt,
  response_format: zodResponseFormat(format, "onboarding_test"),
});

const thread = await onboardingAI.threads.create({});

export async function runThread() {
  let run = await onboardingAI.threads.runs.createAndPoll(thread.id, {
    assistant_id: assistant.id,
  });
  while (run.status !== "completed") {
    continue;
  }
  return run;
}

export async function submit(content: string) {
  return await onboardingAI.threads.messages.create(thread.id, {
    role: "user",
    content: content,
  });
}

export async function question() {
  const list = await onboardingAI.threads.messages.list(thread.id, {
    limit: 1,
  });
  const message = list.data[0];
  if (message.role == "assistant") {
    const content = message.content[0];
    if (content.type == "text") {
      return content.text.value;
    }
  }
  throw new Error("Invalid message");
}