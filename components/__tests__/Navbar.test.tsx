import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Navbar from "@/components/Navbar";

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    className,
    ...props
  }: {
    href: string;
    children: React.ReactNode;
    className?: string;
    "aria-current"?: string;
    prefetch?: boolean;
  }) => (
    <a href={href} className={className} {...props}>
      {children}
    </a>
  ),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/notes",
}));

describe("Navbar", () => {
  it("renders the site name and primary navigation links", () => {
    render(<Navbar />);

    expect(screen.getByRole("link", { name: /ai study assistant/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("navigation", { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Notes" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: "Sign in" })).toHaveAttribute("href", "/login");
  });
});
