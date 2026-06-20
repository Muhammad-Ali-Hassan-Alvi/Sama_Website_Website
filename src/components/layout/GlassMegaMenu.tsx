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
        "grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-x-16 lg:gap-y-4",
        className,
      )}
    >
      <div className="flex w-max max-w-full shrink-0 flex-col gap-4">
        <h2 className="nav-mega-title font-display text-xl font-bold leading-none tracking-tight text-foreground md:text-[1.35rem] lg:text-2xl">
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
      <div className="min-w-0 overflow-hidden">{children}</div>
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
