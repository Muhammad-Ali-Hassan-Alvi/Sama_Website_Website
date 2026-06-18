"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MotionInView } from "@/components/MotionInView";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { caseStudyMetrics, caseStudySlugs, type CaseStudySlug } from "@/content/siteData";
import { Badge } from "@/components/ui/badge";

function isCaseStudySlug(slug: string): slug is CaseStudySlug {
  return (caseStudySlugs as readonly string[]).includes(slug);
}

export function CaseStudyDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isCaseStudySlug(slug)) router.replace("/case-studies");
  }, [slug, router]);

  if (!isCaseStudySlug(slug)) return null;

  const results = t(`caseStudyPages.${slug}.results`, { returnObjects: true }) as string[];
  const metrics = caseStudyMetrics[slug];

  return (
    <>
      <PageHero
        eyebrow={t("caseStudiesPage.detailEyebrow")}
        title={t(`caseStudyPages.${slug}.title`)}
        subtitle={t(`caseStudyPages.${slug}.subtitle`)}
        breadcrumbs={[
          { label: t("nav.caseStudies"), href: "/case-studies" },
          { label: t(`caseStudyPages.${slug}.title`) },
        ]}
      >
        <div className="mt-6 flex flex-wrap gap-2">
          <Badge>{t(`caseStudyPages.${slug}.client`)}</Badge>
          <Badge variant="secondary">{t(`caseStudyPages.${slug}.service`)}</Badge>
        </div>
      </PageHero>

      <section className="section-shell">
        <div className="section-container">
          <div className="mb-10 grid gap-4 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric} className="stat-pill surface-card rounded-2xl p-6 text-center">
                <p className="text-2xl font-extrabold text-primary">{metric}</p>
                <p className="mt-1 text-xs text-muted-foreground">{t("caseStudiesPage.metricLabel")}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {[
              { key: "challenge", title: t("caseStudiesPage.challenge") },
              { key: "approach", title: t("caseStudiesPage.approach") },
              { key: "results", title: t("caseStudiesPage.results") },
            ].map(({ key, title }, i) => (
              <MotionInView key={key} delay={i * 0.08}>
                <article className="surface-card h-full rounded-2xl p-6">
                  <h2 className="font-bold">{title}</h2>
                  {key === "results" ? (
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      {results.map((item) => (
                        <li key={item}>• {item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {t(`caseStudyPages.${slug}.${key}`)}
                    </p>
                  )}
                </article>
              </MotionInView>
            ))}
          </div>

          <MotionInView className="mt-10">
            <Link
              href="/case-studies"
              className="text-sm font-semibold text-primary hover:underline"
            >
              ← {t("common.backTo")} {t("nav.caseStudies")}
            </Link>
          </MotionInView>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
