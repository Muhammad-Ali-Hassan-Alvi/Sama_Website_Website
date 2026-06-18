"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { PageHero } from "@/components/sections/PageHero";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { industrySlugs, industryImages, caseStudySlugs, caseStudyImages } from "@/content/siteData";

export function IndustriesPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("industriesPage.title")}
        subtitle={t("industriesPage.subtitle")}
        breadcrumbs={[{ label: t("nav.industries") }]}
      />
      <section className="section-shell">
        <div className="section-container grid gap-6 md:grid-cols-2">
          {industrySlugs.map((slug, i) => (
            <MotionInView key={slug} delay={i * 0.08}>
              <Link
                href={`/industries/${slug}`}
                className="surface-card surface-card-hover group block overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={industryImages[slug]}
                    alt=""
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/80 via-[#0c0a09]/35 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-8 text-white">
                    <h2 className="text-2xl font-bold">{t(`industryPages.${slug}.title`)}</h2>
                    <p className="mt-2 text-sm text-white/80">
                      {t(`industryPages.${slug}.subtitle`)}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#ffb4a8]">
                      {t("common.readMore")}
                      <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </div>
              </Link>
            </MotionInView>
          ))}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function CaseStudiesPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("caseStudiesPage.title")}
        subtitle={t("caseStudiesPage.subtitle")}
        breadcrumbs={[{ label: t("nav.caseStudies") }]}
      />
      <section className="section-shell">
        <div className="section-container">
          <SectionHeader title={t("nav.successStories")} className="mb-0" />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {caseStudySlugs.map((slug, i) => (
              <MotionInView key={slug} delay={i * 0.1}>
                <Link
                  href={`/case-studies/${slug}`}
                  className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={caseStudyImages[slug]}
                      alt=""
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <p className="text-xs font-bold uppercase tracking-wider text-[#F86B64]">
                      {t(`caseStudyPages.${slug}.service`)}
                    </p>
                    <h3 className="mt-3 text-xl font-bold">{t(`caseStudyPages.${slug}.title`)}</h3>
                    <p className="mt-2 flex-1 text-sm text-muted-foreground">
                      {t(`caseStudyPages.${slug}.summary`)}
                    </p>
                    <span className="mt-6 text-sm font-semibold text-[#F86B64]">
                      {t("caseStudiesPage.readCase")} →
                    </span>
                  </div>
                </Link>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
