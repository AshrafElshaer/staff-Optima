import { env } from "@/env.mjs";
import { candidateSchema } from "@/lib/ai/candidate.schema";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { openai } from "@ai-sdk/openai";
import { generateObject } from "ai";
import { z } from "zod";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;
const google = createGoogleGenerativeAI({
  apiKey: env.NEXT_PUBLIC_GOOGLE_GENERATIVE_AI_API_KEY,
});

export async function POST(req: Request) {
  const formData = await req.formData();
  const resume = formData.get("resume") as File;

  const result = await generateObject({
    model: google("gemini-1.5-flash"),
    schema: candidateSchema,
    system:
      "Extract candidate information from this resume. Be concise and factual. " +
      "For missing data: use null data type for optional fields, empty arrays for array fields, " +
      "and empty objects for object fields. " +
      "The output must include text describing the candidate's background." +
      "if the gradation date is not available, set it to null data type",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: "Please analyze this resume and extract the candidate information.",
          },
          {
            type: "file",
            data: await resume.arrayBuffer(),
            mimeType: "application/pdf",
          },
        ],
      },
    ],
  });

  return new Response(JSON.stringify(result.object));
}
