import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import SummaryForm from "@/components/summary-form";
import type { SummaryResult } from "@/lib/ai-types";

const { requestSummaryMock } = vi.hoisted(() => ({
  requestSummaryMock: vi.fn(),
}));

vi.mock("@/lib/ai-client", () => ({
  requestSummary: requestSummaryMock,
}));

const sampleNotes =
  "Photosynthesis converts light energy into chemical energy in plants. Chlorophyll absorbs sunlight in the chloroplasts.";

const successResult: SummaryResult = {
  summary: "Photosynthesis turns sunlight into chemical energy using chlorophyll.",
  keyPoints: ["Occurs in chloroplasts", "Chlorophyll absorbs light"],
  importantConcepts: ["Photosynthesis", "Chlorophyll"],
};

describe("SummaryForm AI summarizer flow", () => {
  beforeEach(() => {
    requestSummaryMock.mockReset();
  });

  it("shows loading, then displays a successful summary response", async () => {
    const user = userEvent.setup();
    let resolveSummary: ((value: SummaryResult) => void) | undefined;

    requestSummaryMock.mockImplementation(
      () =>
        new Promise<SummaryResult>((resolve) => {
          resolveSummary = resolve;
        }),
    );

    render(<SummaryForm />);

    const textarea = screen.getByRole("textbox", { name: /text input area/i });
    await user.clear(textarea);
    await user.type(textarea, sampleNotes);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(screen.getByRole("button", { name: /generating summary/i })).toBeDisabled();
    expect(document.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);

    resolveSummary?.(successResult);

    await waitFor(() => {
      expect(screen.getByText(successResult.summary)).toBeInTheDocument();
    });

    expect(screen.getByText("Key points")).toBeInTheDocument();
    expect(screen.getByText("Occurs in chloroplasts")).toBeInTheDocument();
    expect(screen.getByText("Important concepts")).toBeInTheDocument();
    expect(screen.getByText("Photosynthesis")).toBeInTheDocument();
    expect(requestSummaryMock).toHaveBeenCalledWith(sampleNotes);
  });

  it("displays an error state when the API fails", async () => {
    const user = userEvent.setup();
    requestSummaryMock
      .mockRejectedValueOnce(new Error("AI service unavailable."))
      .mockResolvedValueOnce(successResult);

    render(<SummaryForm />);

    const textarea = screen.getByRole("textbox", { name: /text input area/i });
    await user.clear(textarea);
    await user.type(textarea, sampleNotes);
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("AI service unavailable.");
    expect(screen.getByText("Summary unavailable")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: /retry/i }));

    await waitFor(() => {
      expect(screen.getByText(successResult.summary)).toBeInTheDocument();
    });
    expect(requestSummaryMock).toHaveBeenCalledTimes(2);
  });

  it("validates short notes without calling the API", async () => {
    const user = userEvent.setup();

    render(<SummaryForm />);

    const textarea = screen.getByRole("textbox", { name: /text input area/i });
    await user.clear(textarea);
    // Satisfies HTML minLength, but fails the app's trimmed-length check.
    await user.type(textarea, "                    ");
    await user.click(screen.getByRole("button", { name: /submit/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      "Enter at least 20 characters of notes to generate a useful summary.",
    );
    expect(requestSummaryMock).not.toHaveBeenCalled();
  });
});
