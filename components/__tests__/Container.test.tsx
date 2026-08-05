import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Container from "@/components/Container";

describe("Container", () => {
  it("wraps children with the layout container classes", () => {
    render(
      <Container className="py-8">
        <span>Page content</span>
      </Container>,
    );

    const content = screen.getByText("Page content");
    expect(content.parentElement).toHaveClass("mx-auto");
    expect(content.parentElement).toHaveClass("max-w-7xl");
    expect(content.parentElement).toHaveClass("py-8");
  });
});
