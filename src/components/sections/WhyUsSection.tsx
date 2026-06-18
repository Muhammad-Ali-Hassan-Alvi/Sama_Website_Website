"use client";

import { Languages, BarChart3, Palette, Rocket } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { SectionHeader } from "@/components/shared/SectionHeader";

const items = [
  { key: "bilingual", Icon: Languages, accent: "bg-[#e85d4c]/10 text-[#e85d4c]" },
  { key: "speed", Icon: Rocket, accent: "bg-[#f4a259]/15 text-[#c7772e]" },
  { key: "data", Icon: BarChart3, accent: "bg-[#1a8f8f]/10 text-[#1a8f8f]" },
  { key: "design", Icon: Palette, accent: "bg-[#7c6df0]/10 text-[#6b5bd6]" },
] as const;

export function WhyUsSection() {
  const { t } = useTranslation();

  return (
    <section className="section-shell bg-background">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-10">
          <MotionInView>
            <SectionHeader
              eyebrow={t("whyUs.eyebrow")}
              title={t("whyUs.title")}
              subtitle={t("whyUs.subtitle")}
            />
          </MotionInView>

          <div className="grid gap-4 sm:grid-cols-2">
            {items.map(({ key, Icon, accent }, i) => (
              <MotionInView key={key} delay={i * 0.08}>
                <article className="surface-card surface-card-hover h-full rounded-2xl p-5">
                  <div
                    className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${accent}`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-foreground">{t(`whyUs.items.${key}.title`)}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {t(`whyUs.items.${key}.description`)}
                  </p>
                </article>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
