"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { requestTutorExplanation } from "@/lib/ai-client";
import type { StudyLevel } from "@/lib/ai-types";

const subjects = ["Math", "Science", "History", "Computer Science"] as const;
const difficultyLevels: StudyLevel[] = ["Beginner", "Intermediate", "Advanced"];
const tutorSubjectId = "tutor-subject";
const tutorDifficultyId = "tutor-difficulty";
const tutorQuestionId = "tutor-question";
const tutorStatusId = "tutor-status";
const tutorHelpId = "tutor-help";

type TutorState =
  | { status: "idle" }
  | { status: "loading" }
  | {
      status: "success";
      explanation: string;
      examples: string[];
      keyTakeaways: string[];
    }
  | { status: "error"; message: string };

export default function TutorPanel() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, setState] = useState<TutorState>({ status: "idle" });

  async function submitTutorQuestion() {
    const form = formRef.current;
    if (!form) return;

    const data = new FormData(form);
    const subject = String(data.get("subject") ?? "Science");
    const difficulty = String(data.get("difficulty") ?? "Intermediate") as StudyLevel;
    const trimmedQuestion = String(data.get("question") ?? "").trim();

    if (trimmedQuestion.length < 10) {
      setState({
        status: "error",
        message: "Enter at least 10 characters for the question.",
      });
      return;
    }

    setState({ status: "loading" });

    try {
      const result = await requestTutorExplanation({ subject, difficulty, question: trimmedQuestion });
      setState({
        status: "success",
        explanation: result.explanation,
        examples: result.examples,
        keyTakeaways: result.keyTakeaways,
      });
    } catch (error) {
      setState({
        status: "error",
        message: error instanceof Error ? error.message : "Something went wrong while generating the explanation.",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitTutorQuestion();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <Card>
        <form
          ref={formRef}
          className="grid gap-4"
          onSubmit={handleSubmit}
          aria-describedby={`${tutorHelpId} ${tutorStatusId}`}
          aria-busy={state.status === "loading"}
        >
          <fieldset className="grid gap-4 rounded-2xl border border-border/60 p-4">
            <legend className="px-1 text-sm font-semibold text-foreground">Tutor settings</legend>

            <label htmlFor={tutorSubjectId} className="grid gap-2 text-sm font-medium text-foreground">
              Subject selection
              <select
                id={tutorSubjectId}
                name="subject"
                defaultValue="Science"
                className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {subjects.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label htmlFor={tutorDifficultyId} className="grid gap-2 text-sm font-medium text-foreground">
              Difficulty selection
              <select
                id={tutorDifficultyId}
                name="difficulty"
                defaultValue="Intermediate"
                className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                {difficultyLevels.map((level) => (
                  <option key={level} value={level}>
                    {level}
                  </option>
                ))}
              </select>
            </label>
          </fieldset>

          <label htmlFor={tutorQuestionId} className="grid gap-2 text-sm font-medium text-foreground">
            Question input
            <textarea
              id={tutorQuestionId}
              name="question"
              defaultValue="Explain photosynthesis like I'm preparing for a quiz."
              rows={8}
              required
              minLength={10}
              maxLength={3000}
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? `${tutorHelpId} ${tutorStatusId}` : tutorHelpId}
              className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="Ask your question..."
            />
          </label>

          <p id={tutorHelpId} className="text-sm leading-6 text-muted-foreground">
            Ask for a structured explanation. The tutor returns an explanation, examples, and key takeaways for study.
          </p>

          <button
            type="submit"
            disabled={state.status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {state.status === "loading" ? "Generating explanation..." : "Ask the tutor"}
          </button>
        </form>
      </Card>

      <Card aria-live="polite" aria-busy={state.status === "loading"}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">AI explanation output</p>

        <div id={tutorStatusId} className="mt-4">
          {state.status === "loading" ? (
            <div className="grid gap-4">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-10/12" />
              <div className="grid gap-3">
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-full" />
                <Skeleton className="h-20 w-5/6" />
              </div>
            </div>
          ) : null}

          {state.status === "idle" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">No explanation yet</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Pick a subject, set the difficulty, and ask a question to get a structured study explanation.
              </p>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border bg-background px-4 py-3">Good for concept checks, homework help, and exam review.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">The answer includes examples and key takeaways.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">Retry safely if Gemini is temporarily unavailable.</li>
              </ul>
            </div>
          ) : null}

          {state.status === "error" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">Explanation unavailable</p>
              <p className="text-sm text-red-700" role="alert">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => void submitTutorQuestion()}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Retry
              </button>
            </div>
          ) : null}

          {state.status === "success" ? (
            <div className="grid gap-6">
              <div>
                <p className="text-lg font-semibold text-foreground">Structured explanation</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{state.explanation}</p>
              </div>

              {state.examples.length > 0 ? (
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">Examples</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                    {state.examples.map((example) => (
                      <li key={example} className="rounded-xl bg-secondary/40 px-3 py-2">
                        {example}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {state.keyTakeaways.length > 0 ? (
                <div className="rounded-2xl border border-border bg-background p-4">
                  <p className="text-sm font-semibold text-foreground">Key takeaways</p>
                  <ul className="mt-3 grid gap-2 text-sm leading-6 text-muted-foreground">
                    {state.keyTakeaways.map((takeaway) => (
                      <li key={takeaway} className="rounded-xl bg-secondary/40 px-3 py-2">
                        {takeaway}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
