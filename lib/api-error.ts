import { NextResponse } from "next/server";

export function aiFailureResponse(error: unknown, fallbackMessage: string, invalidMessage: string) {
  if (error instanceof Error && error.message.includes("GEMINI_API_KEY")) {
    return NextResponse.json(
      { message: "AI is not configured. Set GEMINI_API_KEY in your environment and restart the server." },
      { status: 503 },
    );
  }

  if (
    error instanceof Error &&
    (error.message.toLowerCase().includes("unavailable") || error.message.toLowerCase().includes("quota"))
  ) {
    return NextResponse.json(
      { message: error.message || "Gemini is temporarily unavailable. Please try again in a moment." },
      { status: 503 },
    );
  }

  if (error instanceof Error && error.message.toLowerCase().includes("invalid")) {
    return NextResponse.json({ message: invalidMessage }, { status: 502 });
  }

  return NextResponse.json(
    {
      message:
        error instanceof Error && error.message
          ? error.message
          : fallbackMessage,
    },
    { status: 502 },
  );
}
