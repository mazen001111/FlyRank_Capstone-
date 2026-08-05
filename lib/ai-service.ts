import "server-only";

import {
  type QuizResult,
  type StudyLevel,
  type SummaryResult,
  type TutorResult,
} from "@/lib/ai-types";

type OpenAIChatResponse = {
  choices?: Array<{
    message?: {
      content?: string | null;
    };
  }>;
};

type CompletionKind = "summary" | "quiz" | "tutor";

const openAiApiKey = process.env.OPENAI_API_KEY;
const openAiModel = process.env.OPENAI_MODEL ?? "gpt-4o-mini";
const openAiBaseUrl = process.env.OPENAI_BASE_URL ?? "https://api.openai.com/v1";

function ensureOpenAiConfig() {
  if (!openAiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured.");
  }
}

function buildSystemPrompt(kind: CompletionKind) {
  if (kind === "summary") {
    return "You are an AI study assistant that converts student notes into a study summary. Return only valid JSON with summary, keyPoints, and importantConcepts. Focus on the learning task and do not act like a general chatbot.";
  }

  if (kind === "quiz") {
    return "You are an AI study assistant that generates multiple-choice quizzes from a topic or notes. Return only valid JSON with a questions array. Each question must include question, options, correctAnswer, and explanation. Focus on the learning task and do not act like a general chatbot.";
  }

  return "You are an AI study assistant that explains a subject question for a student. Return only valid JSON with explanation containing overview, keyIdea, stepByStep, example, and nextStep. Focus on the learning task and do not act like a general chatbot.";
}

async function runCompletion(kind: CompletionKind, userContent: string) {
  ensureOpenAiConfig();

  const response = await fetch(`${openAiBaseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openAiApiKey}`,
    },
    body: JSON.stringify({
      model: openAiModel,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: buildSystemPrompt(kind) },
        { role: "user", content: userContent },
      ],
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI request failed with status ${response.status}: ${errorText}`);
  }

  const payload = (await response.json()) as OpenAIChatResponse;
  const content = payload.choices?.[0]?.message?.content;

  if (!content || typeof content !== "string") {
    throw new Error("OpenAI response did not include message content.");
  }

  try {
    return JSON.parse(content) as unknown;
  } catch {
    throw new Error("OpenAI returned invalid JSON.");
  }
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function isSummaryResult(value: unknown): value is SummaryResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SummaryResult>;
  return typeof candidate.summary === "string" && isStringArray(candidate.keyPoints) && isStringArray(candidate.importantConcepts);
}

function isQuizResult(value: unknown): value is QuizResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<QuizResult>;
  return (
    Array.isArray(candidate.questions) &&
    candidate.questions.every(
      (question) =>
        question &&
        typeof question.question === "string" &&
        isStringArray(question.options) &&
        typeof question.correctAnswer === "string" &&
        typeof question.explanation === "string",
    )
  );
}

function isTutorResult(value: unknown): value is TutorResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<TutorResult>;
  return (
    !!candidate.explanation &&
    typeof candidate.explanation === "object" &&
    typeof candidate.explanation.overview === "string" &&
    typeof candidate.explanation.keyIdea === "string" &&
    isStringArray(candidate.explanation.stepByStep) &&
    typeof candidate.explanation.example === "string" &&
    typeof candidate.explanation.nextStep === "string"
  );
}

export async function generateSummaryFromNotes(notes: string): Promise<SummaryResult> {
  const result = await runCompletion("summary", `Summarize these student notes into study-ready content.\n\nNotes:\n${notes}`);

  if (!isSummaryResult(result)) {
    throw new Error("AI returned an invalid summary payload.");
  }

  return result;
}

export async function generateQuizFromTopic(input: string): Promise<QuizResult> {
  const result = await runCompletion("quiz", `Generate a study quiz from this topic or notes.\n\nInput:\n${input}`);

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
  const result = await runCompletion(
    "tutor",
    [`Subject: ${params.subject}`, `Difficulty: ${params.difficulty}`, `Question: ${params.question}`].join("\n"),
  );

  if (!isTutorResult(result)) {
    throw new Error("AI returned an invalid tutor payload.");
  }

  return result;
}
