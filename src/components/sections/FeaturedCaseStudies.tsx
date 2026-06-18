"use client";

import { useTranslation } from "react-i18next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { MotionInView } from "@/components/MotionInView";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { caseStudySlugs, caseStudyImages } from "@/content/siteData";
import { Badge } from "@/components/ui/badge";

export function FeaturedCaseStudies() {
  const { t } = useTranslation();

  return (
    <section className="section-shell section-tint">
      <div className="section-container">
        <SectionHeader
          eyebrow={t("featuredWork.eyebrow")}
          title={t("featuredWork.title")}
          subtitle={t("featuredWork.subtitle")}
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudySlugs.map((slug, i) => (
            <MotionInView key={slug} delay={i * 0.1}>
              <Link
                href={`/case-studies/${slug}`}
                className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={caseStudyImages[slug]}
                    alt={t(`caseStudyPages.${slug}.title`)}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a09]/70 via-transparent to-transparent" />
                  <Badge className="absolute start-4 top-4 border-white/20 bg-white/20 text-white backdrop-blur-md">
                    {t(`caseStudyPages.${slug}.service`)}
                  </Badge>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-xl font-bold">
                    {t(`caseStudyPages.${slug}.title`)}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`caseStudyPages.${slug}.summary`)}
                  </p>
                  <span className="text-brand mt-5 inline-flex items-center gap-1 text-sm font-semibold">
                    {t("caseStudiesPage.readCase")}
                    <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
