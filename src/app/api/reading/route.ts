import Anthropic from "@anthropic-ai/sdk";
import { NextResponse } from "next/server";

const MODEL = "claude-haiku-4-5-20251001";
const MAX_QUESTION_LENGTH = 400;

export async function POST(request: Request) {
  const { question, cardTitle, suitName, fragment } = await request.json();

  if (
    typeof question !== "string" ||
    typeof cardTitle !== "string" ||
    typeof suitName !== "string" ||
    typeof fragment !== "string"
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const trimmedQuestion = question.trim().slice(0, MAX_QUESTION_LENGTH);

  const client = new Anthropic();

  const message = await client.messages.create({
    model: MODEL,
    max_tokens: 200,
    system:
      "You write short, grounded oracle-card readings. You're given a card " +
      "(title, suit/category, and a fragment drawn from someone's personal " +
      "notes) plus a visitor's question. Write 2-4 sentences that connect the " +
      "fragment to the question — loose and suggestive like a tarot reading, " +
      "not literal advice, but never generic enough to apply to any card. " +
      "Don't restate the question. No preamble, no sign-off, just the reading.",
    messages: [
      {
        role: "user",
        content:
          `Card: ${cardTitle} (${suitName})\n` +
          `Fragment: ${fragment}\n` +
          (trimmedQuestion
            ? `Visitor's question: ${trimmedQuestion}`
            : "Visitor drew this card with no question in mind — read it as a general reflection."),
      },
    ],
  });

  const reading = message.content
    .filter((block) => block.type === "text")
    .map((block) => block.text)
    .join("\n")
    .trim();

  return NextResponse.json({ reading });
}
