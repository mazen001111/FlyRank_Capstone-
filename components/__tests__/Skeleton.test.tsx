import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Skeleton from "@/components/Skeleton";

describe("Skeleton", () => {
  it("renders a hidden loading placeholder", () => {
    const { container } = render(<Skeleton className="h-6 w-full" />);
    const skeleton = container.firstChild as HTMLElement;

    expect(skeleton).toHaveAttribute("aria-hidden", "true");
    expect(skeleton).toHaveClass("animate-pulse");
    expect(skeleton).toHaveClass("h-6");
    expect(skeleton).toHaveClass("w-full");
  });
});
