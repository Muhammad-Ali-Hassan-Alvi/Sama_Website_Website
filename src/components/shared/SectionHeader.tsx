"use client";

import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  children?: ReactNode;
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  className,
  eyebrowClassName,
  titleClassName,
  children,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <Badge variant="secondary" className={cn("mb-4", eyebrowClassName)}>
          {eyebrow}
        </Badge>
      ) : null}
      <h2
        className={cn(
          "text-balance font-display text-3xl font-extrabold tracking-[-0.02em] text-foreground md:text-[2.5rem] md:leading-[1.1]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground md:text-lg">
          {subtitle}
        </p>
      ) : null}
      {children}
    </div>
  );
}
