import Link from "next/link";

export default function ButtonLink({ href, children, variant = "primary", className = "" }) {
  const variantClass =
    variant === "secondary"
      ? "border border-border bg-background text-foreground hover:bg-secondary/50"
      : "bg-primary text-primary-foreground hover:translate-y-[-1px] hover:shadow-soft";

  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-200 ${variantClass} ${className}`}
    >
      {children}
    </Link>
  );
}
