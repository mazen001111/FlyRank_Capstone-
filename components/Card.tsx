import type { ComponentPropsWithoutRef } from "react";
import type { WithChildren } from "@/components/ui-types";

type CardProps = ComponentPropsWithoutRef<"div">;

export default function Card({ children, className = "", ...props }: WithChildren<CardProps>) {
  return (
    <div
      {...props}
      className={`rounded-3xl border border-border/70 bg-card p-6 shadow-soft ${className}`}
    >
      {children}
    </div>
  );
}
