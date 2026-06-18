"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { Button } from "@/components/ui/button";

export function CtaBanner() {
  const { t } = useTranslation();

  return (
    <section className="section-shell">
      <div className="section-container">
        <MotionInView>
          <div className="cta-glass-wrap relative overflow-hidden rounded-[2rem] p-[1px]">
            <div aria-hidden className="cta-gradient-bg pointer-events-none absolute inset-0" />
            <div
              aria-hidden
              className="absolute -end-16 -top-16 h-56 w-56 rounded-full bg-white/30 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute -bottom-20 start-1/4 h-64 w-64 rounded-full bg-brand-mist/60 blur-3xl"
            />
            <div
              aria-hidden
              className="absolute start-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/25 blur-2xl"
            />

            <div className="cta-glass-panel relative px-8 py-12 text-white md:px-14 md:py-16">
              <div className="relative z-[1] max-w-2xl">
                <h2 className="font-display text-balance text-3xl font-extrabold tracking-tight md:text-4xl">
                  {t("cta.title")}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-white/85 md:text-lg">
                  {t("cta.subtitle")}
                </p>
                <Button
                  asChild
                  size="lg"
                  className="mt-8 border border-white/40 bg-card/90 text-foreground shadow-lg shadow-black/10 backdrop-blur-sm hover:bg-card"
                >
                  <Link href="/contact">
                    {t("cta.button")}
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </MotionInView>
      </div>
    </section>
  );
}
