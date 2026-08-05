import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import ButtonLink from "@/components/ButtonLink";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
  }) => (
    <a href={href} className={className}>
      {children}
    </a>
  ),
}));

describe("ButtonLink", () => {
  it("renders a primary link by default", () => {
    render(<ButtonLink href="/notes">Open notes</ButtonLink>);

    const link = screen.getByRole("link", { name: "Open notes" });
    expect(link).toHaveAttribute("href", "/notes");
    expect(link).toHaveClass("bg-primary");
  });

  it("supports the secondary variant and custom className", () => {
    render(
      <ButtonLink href="/quizzes" variant="secondary" className="extra">
        Start quiz
      </ButtonLink>,
    );

    const link = screen.getByRole("link", { name: "Start quiz" });
    expect(link).toHaveClass("border");
    expect(link).toHaveClass("extra");
  });
});
