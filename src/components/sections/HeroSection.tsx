"use client";

import { ArrowUpRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { SiNextdotjs, SiNodedotjs, SiReact } from "react-icons/si";
import { MotionInView } from "@/components/MotionInView";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const { t } = useTranslation();
  const headlines = t("hero.headlines", { returnObjects: true }) as Array<{
    top: string;
    bottom: string;
  }>;
  const cardItems = t("hero.cardItems", { returnObjects: true }) as string[];
  const promises = t("hero.promises", { returnObjects: true }) as string[];

  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % headlines.length);
        setVisible(true);
      }, 450);
    }, 4200);
    return () => clearInterval(timer);
  }, [headlines.length]);

  const phrase = headlines[index];

  return (
    <section className="relative overflow-x-hidden pb-12 pt-6 md:pb-20 md:pt-10">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-hero opacity-90" />
      <div aria-hidden className="hero-orb hero-orb-a animate-float-soft" />
      <div aria-hidden className="hero-orb hero-orb-b" />

      <div className="section-container relative">
        <MotionInView className="overflow-visible">
          <Badge variant="secondary" className="hero-eyebrow mb-6 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 shrink-0" />
            <span>{t("hero.eyebrow")}</span>
          </Badge>
        </MotionInView>

        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="min-w-0 overflow-visible pe-0 lg:pe-4">
            <h1
              aria-live="polite"
              className="hero-headline font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-extrabold transition-[opacity,transform,filter] duration-500"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(12px)",
                filter: visible ? "none" : "blur(4px)",
              }}
            >
              <span className="hero-headline-top text-foreground">{phrase.top}</span>
              <span className="hero-headline-gradient">{phrase.bottom}</span>
            </h1>

            <MotionInView delay={0.1}>
              <p className="mt-6 max-w-xl text-base leading-[1.75] text-muted-foreground md:text-[1.125rem]">
                {t("hero.description")}
              </p>
            </MotionInView>

            <MotionInView delay={0.15} className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="shadow-lg shadow-primary/20">
                <Link href="/contact">
                  {t("hero.primaryCta")}
                  <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="bg-card/80">
                <Link href="/case-studies">{t("hero.secondaryCta")}</Link>
              </Button>
            </MotionInView>

            <MotionInView delay={0.2} className="mt-10">
              <blockquote className="manifesto-card">
                <p className="manifesto-quote">{t("hero.manifesto")}</p>
              </blockquote>
              <div className="mt-4 flex flex-wrap gap-2">
                {promises.map((item) => (
                  <span key={item} className="hero-promise">
                    {item}
                  </span>
                ))}
              </div>
            </MotionInView>
          </div>

          <MotionInView direction="left" delay={0.1} className="min-w-0">
            <div className="relative lg:pe-2">
              <div aria-hidden className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-[#F86B64]/12 via-transparent to-[#FFEDED]/40 blur-2xl" />
              <div className="relative flex flex-col gap-[10px]">
                <Card className="surface-card relative overflow-hidden">
                  <CardContent className="p-0">
                    <div className="border-b border-border bg-card p-6 text-card-foreground md:p-7">
                      <p className="text-sm font-bold tracking-wide text-card-foreground">
                        {t("hero.cardTitle")}
                      </p>
                      <ul className="mt-5 space-y-3">
                        {cardItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-center gap-3 text-sm font-medium text-card-foreground"
                          >
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15">
                              <span className="bg-brand-dot h-2 w-2 rounded-full" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-3 gap-3 bg-muted/50 p-5 md:p-6">
                      {[
                        { Icon: SiReact, label: "React", color: "#61DAFB" },
                        { Icon: SiNodedotjs, label: "Node", color: "#68A063" },
                        { Icon: SiNextdotjs, label: "Next.js", color: "currentColor" },
                      ].map(({ Icon, label, color }) => (
                        <div
                          key={label}
                          className="surface-card-hover flex flex-col items-center gap-2 rounded-xl border border-border bg-card p-4 text-center"
                        >
                          <Icon style={{ color }} className="h-7 w-7" />
                          <span className="text-xs font-semibold text-foreground">{label}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <div className="hero-tagline-marquee hidden md:block">
                  <div className="hero-tagline-track">
                    <span className="hero-tagline-item">{t("hero.floatingTagline")}</span>
                    <span className="hero-tagline-item" aria-hidden>
                      {t("hero.floatingTagline")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </MotionInView>
        </div>
      </div>
    </section>
  );
}
