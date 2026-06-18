"use client";

import type { ReactNode } from "react";
import { MotionInView } from "@/components/MotionInView";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { cn } from "@/lib/utils";

type PageHeroProps = {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  breadcrumbs?: Array<{ label: string; href?: string }>;
  children?: ReactNode;
  variant?: "default" | "mesh";
  className?: string;
};

export function PageHero({
  title,
  subtitle,
  eyebrow,
  breadcrumbs,
  children,
  variant = "mesh",
  className,
}: PageHeroProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-border/60",
        variant === "mesh" ? "mesh-hero" : "bg-background",
        className,
      )}
    >
      <div className="section-container relative pb-14 pt-10 md:pb-16 md:pt-12">
        <MotionInView>
          {breadcrumbs ? <Breadcrumbs items={breadcrumbs} /> : null}
          {eyebrow ? (
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.18em] text-secondary">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-4xl text-balance font-display text-4xl font-extrabold tracking-[-0.03em] text-foreground md:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          {subtitle ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {subtitle}
            </p>
          ) : null}
          {children}
        </MotionInView>
      </div>
    </section>
  );
}
