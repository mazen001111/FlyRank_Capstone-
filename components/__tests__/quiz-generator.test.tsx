import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import QuizGenerator from "@/components/quiz-generator";
import type { QuizResult } from "@/lib/ai-types";

const { requestQuizMock } = vi.hoisted(() => ({
  requestQuizMock: vi.fn(),
}));

vi.mock("@/lib/ai-client", () => ({
  requestQuiz: requestQuizMock,
}));

const sampleTopic = "Cell biology and how plant cells differ from animal cells.";

const successResult: QuizResult = {
  questions: [
    {
      question: "Where does photosynthesis primarily occur?",
      options: ["Mitochondria", "Chloroplasts", "Nucleus", "Ribosomes"],
      correctAnswer: "Chloroplasts",
      explanation: "Chloroplasts contain chlorophyll used in photosynthesis.",
    },
  ],
};

describe("QuizGenerator AI flow", () => {
  beforeEach(() => {
    requestQuizMock.mockReset();
  });

  it("shows loading, then displays generated questions", async () => {
    const user = userEvent.setup();
    let resolveQuiz: ((value: QuizResult) => void) | undefined;

    requestQuizMock.mockImplementation(
      () =>
        new Promise<QuizResult>((resolve) => {
          resolveQuiz = resolve;
        }),
    );

    render(<QuizGenerator />);

    const textarea = screen.getByRole("textbox", { name: /topic\/notes input/i });
    await user.clear(textarea);
    await user.type(textarea, sampleTopic);
    await user.click(screen.getByRole("button", { name: /generate quiz/i }));

    expect(screen.getByRole("button", { name: /generating quiz/i })).toBeDisabled();

    resolveQuiz?.(successResult);

    await waitFor(() => {
      expect(screen.getByText(successResult.questions[0].question)).toBeInTheDocument();
    });
    expect(screen.getAllByText("Chloroplasts").length).toBeGreaterThan(0);
    expect(screen.getByText(successResult.questions[0].explanation)).toBeInTheDocument();
  });

  it("displays an error state when the API fails", async () => {
    const user = userEvent.setup();
    requestQuizMock.mockRejectedValue(new Error("Quiz service unavailable."));

    render(<QuizGenerator />);

    const textarea = screen.getByRole("textbox", { name: /topic\/notes input/i });
    await user.clear(textarea);
    await user.type(textarea, sampleTopic);
    await user.click(screen.getByRole("button", { name: /generate quiz/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Quiz service unavailable.");
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
