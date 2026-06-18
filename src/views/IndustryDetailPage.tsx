"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { MotionInView } from "@/components/MotionInView";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { industryGradients, industrySlugs, type IndustrySlug } from "@/content/siteData";
import { Button } from "@/components/ui/button";

function isIndustrySlug(slug: string): slug is IndustrySlug {
  return (industrySlugs as readonly string[]).includes(slug);
}

export function IndustryDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const router = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    if (!isIndustrySlug(slug)) router.replace("/industries");
  }, [slug, router]);

  if (!isIndustrySlug(slug)) return null;

  const challenges = t(`industryPages.${slug}.challenges`, { returnObjects: true }) as string[];
  const solutions = t(`industryPages.${slug}.solutions`, { returnObjects: true }) as string[];

  return (
    <>
      <PageHero
        eyebrow={t("industriesPage.detailEyebrow")}
        title={t(`industryPages.${slug}.title`)}
        subtitle={t(`industryPages.${slug}.subtitle`)}
        breadcrumbs={[
          { label: t("nav.industries"), href: "/industries" },
          { label: t(`industryPages.${slug}.title`) },
        ]}
      >
        <Button asChild className="mt-8">
          <Link href="/contact">
            {t("common.getStarted")}
            <ArrowUpRight />
          </Link>
        </Button>
      </PageHero>

      <section className="section-shell">
        <div className="section-container grid gap-10 lg:grid-cols-2">
          <MotionInView>
            <div className={`rounded-3xl bg-gradient-to-br p-8 ${industryGradients[slug]}`}>
              <p className="text-lg leading-relaxed text-foreground/85">
                {t(`industryPages.${slug}.overview`)}
              </p>
            </div>
          </MotionInView>
          <div className="grid gap-6">
            <MotionInView delay={0.05}>
              <div className="surface-card rounded-2xl p-6">
                <h2 className="font-bold">{t("industriesPage.challenges")}</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {challenges.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-primary">—</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionInView>
            <MotionInView delay={0.1}>
              <div className="surface-card rounded-2xl p-6">
                <h2 className="font-bold">{t("industriesPage.solutions")}</h2>
                <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                  {solutions.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-secondary">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </MotionInView>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}
