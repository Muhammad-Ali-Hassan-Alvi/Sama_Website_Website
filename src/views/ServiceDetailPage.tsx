"use client";

import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MotionInView } from "@/components/MotionInView";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { caseStudySlugs, serviceImages, serviceSlugs, type ServiceSlug } from "@/content/siteData";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function isServiceSlug(slug: string): slug is ServiceSlug {
  return (serviceSlugs as readonly string[]).includes(slug);
}

export function ServiceDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isServiceSlug(slug)) router.replace("/services");
  }, [slug, router]);

  if (!isServiceSlug(slug)) return null;

  const capabilities = t(`servicePages.${slug}.capabilities`, {
    returnObjects: true,
  }) as string[];
  const outcomes = t(`servicePages.${slug}.outcomes`, {
    returnObjects: true,
  }) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("servicesPage.detailEyebrow")}
        title={t(`servicePages.${slug}.title`)}
        subtitle={t(`servicePages.${slug}.subtitle`)}
        breadcrumbs={[
          { label: t("nav.services"), href: "/services" },
          { label: t(`servicePages.${slug}.title`) },
        ]}
      >
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/contact">
              {t("common.getStarted")}
              <ArrowUpRight />
            </Link>
          </Button>
          <Button asChild variant="outline" className="bg-card">
            <Link href="/case-studies">{t("common.viewWork")}</Link>
          </Button>
        </div>
      </PageHero>

      <section className="section-shell pt-0">
        <div className="section-container">
          <MotionInView>
            <div className="overflow-hidden rounded-[1.75rem] border border-[#FFEDED] shadow-lg shadow-[#F86B64]/10">
              <img
                src={serviceImages[slug]}
                alt={t(`servicePages.${slug}.title`)}
                className="aspect-[21/9] w-full object-cover"
              />
            </div>
          </MotionInView>
        </div>
      </section>

      <section className="section-shell">
        <div className="section-container grid gap-10 lg:grid-cols-[1fr_1fr]">
          <MotionInView>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {t(`servicePages.${slug}.overview`)}
            </p>
          </MotionInView>
          <MotionInView delay={0.1}>
            <Card className="surface-card">
              <CardContent className="p-6">
                <h2 className="font-bold">{t("servicesPage.capabilities")}</h2>
                <ul className="mt-4 space-y-3">
                  {capabilities.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </MotionInView>
        </div>
      </section>

      <section className="section-shell bg-muted/30">
        <div className="section-container">
          <MotionInView>
            <h2 className="text-2xl font-bold">{t("servicesPage.outcomes")}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {outcomes.map((item, i) => (
                <div
                  key={item}
                  className="surface-card rounded-2xl p-5"
                  style={{ animationDelay: `${i * 80}ms` }}
                >
                  <p className="text-sm font-semibold text-primary">0{i + 1}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item}</p>
                </div>
              ))}
            </div>
          </MotionInView>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="section-container">
          <MotionInView>
            <h2 className="mb-6 text-2xl font-bold">{t("servicesPage.relatedWork")}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {caseStudySlugs.slice(0, 3).map((caseSlug) => (
                <Link
                  key={caseSlug}
                  href={`/case-studies/${caseSlug}`}
                  className="surface-card surface-card-hover rounded-2xl p-5"
                >
                  <p className="font-bold">{t(`caseStudyPages.${caseSlug}.title`)}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t(`caseStudyPages.${caseSlug}.summary`)}
                  </p>
                </Link>
              ))}
            </div>
          </MotionInView>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
