import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";
import TutorPanel from "@/components/tutor-panel";
import type { TutorResult } from "@/lib/ai-types";

const { requestTutorMock } = vi.hoisted(() => ({
  requestTutorMock: vi.fn(),
}));

vi.mock("@/lib/ai-client", () => ({
  requestTutorExplanation: requestTutorMock,
}));

const sampleQuestion = "Explain photosynthesis like I'm preparing for a quiz.";

const successResult: TutorResult = {
  explanation: "Photosynthesis converts light energy into chemical energy in plants.",
  examples: ["A leaf uses sunlight to make glucose.", "Algae also perform photosynthesis in water."],
  keyTakeaways: ["Chlorophyll captures light", "Occurs mainly in chloroplasts", "Produces oxygen as a byproduct"],
};

describe("TutorPanel AI flow", () => {
  beforeEach(() => {
    requestTutorMock.mockReset();
  });

  it("shows loading, then displays a structured explanation", async () => {
    const user = userEvent.setup();
    let resolveTutor: ((value: TutorResult) => void) | undefined;

    requestTutorMock.mockImplementation(
      () =>
        new Promise<TutorResult>((resolve) => {
          resolveTutor = resolve;
        }),
    );

    render(<TutorPanel />);

    const textarea = screen.getByRole("textbox", { name: /question input/i });
    await user.clear(textarea);
    await user.type(textarea, sampleQuestion);
    await user.click(screen.getByRole("button", { name: /ask the tutor/i }));

    expect(screen.getByRole("button", { name: /generating explanation/i })).toBeDisabled();

    resolveTutor?.(successResult);

    await waitFor(() => {
      expect(screen.getByText(successResult.explanation)).toBeInTheDocument();
    });
    expect(screen.getByText("Key takeaways")).toBeInTheDocument();
    expect(screen.getByText("Chlorophyll captures light")).toBeInTheDocument();
    expect(screen.getByText(successResult.examples[0])).toBeInTheDocument();
  });

  it("displays an error state when the API fails", async () => {
    const user = userEvent.setup();
    requestTutorMock.mockRejectedValue(new Error("Tutor service unavailable."));

    render(<TutorPanel />);

    const textarea = screen.getByRole("textbox", { name: /question input/i });
    await user.clear(textarea);
    await user.type(textarea, sampleQuestion);
    await user.click(screen.getByRole("button", { name: /ask the tutor/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Tutor service unavailable.");
    expect(screen.getByRole("button", { name: /retry/i })).toBeInTheDocument();
  });
});
