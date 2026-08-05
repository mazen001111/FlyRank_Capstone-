"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { requestQuiz } from "@/lib/ai-client";
import type { QuizQuestion } from "@/lib/ai-types";

type QuizState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; questions: QuizQuestion[] }
  | { status: "error"; message: string };

const quizInputId = "quiz-input";
const quizStatusId = "quiz-status";
const quizHelpId = "quiz-help";
const defaultInput = "Cell biology and how plant cells differ from animal cells.";

export default function QuizGenerator() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [state, setState] = useState<QuizState>({ status: "idle" });

  async function submitQuiz() {
    const trimmedInput = inputRef.current?.value.trim() ?? "";

    if (trimmedInput.length < 10) {
      setState({
        status: "error",
        message: "Enter at least 10 characters of topic or notes before generating a quiz.",
      });
      return;
    }

    setState({ status: "loading" });

    try {
      const result = await requestQuiz(trimmedInput);
      setState({ status: "success", questions: result.questions });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Quiz generation failed. Please try again.",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitQuiz();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <form className="grid gap-4" onSubmit={handleSubmit} aria-describedby={`${quizHelpId} ${quizStatusId}`} aria-busy={state.status === "loading"}>
          <label htmlFor={quizInputId} className="grid gap-2 text-sm font-medium text-foreground">
            Topic/notes input
            <textarea
              id={quizInputId}
              name="input"
              ref={inputRef}
              defaultValue={defaultInput}
              rows={10}
              required
              minLength={10}
              maxLength={3000}
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? `${quizHelpId} ${quizStatusId}` : quizHelpId}
              className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="Enter a topic or notes..."
            />
          </label>
          <p id={quizHelpId} className="text-sm leading-6 text-muted-foreground">
            Add a study topic or paste notes. The quiz generator returns multiple-choice questions with answers and explanations.
          </p>
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {state.status === "loading" ? "Generating quiz..." : "Generate quiz"}
          </button>
        </form>
      </Card>

      <Card aria-live="polite" aria-busy={state.status === "loading"}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">Generated questions</p>

        <div id={quizStatusId} className="mt-4">
          {state.status === "loading" ? (
            <div className="grid gap-4">
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <div className="grid gap-3">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-5/6" />
              </div>
            </div>
          ) : null}

          {state.status === "idle" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">No quiz yet</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Enter a topic on the left to build practice questions with answers and explanations.
              </p>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border bg-background px-4 py-3">Great for exam review and active recall.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">The correct answer is highlighted for quick study.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">You can retry safely if the AI service is temporarily unavailable.</li>
              </ul>
            </div>
          ) : null}

          {state.status === "error" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">Quiz unavailable</p>
              <p className="text-sm text-red-700" role="alert">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => void submitQuiz()}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Retry
              </button>
            </div>
          ) : null}

          {state.status === "success" ? (
            state.questions.length > 0 ? (
              <div className="grid gap-4">
                {state.questions.map((item, index) => (
                  <article key={item.question} className="rounded-2xl border border-border bg-background p-4">
                    <p className="text-sm font-semibold text-foreground">Question {index + 1}</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.question}</p>
                    <p className="mt-4 text-sm font-semibold text-foreground">Options</p>
                    <ul className="mt-2 grid gap-2 text-sm text-muted-foreground">
                      {item.options.map((option) => (
                        <li
                          key={option}
                          className={`rounded-2xl border px-4 py-3 ${option === item.correctAnswer ? "border-primary bg-primary/10 text-foreground" : "border-border bg-background"}`}
                        >
                          {option}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-sm font-semibold text-foreground">Correct answer</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.correctAnswer}</p>
                    <p className="mt-4 text-sm font-semibold text-foreground">Explanation</p>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.explanation}</p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="grid gap-4">
                <p className="text-lg font-semibold text-foreground">No questions returned</p>
                <p className="text-sm leading-6 text-muted-foreground">
                  The AI did not provide any questions. Retry or try a more specific topic.
                </p>
                <button
                  type="button"
                  onClick={() => void submitQuiz()}
                  className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  Retry
                </button>
              </div>
            )
          ) : null}
        </div>
      </Card>
    </div>
  );
}
