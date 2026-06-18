"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/PageHero";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { MotionInView } from "@/components/MotionInView";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function AboutPage() {
  const { t } = useTranslation();
  const values = t("about.values", { returnObjects: true }) as string[];
  const beliefs = t("about.beliefs", { returnObjects: true }) as string[];

  return (
    <>
      <PageHero
        title={t("about.title")}
        subtitle={t("about.subtitle")}
        breadcrumbs={[{ label: t("nav.about") }]}
      />
      <section className="section-shell">
        <div className="section-container grid gap-10 lg:grid-cols-2">
          <MotionInView>
            <p className="text-lg leading-[1.8] text-muted-foreground">{t("about.story")}</p>
            <ul className="mt-8 space-y-3">
              {beliefs.map((belief) => (
                <li
                  key={belief}
                  className="surface-card rounded-xl px-4 py-3 text-sm font-medium text-foreground/85"
                >
                  {belief}
                </li>
              ))}
            </ul>
          </MotionInView>
          <MotionInView delay={0.1}>
            <div className="surface-card rounded-2xl p-8">
              <h2 className="font-display text-xl font-bold">{t("about.missionTitle")}</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{t("about.mission")}</p>
              <h3 className="mt-8 text-lg font-bold">{t("about.valuesTitle")}</h3>
              <ul className="mt-4 space-y-3">
                {values.map((value) => (
                  <li key={value} className="flex gap-3 text-sm text-foreground/85">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-primary" />
                    {value}
                  </li>
                ))}
              </ul>
            </div>
          </MotionInView>
        </div>
      </section>
      <WhyUsSection />
      <CtaBanner />
    </>
  );
}
