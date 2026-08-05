import { NextResponse } from "next/server";
import { generateSummaryFromNotes } from "@/lib/ai-service";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const notes = body && typeof body === "object" && "notes" in body && typeof body.notes === "string" ? body.notes.trim() : "";

  if (!notes) {
    return NextResponse.json({ message: "Please provide student notes to summarize." }, { status: 400 });
  }

  try {
    const result = await generateSummaryFromNotes(notes);
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error && error.message.includes("invalid") ? "The AI returned an invalid summary response. Please try again." : "Summary generation failed. Please try again.",
      },
      { status: 502 },
    );
  }
}
