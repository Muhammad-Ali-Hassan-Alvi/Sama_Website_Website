"use client";

import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import {
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiShopify,
} from "react-icons/si";
import { MotionInView } from "@/components/MotionInView";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export function HeroSection() {
  const { t } = useTranslation();
  const headlines = t("hero.headlines", { returnObjects: true }) as Array<{
    top: string;
    bottom: string;
  }>;
  const cardItems = t("hero.cardItems", { returnObjects: true }) as string[];
  const techStack = t("hero.techStack", { returnObjects: true }) as string[];
  const promises = t("hero.promises", { returnObjects: true }) as string[];

  const techIcons = [
    { Icon: SiReact, color: "#61DAFB" },
    { Icon: SiNextdotjs, color: "currentColor" },
    { Icon: SiNodedotjs, color: "#68A063" },
    { Icon: SiOpenai, color: "#412991" },
    { Icon: SiPostgresql, color: "#4169E1" },
    { Icon: SiShopify, color: "#96BF48" },
  ] as const;

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
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:gap-16">
          <div className="min-w-0 overflow-visible pe-0 lg:pe-4">
            <h1
              aria-live="polite"
              className="hero-headline transition-[opacity,transform,filter] duration-500"
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
                      <ul className="mt-5 grid gap-2.5 sm:grid-cols-2 sm:gap-x-4">
                        {cardItems.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-[0.8125rem] font-medium leading-snug text-card-foreground"
                          >
                            <span className="mt-1.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15">
                              <span className="bg-brand-dot h-1.5 w-1.5 rounded-full" />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="grid grid-cols-3 gap-2 bg-muted/50 p-4 md:p-5">
                      {techIcons.map(({ Icon, color }, i) => (
                        <div
                          key={techStack[i] ?? i}
                          className="surface-card-hover flex flex-col items-center gap-1.5 rounded-xl border border-border bg-card p-3 text-center"
                        >
                          <Icon style={{ color }} className="h-6 w-6" />
                          <span className="text-[0.6875rem] font-semibold leading-tight text-foreground">
                            {techStack[i]}
                          </span>
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
