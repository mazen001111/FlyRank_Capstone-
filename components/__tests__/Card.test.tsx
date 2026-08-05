import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Card from "@/components/Card";

describe("Card", () => {
  it("renders children inside a styled container", () => {
    render(
      <Card>
        <p>Study content</p>
      </Card>,
    );

    expect(screen.getByText("Study content")).toBeInTheDocument();
  });

  it("merges custom className and forwards HTML attributes", () => {
    render(
      <Card className="custom-card" data-testid="summary-card" aria-live="polite">
        Notes
      </Card>,
    );

    const card = screen.getByTestId("summary-card");
    expect(card).toHaveClass("custom-card");
    expect(card).toHaveAttribute("aria-live", "polite");
    expect(card).toHaveTextContent("Notes");
  });
});
