"use client";

import { useState, type FormEvent } from "react";
import Card from "@/components/Card";
import Skeleton from "@/components/Skeleton";
import { requestSummary } from "@/lib/ai-client";
import type { SummaryResult } from "@/lib/ai-types";

type SummaryState =
  | ({ status: "idle" } & SummaryResult)
  | ({ status: "loading" } & SummaryResult)
  | ({ status: "success" } & SummaryResult)
  | ({ status: "error" } & SummaryResult & { message: string });

const notesFieldId = "summary-notes";
const summaryStatusId = "summary-status";
const summaryHelpId = "summary-help";

export default function SummaryForm() {
  const [notes, setNotes] = useState("Paste your class notes, reading passage, or lecture excerpt here.");
  const [state, setState] = useState<SummaryState>({
    status: "idle",
    summary: "Paste notes to generate a study-ready summary.",
    keyPoints: [],
    importantConcepts: [],
  });

  async function submitSummary() {
    const trimmedNotes = notes.trim();

    if (trimmedNotes.length < 20) {
      setState({
        status: "error",
        summary: "No summary available.",
        keyPoints: [],
        importantConcepts: [],
        message: "Enter at least 20 characters of notes to generate a useful summary.",
      });
      return;
    }

    setState({ status: "loading", summary: "Generating summary...", keyPoints: [], importantConcepts: [] });

    try {
      const result = await requestSummary(trimmedNotes);
      setState({
        status: "success",
        summary: result.summary,
        keyPoints: result.keyPoints,
        importantConcepts: result.importantConcepts,
      });
    } catch (error) {
      setState({
        status: "error",
        summary: "Summary generation failed.",
        keyPoints: [],
        importantConcepts: [],
        message: error instanceof Error ? error.message : "Something went wrong while generating the summary.",
      });
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await submitSummary();
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <Card>
        <form
          className="grid gap-4"
          onSubmit={handleSubmit}
          aria-describedby={`${summaryHelpId} ${summaryStatusId}`}
          aria-busy={state.status === "loading"}
        >
          <label htmlFor={notesFieldId} className="grid gap-2 text-sm font-medium text-foreground">
            Text input area
            <textarea
              id={notesFieldId}
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={12}
              required
              minLength={20}
              maxLength={6000}
              aria-invalid={state.status === "error"}
              aria-describedby={state.status === "error" ? `${summaryHelpId} ${summaryStatusId}` : summaryHelpId}
              className="rounded-2xl border border-border bg-background px-4 py-3 outline-none transition placeholder:text-muted-foreground focus:border-primary focus-visible:ring-2 focus-visible:ring-primary/40"
              placeholder="Paste notes here..."
            />
          </label>
          <p id={summaryHelpId} className="text-sm leading-6 text-muted-foreground">
            Paste a paragraph or a few notes. The summarizer returns a compact summary, key points, and important concepts.
          </p>
          <button
            type="submit"
            disabled={state.status === "loading"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            {state.status === "loading" ? "Generating summary..." : "Submit"}
          </button>
        </form>
      </Card>

      <Card aria-live="polite" aria-busy={state.status === "loading"}>
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">AI generated summary</p>

        <div id={summaryStatusId} className="mt-4">
          {state.status === "loading" ? (
            <div className="grid gap-4">
              <Skeleton className="h-6 w-4/5" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <div className="grid gap-2">
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-8 w-5/6" />
                <Skeleton className="h-8 w-2/3" />
              </div>
            </div>
          ) : null}

          {state.status === "idle" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">No summary yet</p>
              <p className="text-sm leading-6 text-muted-foreground">
                Add notes on the left to generate a concise summary, key points, and important concepts.
              </p>
              <ul className="grid gap-2 text-sm text-muted-foreground">
                <li className="rounded-2xl border border-border bg-background px-4 py-3">Best for lecture notes, reading passages, or class handouts.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">The response is structured for quick study and review.</li>
                <li className="rounded-2xl border border-border bg-background px-4 py-3">If the request fails, retry without losing your text.</li>
              </ul>
            </div>
          ) : null}

          {state.status === "error" ? (
            <div className="grid gap-4">
              <p className="text-lg font-semibold text-foreground">Summary unavailable</p>
              <p className="text-sm text-red-700" role="alert">
                {state.message}
              </p>
              <button
                type="button"
                onClick={() => void submitSummary()}
                className="inline-flex items-center justify-center rounded-full border border-border bg-background px-5 py-3 text-sm font-semibold text-foreground transition hover:bg-secondary/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                Retry
              </button>
            </div>
          ) : null}

          {state.status === "success" ? (
            <div className="grid gap-6">
              <div>
                <p className="text-lg font-semibold text-foreground">Summary</p>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">{state.summary}</p>
              </div>

              {state.keyPoints.length > 0 ? (
                <div>
                  <p className="text-sm font-semibold text-foreground">Key points</p>
                  <ul className="mt-3 grid gap-3 text-sm text-muted-foreground">
                    {state.keyPoints.map((point) => (
                      <li key={point} className="rounded-2xl border border-border bg-background px-4 py-3">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              {state.importantConcepts.length > 0 ? (
                <div>
                  <p className="text-sm font-semibold text-foreground">Important concepts</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {state.importantConcepts.map((concept) => (
                      <span key={concept} className="rounded-full border border-border bg-background px-3 py-2 text-xs text-muted-foreground">
                        {concept}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
