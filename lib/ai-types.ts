export type StudyLevel = "Beginner" | "Intermediate" | "Advanced";

export type SummaryResult = {
  summary: string;
  keyPoints: string[];
  importantConcepts: string[];
};

export type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
};

export type QuizResult = {
  questions: QuizQuestion[];
};

export type TutorExplanation = {
  overview: string;
  keyIdea: string;
  stepByStep: string[];
  example: string;
  nextStep: string;
};

export type TutorResult = {
  explanation: TutorExplanation;
};

export function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function isSummaryResult(value: unknown): value is SummaryResult {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<SummaryResult>;
  return typeof candidate.summary === "string" && isStringArray(candidate.keyPoints) && isStringArray(candidate.importantConcepts);
}

export function isQuizResult(value: unknown): value is QuizResult {
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

export function isTutorResult(value: unknown): value is TutorResult {
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

