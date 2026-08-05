import { NextResponse } from "next/server";
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
    return NextResponse.json(
      {
        message: error instanceof Error && error.message.includes("invalid") ? "The AI returned an invalid quiz response. Please try again." : "Quiz generation failed. Please try again.",
      },
      { status: 502 },
    );
  }
}
