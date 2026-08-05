import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import ToolLoadingFallback from "@/components/ToolLoadingFallback";

describe("ToolLoadingFallback", () => {
  it("renders an accessible loading placeholder", () => {
    const { container } = render(<ToolLoadingFallback />);
    const root = container.firstChild as HTMLElement;

    expect(root).toHaveAttribute("aria-busy", "true");
    expect(root).toHaveAttribute("aria-live", "polite");
    expect(container.querySelectorAll('[aria-hidden="true"]').length).toBeGreaterThan(0);
  });
});
