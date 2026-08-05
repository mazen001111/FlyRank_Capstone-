"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigationLinks } from "@/lib/site";

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav aria-label="Primary" className="flex flex-wrap items-center justify-end gap-1">
      {navigationLinks.map((link) => {
        const isCurrent = pathname === link.href;

        return (
          <Link
            key={link.href}
            href={link.href}
            prefetch
            aria-current={isCurrent ? "page" : undefined}
            className="rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary aria-[current=page]:bg-secondary aria-[current=page]:text-foreground"
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
