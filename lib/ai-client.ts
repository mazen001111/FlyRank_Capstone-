"use client";

import { isQuizResult, isSummaryResult, isTutorResult, type QuizResult, type SummaryResult, type TutorResult } from "@/lib/ai-types";

type RequestOptions<T> = {
  input: RequestInfo | URL;
  init: RequestInit;
  validate: (value: unknown) => value is T;
  invalidMessage: string;
};

const retryableStatuses = new Set([429, 500, 502, 503, 504]);

async function readJson(response: Response): Promise<unknown> {
  const text = await response.text();

  if (!text) {
    return null;
  }

  try {
    return JSON.parse(text) as unknown;
  } catch {
    return { message: text };
  }
}

async function requestWithRetry<T>({ input, init, validate, invalidMessage }: RequestOptions<T>): Promise<T> {
  let lastError: Error | null = null;

  for (let attempt = 0; attempt < 2; attempt += 1) {
    try {
      const response = await fetch(input, init);
      const payload = await readJson(response);

      if (!response.ok) {
        const message =
          payload && typeof payload === "object" && "message" in payload && typeof payload.message === "string"
            ? payload.message
            : "Something went wrong while contacting the AI service.";

        const error = new Error(message);

        if (retryableStatuses.has(response.status) && attempt === 0) {
          lastError = error;
          continue;
        }

        throw error;
      }

      if (!validate(payload)) {
        throw new Error(invalidMessage);
      }

      return payload;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error("Something went wrong while contacting the AI service.");
      if (attempt === 0) {
        continue;
      }
    }
  }

  throw lastError ?? new Error("Something went wrong while contacting the AI service.");
}

export async function requestSummary(notes: string): Promise<SummaryResult> {
  const payload = await requestWithRetry({
    input: "/api/summary",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ notes }),
    },
    validate: isSummaryResult,
    invalidMessage: "The AI returned an unexpected summary response. Please try again.",
  });

  return payload;
}

export async function requestQuiz(input: string): Promise<QuizResult> {
  const payload = await requestWithRetry({
    input: "/api/quizzes",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    },
    validate: isQuizResult,
    invalidMessage: "The AI returned an unexpected quiz response. Please try again.",
  });

  return payload;
}

export async function requestTutorExplanation(params: {
  subject: string;
  difficulty: string;
  question: string;
}): Promise<TutorResult> {
  const payload = await requestWithRetry({
    input: "/api/tutor",
    init: {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    },
    validate: isTutorResult,
    invalidMessage: "The AI returned an unexpected tutor response. Please try again.",
  });

  return payload;
}
