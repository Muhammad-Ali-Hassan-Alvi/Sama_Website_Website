"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { Badge } from "@/components/ui/badge";

const steps = ["discover", "design", "launch"] as const;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function lerp(from: number, to: number, progress: number) {
  return from + (to - from) * clamp01(progress);
}

export function ProcessSection() {
  const { t } = useTranslation();
  const reduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const card1Opacity = useMotionValue(0);
  const card1Y = useMotionValue(24);
  const line1Scale = useMotionValue(0);
  const card2Opacity = useMotionValue(0);
  const card2X = useMotionValue(40);
  const line2Scale = useMotionValue(0);
  const card3Opacity = useMotionValue(0);
  const card3X = useMotionValue(40);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    card1Opacity.set(Math.max(card1Opacity.get(), clamp01(p / 0.08)));
    card1Y.set(Math.min(card1Y.get(), lerp(24, 0, p / 0.08)));

    line1Scale.set(Math.max(line1Scale.get(), clamp01((p - 0.12) / 0.26)));

    card2Opacity.set(Math.max(card2Opacity.get(), clamp01((p - 0.32) / 0.16)));
    card2X.set(Math.min(card2X.get(), lerp(40, 0, (p - 0.32) / 0.16)));

    line2Scale.set(Math.max(line2Scale.get(), clamp01((p - 0.48) / 0.24)));

    card3Opacity.set(Math.max(card3Opacity.get(), clamp01((p - 0.68) / 0.16)));
    card3X.set(Math.min(card3X.get(), lerp(40, 0, (p - 0.68) / 0.16)));
  });

  const cardMotion = [
    { opacity: card1Opacity, x: 0, y: card1Y },
    { opacity: card2Opacity, x: card2X, y: 0 },
    { opacity: card3Opacity, x: card3X, y: 0 },
  ];

  if (reduceMotion) {
    return (
      <section className="section-shell">
        <div className="section-container">
          <div className="text-center">
            <Badge>{t("process.eyebrow")}</Badge>
            <h2 className="font-display mt-4 text-3xl font-extrabold md:text-4xl">
              {t("process.title")}
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map((step, i) => (
              <ProcessCard key={step} step={step} index={i} t={t} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} className="relative h-[220vh]">
      <div className="sticky top-20 flex h-[calc(100vh-5rem)] items-center md:top-24">
        <div className="section-container w-full py-8">
          <div className="text-center">
            <Badge>{t("process.eyebrow")}</Badge>
            <h2 className="font-display mt-4 text-3xl font-extrabold md:text-4xl">
              {t("process.title")}
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-sm text-muted-foreground">
              {t("process.scrollHint")}
            </p>
          </div>

          <div className="mt-14 hidden items-center gap-0 md:flex">
            {steps.map((step, i) => (
              <div key={step} className="flex min-w-0 flex-1 items-center">
                <motion.div
                  className="w-full min-w-[200px] max-w-[280px] shrink-0"
                  style={{
                    opacity: cardMotion[i].opacity,
                    x: cardMotion[i].x,
                    y: cardMotion[i].y,
                  }}
                >
                  <ProcessCard step={step} index={i} t={t} />
                </motion.div>
                {i < steps.length - 1 ? (
                  <div className="flex h-10 min-w-[60px] flex-1 items-center px-2">
                    <motion.div
                      className="h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-mist"
                      style={{ scaleX: i === 0 ? line1Scale : line2Scale }}
                    />
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-6 md:hidden">
            {steps.map((step, i) => (
              <motion.div
                key={step}
                style={{ opacity: cardMotion[i].opacity, y: cardMotion[i].y }}
              >
                <ProcessCard step={step} index={i} t={t} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({
  step,
  index,
  t,
}: {
  step: (typeof steps)[number];
  index: number;
  t: (key: string) => string;
}) {
  return (
    <div className="surface-card rounded-2xl border-border bg-card/90 p-6 text-center shadow-sm backdrop-blur-sm">
      <span className="bg-brand-dot mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white">
        {index + 1}
      </span>
      <h3 className="text-lg font-bold">{t(`process.steps.${step}.title`)}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        {t(`process.steps.${step}.description`)}
      </p>
    </div>
  );
}
