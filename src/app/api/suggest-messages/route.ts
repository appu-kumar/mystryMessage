import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    // const { messages } = await req.json();  frontend se message ni le rhe hai
    const prompt = `Create a list of three open-ended and engaging questions formatted by '||'. 
    These questions are for an anonymous social messaging platform, like  Qooh.me, and should be suitable for a diverse audience. 
    Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For 'what's a hobby you have recently started?||
    if you could have dinner with any historical figure, who would it be? || what's a simple thing that makes you happy?; . Ensure the questions are intringuing, 
    foster curiosity, and contribute toa positive and welcoming conversational environment.`;

    const result = streamText({
      model: openai("gpt-4o"),
      prompt,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.log("An unexpected error occured ", error);
    throw error;
  }
}
