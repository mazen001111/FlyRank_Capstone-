import "server-only";

import { GoogleGenAI, Type } from "@google/genai";
import {
  isQuizResult,
  isSummaryResult,
  isTutorResult,
  type QuizResult,
  type StudyLevel,
  type SummaryResult,
  type TutorResult,
} from "@/lib/ai-types";

type CompletionKind = "summary" | "quiz" | "tutor";

const geminiApiKey = process.env.GEMINI_API_KEY;
/** Free-tier friendly default; override with GEMINI_MODEL if needed. */
const geminiModel = process.env.GEMINI_MODEL ?? "gemini-flash-latest";

function getClient() {
  if (!geminiApiKey) {
    throw new Error("GEMINI_API_KEY is not configured.");
  }

  return new GoogleGenAI({ apiKey: geminiApiKey });
}

function buildInstruction(kind: CompletionKind) {
  if (kind === "summary") {
    return "You are an AI study assistant that converts student notes into a study summary. Focus on the learning task and do not act like a general chatbot. Return only structured JSON.";
  }

  if (kind === "quiz") {
    return "You are an AI study assistant that generates multiple-choice quizzes from a topic or notes. Prefer 3-5 high-quality questions. Focus on the learning task and do not act like a general chatbot. Return only structured JSON.";
  }

  return "You are an AI study assistant that explains a subject question for a student. Provide a structured explanation, concrete examples, and key takeaways. Focus on the learning task and do not act like a general chatbot. Return only structured JSON.";
}

const summarySchema = {
  type: Type.OBJECT,
  properties: {
    summary: { type: Type.STRING },
    keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
    importantConcepts: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["summary", "keyPoints", "importantConcepts"],
};

const quizSchema = {
  type: Type.OBJECT,
  properties: {
    questions: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          question: { type: Type.STRING },
          options: { type: Type.ARRAY, items: { type: Type.STRING } },
          correctAnswer: { type: Type.STRING },
          explanation: { type: Type.STRING },
        },
        required: ["question", "options", "correctAnswer", "explanation"],
      },
    },
  },
  required: ["questions"],
};

const tutorSchema = {
  type: Type.OBJECT,
  properties: {
    explanation: { type: Type.STRING },
    examples: { type: Type.ARRAY, items: { type: Type.STRING } },
    keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
  },
  required: ["explanation", "examples", "keyTakeaways"],
};

function schemaFor(kind: CompletionKind) {
  if (kind === "summary") return summarySchema;
  if (kind === "quiz") return quizSchema;
  return tutorSchema;
}

async function runGeminiJson(kind: CompletionKind, userContent: string): Promise<unknown> {
  const ai = getClient();

  try {
    const response = await ai.models.generateContent({
      model: geminiModel,
      contents: userContent,
      config: {
        systemInstruction: buildInstruction(kind),
        temperature: 0.2,
        responseMimeType: "application/json",
        responseSchema: schemaFor(kind),
      },
    });

    const text = response.text?.trim();

    if (!text) {
      throw new Error("Gemini returned an empty response.");
    }

    try {
      return JSON.parse(text) as unknown;
    } catch {
      throw new Error("Gemini returned invalid JSON.");
    }
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes("GEMINI_API_KEY")) {
        throw error;
      }

      const lower = error.message.toLowerCase();
      if (lower.includes("429") || lower.includes("quota") || lower.includes("resource_exhausted")) {
        throw new Error("Gemini free-tier quota was exceeded. Please wait a moment and try again.");
      }

      if (lower.includes("fetch failed") || lower.includes("econnreset") || lower.includes("etimedout") || lower.includes("network error")) {
        throw new Error("Gemini is temporarily unavailable. Please try again in a moment.");
      }

      // Prefer a clean message when the SDK embeds a JSON error payload.
      const jsonMatch = error.message.match(/\{[\s\S]*"error"[\s\S]*\}$/);
      if (jsonMatch) {
        try {
          const payload = JSON.parse(jsonMatch[0]) as { error?: { message?: string; status?: string } };
          if (payload.error?.status === "RESOURCE_EXHAUSTED" || payload.error?.message?.toLowerCase().includes("quota")) {
            throw new Error("Gemini free-tier quota was exceeded. Please wait a moment and try again.");
          }
          if (payload.error?.message) {
            throw new Error(payload.error.message);
          }
        } catch (inner) {
          if (inner instanceof Error && !inner.message.startsWith("{") && inner.message !== error.message) {
            throw inner;
          }
        }
      }

      throw new Error(error.message);
    }

    throw new Error("Gemini is temporarily unavailable. Please try again in a moment.");
  }
}

export async function generateSummaryFromNotes(notes: string): Promise<SummaryResult> {
  const result = await runGeminiJson(
    "summary",
    `Summarize these student notes into study-ready content with a concise summary, key points, and important concepts.\n\nNotes:\n${notes}`,
  );

  if (!isSummaryResult(result)) {
    throw new Error("AI returned an invalid summary payload.");
  }

  return result;
}

export async function generateQuizFromTopic(input: string): Promise<QuizResult> {
  const result = await runGeminiJson(
    "quiz",
    `Generate a study quiz from this topic or notes. Each question needs options, a correctAnswer that matches one option, and an explanation.\n\nInput:\n${input}`,
  );

  if (!isQuizResult(result)) {
    throw new Error("AI returned an invalid quiz payload.");
  }

  return result;
}

export async function generateTutorExplanation(params: {
  subject: string;
  difficulty: StudyLevel;
  question: string;
}): Promise<TutorResult> {
  const result = await runGeminiJson(
    "tutor",
    [
      `Subject: ${params.subject}`,
      `Difficulty: ${params.difficulty}`,
      `Question: ${params.question}`,
      "",
      "Return a structured explanation, 1-3 concrete examples, and clear key takeaways for studying.",
    ].join("\n"),
  );

  if (!isTutorResult(result)) {
    throw new Error("AI returned an invalid tutor payload.");
  }

  return result;
}
