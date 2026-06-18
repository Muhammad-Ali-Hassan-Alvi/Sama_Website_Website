"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type GlassLinkItem = {
  href: string;
  label: string;
};

type GlassMegaMenuProps = {
  title: string;
  children: ReactNode;
  viewAll?: { href: string; label: string };
  onNavigate?: () => void;
  className?: string;
};

export function GlassMegaMenu({
  title,
  children,
  viewAll,
  onNavigate,
  className,
}: GlassMegaMenuProps) {
  return (
    <div
      className={cn(
        "grid gap-10 lg:grid-cols-[minmax(200px,260px)_1fr] lg:items-start lg:gap-16 xl:gap-20",
        className,
      )}
    >
      <div className="flex flex-col gap-8">
        <h2 className="font-display text-[2rem] font-bold leading-[1.1] tracking-tight text-foreground md:text-[2.35rem] lg:text-[2.75rem]">
          {title}
        </h2>
        {viewAll ? (
          <Link
            href={viewAll.href}
            onClick={onNavigate}
            className="nav-glass-cta w-fit text-sm font-semibold text-primary transition hover:underline"
          >
            {viewAll.label} →
          </Link>
        ) : null}
      </div>
      <div className="min-w-0">{children}</div>
    </div>
  );
}

export function GlassLinkColumns({
  links,
  onNavigate,
  columns = 2,
}: {
  links: GlassLinkItem[];
  onNavigate?: () => void;
  columns?: 2 | 3;
}) {
  const perColumn = Math.ceil(links.length / columns);
  const cols = Array.from({ length: columns }, (_, i) =>
    links.slice(i * perColumn, (i + 1) * perColumn),
  ).filter((col) => col.length > 0);

  return (
    <div
      className={cn(
        "grid gap-x-12 gap-y-1",
        columns === 3 ? "sm:grid-cols-3" : "sm:grid-cols-2",
      )}
    >
      {cols.map((col, i) => (
        <ul key={i} className="space-y-1">
          {col.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={onNavigate}
                className="nav-glass-link block py-2.5 text-[0.9375rem] font-medium leading-snug"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
