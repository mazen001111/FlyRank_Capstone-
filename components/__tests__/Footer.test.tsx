import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Footer from "@/components/Footer";

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

describe("Footer", () => {
  it("renders branding and footer navigation", () => {
    render(<Footer />);

    expect(screen.getByText("AI Study Assistant")).toBeInTheDocument();
    expect(screen.getByRole("navigation", { name: /footer/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute("href", "/dashboard");
  });
});
