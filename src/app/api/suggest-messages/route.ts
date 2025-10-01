import OpenAI from "openai";
import { NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// simple delay helper
const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export async function POST(req: Request) {
  try {
    const prompt =
      "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";

    let response;

    // retry up to 3 times if rate-limited
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 400,
        });
        break; // success, exit loop
      } catch (err: unknown) {
        if ((err as { status?: number }).status === 429 && attempt < 3) {
          console.warn(`Rate limit hit. Retrying in ${attempt} sec...`);
          await delay(1000 * attempt);
        } else {
          throw err;
        }
      }
    }

    const text = response?.choices?.[0]?.message?.content?.trim() || "";

    // fallback in case OpenAI returns empty
    const finalText =
      text ||
      "What’s your favorite movie?||If you could learn any skill instantly, what would it be?||What’s the best trip you’ve ever taken?";

    return NextResponse.json({ text: finalText });
  } catch (error: unknown) {
    console.error("Error fetching suggestions:", error);

    // fallback response (never let frontend break)
    return NextResponse.json(
      {
        text: "What’s your favorite movie?||If you could learn any skill instantly, what would it be?||What’s the best trip you’ve ever taken?",
        error: error instanceof Error ? error.message : "Unexpected error",
      },
      { status: 200 } // still return success so UI doesn't break
    );
  }
}
