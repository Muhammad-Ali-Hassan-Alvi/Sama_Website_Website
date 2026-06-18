"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";

type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useTranslation();

  return (
    <nav aria-label="Breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
        <li>
          <Link
            href="/"
            className="inline-flex items-center gap-1 rounded-md transition hover:text-primary"
          >
            <Home className="h-3.5 w-3.5" />
            {t("nav.home")}
          </Link>
        </li>
        {items.map((item, i) => (
          <li key={`${item.label}-${i}`} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5 opacity-50" />
            {item.href ? (
              <Link href={item.href} className="transition hover:text-primary">
                {item.label}
              </Link>
            ) : (
              <span className={cn("font-medium text-foreground")}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
