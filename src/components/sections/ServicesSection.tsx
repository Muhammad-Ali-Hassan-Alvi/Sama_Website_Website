"use client";

import { Building2, Brain, Database, Layers, Sparkles, Store } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { homepageCategoryKeys } from "@/content/siteData";

const categoryIcons = {
  digitalTransformation: Layers,
  businessApplications: Building2,
  genAi: Brain,
  dataAnalytics: Database,
  ecommerce: Store,
} as const;

const categoryLinks: Record<(typeof homepageCategoryKeys)[number], string> = {
  digitalTransformation: "/services/web-development",
  businessApplications: "/services/dynamics-365-erp",
  genAi: "/services/gen-ai",
  dataAnalytics: "/services/data-analytics",
  ecommerce: "/services/ecommerce-design-development",
};

export function ServicesSection({ showAllLink = true }: { showAllLink?: boolean }) {
  const { t } = useTranslation();

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeader
          eyebrow={t("services.eyebrow")}
          title={t("services.title")}
          subtitle={t("services.subtitle")}
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homepageCategoryKeys.map((key, i) => {
            const Icon = categoryIcons[key];
            const points = t(`services.items.${key}.points`, {
              returnObjects: true,
            }) as string[];

            return (
              <MotionInView key={key} delay={i * 0.1}>
                <Card className="surface-card surface-card-hover group h-full">
                  <CardHeader>
                    <div className="service-icon-wrap mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                      <Icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{t(`services.items.${key}.title`)}</CardTitle>
                    <CardDescription>{t(`services.items.${key}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {points.map((point) => (
                        <li key={point} className="flex items-start gap-2">
                          <span className="bg-brand-dot mt-2 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {point}
                        </li>
                      ))}
                    </ul>
                    <Button asChild variant="ghost" className="text-brand mt-6 px-0 hover:bg-transparent">
                      <Link href={categoryLinks[key]}>{t("services.learnMore")} →</Link>
                    </Button>
                  </CardContent>
                </Card>
              </MotionInView>
            );
          })}
        </div>

        {showAllLink ? (
          <MotionInView className="mt-10 flex flex-wrap items-center gap-3">
            <Button asChild variant="outline" className="border-brand-mist bg-card hover:bg-brand-mist/50">
              <Link href="/services">{t("services.viewAll")}</Link>
            </Button>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <Sparkles className="h-4 w-4 text-primary" />
              {t("services.capabilitiesTitle")}
            </span>
          </MotionInView>
        ) : null}
      </div>
    </section>
  );
}
