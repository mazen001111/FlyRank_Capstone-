import Link from "next/link";
import type { ReactNode } from "react";

type ButtonLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export default function ButtonLink({ href, children, variant = "primary", className = "" }: ButtonLinkProps) {
  const variantClass =
    variant === "secondary"
      ? "border border-border bg-background text-foreground hover:bg-secondary/50"
      : "bg-primary text-primary-foreground hover:translate-y-[-1px] hover:shadow-soft";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
