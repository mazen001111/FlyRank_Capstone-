import { NextResponse } from "next/server";
import { aiFailureResponse } from "@/lib/api-error";
import { generateTutorExplanation } from "@/lib/ai-service";
import type { StudyLevel } from "@/lib/ai-types";

const allowedLevels: StudyLevel[] = ["Beginner", "Intermediate", "Advanced"];

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const subject = body && typeof body === "object" && "subject" in body && typeof body.subject === "string" ? body.subject.trim() : "";
  const difficultyValue = body && typeof body === "object" && "difficulty" in body && typeof body.difficulty === "string" ? body.difficulty : "";
  const question = body && typeof body === "object" && "question" in body && typeof body.question === "string" ? body.question.trim() : "";

  if (!subject || !question) {
    return NextResponse.json({ message: "Please choose a subject and enter a question before asking the tutor." }, { status: 400 });
  }

  if (!allowedLevels.includes(difficultyValue as StudyLevel)) {
    return NextResponse.json({ message: "Please select a valid difficulty level." }, { status: 400 });
  }

  try {
    const result = await generateTutorExplanation({ subject, difficulty: difficultyValue as StudyLevel, question });
    return NextResponse.json(result);
  } catch (error) {
    return aiFailureResponse(
      error,
      "Tutor explanation failed. Please try again.",
      "The AI returned an invalid tutor response. Please try again.",
    );
  }
}
