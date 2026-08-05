import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SectionHeader from "@/components/SectionHeader";

describe("SectionHeader", () => {
  it("renders title and optional eyebrow/description", () => {
    render(
      <SectionHeader
        eyebrow="AI tools"
        title="Summarize your notes"
        description="Turn lecture notes into a study-ready summary."
      />,
    );

    expect(screen.getByText("AI tools")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Summarize your notes" })).toBeInTheDocument();
    expect(screen.getByText("Turn lecture notes into a study-ready summary.")).toBeInTheDocument();
  });

  it("supports centered alignment and custom heading level", () => {
    const { container } = render(
      <SectionHeader align="center" as="h1" title="Dashboard" />,
    );

    expect(screen.getByRole("heading", { level: 1, name: "Dashboard" })).toBeInTheDocument();
    expect(container.firstChild).toHaveClass("text-center");
  });
});
