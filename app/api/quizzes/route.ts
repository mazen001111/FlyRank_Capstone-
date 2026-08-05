import { NextResponse } from "next/server";
import { aiFailureResponse } from "@/lib/api-error";
import { generateQuizFromTopic } from "@/lib/ai-service";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const input = body && typeof body === "object" && "input" in body && typeof body.input === "string" ? body.input.trim() : "";

  if (!input) {
    return NextResponse.json({ message: "Please provide a topic or notes to build the quiz." }, { status: 400 });
  }

  try {
    const result = await generateQuizFromTopic(input);
    return NextResponse.json(result);
  } catch (error) {
    return aiFailureResponse(
      error,
      "Quiz generation failed. Please try again.",
      "The AI returned an invalid quiz response. Please try again.",
    );
  }
}
