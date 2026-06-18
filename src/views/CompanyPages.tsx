"use client";

import { MapPin, Briefcase } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { MotionInView } from "@/components/MotionInView";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBanner } from "@/components/sections/CtaBanner";
import { careerSlugs } from "@/content/siteData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function CareersPage() {
  const { t } = useTranslation();
  const perks = t("careersPage.perks", { returnObjects: true }) as string[];

  return (
    <>
      <PageHero
        title={t("careersPage.title")}
        subtitle={t("careersPage.subtitle")}
        breadcrumbs={[{ label: t("nav.careers") }]}
      />
      <section className="section-shell">
        <div className="section-container grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <MotionInView>
            <h2 className="text-xl font-bold">{t("careersPage.perksTitle")}</h2>
            <ul className="mt-4 space-y-3">
              {perks.map((perk) => (
                <li key={perk} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="text-secondary">✓</span>
                  {perk}
                </li>
              ))}
            </ul>
          </MotionInView>
          <div>
            <h2 className="mb-4 text-xl font-bold">{t("careersPage.openRoles")}</h2>
            <div className="space-y-4">
              {careerSlugs.map((slug, i) => (
                <MotionInView key={slug} delay={i * 0.08}>
                  <article className="surface-card rounded-2xl p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="font-bold">{t(`careerPages.${slug}.title`)}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">
                          {t(`careerPages.${slug}.description`)}
                        </p>
                        <div className="mt-3 flex flex-wrap gap-2">
                          <Badge variant="outline" className="gap-1">
                            <MapPin className="h-3 w-3" />
                            {t(`careerPages.${slug}.location`)}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Briefcase className="h-3 w-3" />
                            {t(`careerPages.${slug}.type`)}
                          </Badge>
                        </div>
                      </div>
                      <Button asChild size="sm">
                        <Link href="/contact">{t("careersPage.apply")}</Link>
                      </Button>
                    </div>
                  </article>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function TeamPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("teamPage.title")}
        subtitle={t("teamPage.subtitle")}
        breadcrumbs={[{ label: t("nav.team") }]}
      />
      <section className="section-shell">
        <div className="section-container grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {(["layla", "omar", "sarah", "ahmed"] as const).map((id, i) => (
            <MotionInView key={id} delay={i * 0.08}>
              <article className="surface-card surface-card-hover rounded-2xl p-6 text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#e85d4c]/20 to-[#1a8f8f]/20 text-2xl font-extrabold text-primary">
                  {t(`teamMembers.${id}.name`).charAt(0)}
                </div>
                <h3 className="font-bold">{t(`teamMembers.${id}.name`)}</h3>
                <p className="mt-1 text-sm font-medium text-secondary">
                  {t(`teamMembers.${id}.role`)}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t(`teamMembers.${id}.bio`)}
                </p>
              </article>
            </MotionInView>
          ))}
        </div>
        <MotionInView className="mt-10 text-center">
          <Button asChild variant="outline" className="bg-card">
            <Link href="/careers">{t("teamPage.join")}</Link>
          </Button>
        </MotionInView>
      </section>
      <CtaBanner />
    </>
  );
}

export function PricingPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("pricingPage.title")}
        subtitle={t("pricingPage.subtitle")}
        breadcrumbs={[{ label: t("nav.pricing") }]}
      />
      <section className="section-shell">
        <div className="section-container grid gap-6 lg:grid-cols-3">
          {(["starter", "growth", "enterprise"] as const).map((plan, i) => {
            const features = t(`pricingPlans.${plan}.features`, {
              returnObjects: true,
            }) as string[];
            const popular = plan === "growth";

            return (
              <MotionInView key={plan} delay={i * 0.1}>
                <article
                  className={`surface-card relative flex h-full flex-col rounded-2xl p-7 ${
                    popular ? "ring-2 ring-primary/30 shadow-xl" : ""
                  }`}
                >
                  {popular ? (
                    <Badge className="absolute -top-3 start-6">{t("pricingPage.popular")}</Badge>
                  ) : null}
                  <p className="text-sm font-bold text-secondary">{t(`pricingPlans.${plan}.name`)}</p>
                  <p className="mt-3 text-4xl font-extrabold tracking-tight">
                    {t(`pricingPlans.${plan}.price`)}
                  </p>
                  <p className="text-xs text-muted-foreground">{t("pricingPage.monthly")}</p>
                  <p className="mt-4 text-sm text-muted-foreground">
                    {t(`pricingPlans.${plan}.description`)}
                  </p>
                  <ul className="mt-6 flex-1 space-y-2.5 text-sm text-muted-foreground">
                    {features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="text-primary">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="mt-8 w-full" variant={popular ? "default" : "outline"}>
                    <Link href="/contact">
                      {plan === "enterprise"
                        ? t("pricingPage.contactSales")
                        : t("pricingPage.choose")}
                    </Link>
                  </Button>
                </article>
              </MotionInView>
            );
          })}
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function FAQPage() {
  const { t } = useTranslation();
  const items = t("faqPage.items", { returnObjects: true }) as Array<{
    q: string;
    a: string;
  }>;

  return (
    <>
      <PageHero
        title={t("faqPage.title")}
        subtitle={t("faqPage.subtitle")}
        breadcrumbs={[{ label: t("nav.faq") }]}
      />
      <section className="section-shell">
        <div className="section-container max-w-3xl">
          <MotionInView>
            <div className="surface-card rounded-2xl px-6 md:px-8">
              {items.map((item) => (
                <details key={item.q} className="group border-b border-border/70 last:border-b-0">
                  <summary className="cursor-pointer list-none py-5 text-base font-semibold transition hover:text-primary [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center justify-between gap-4">
                      {item.q}
                      <span className="text-primary transition group-open:rotate-45">+</span>
                    </span>
                  </summary>
                  <p className="pb-5 text-sm leading-relaxed text-muted-foreground">{item.a}</p>
                </details>
              ))}
            </div>
          </MotionInView>
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

export function TestimonialsPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("testimonials.title")}
        subtitle={t("testimonials.subtitle")}
        breadcrumbs={[{ label: t("nav.testimonials") }]}
      />
      <section className="section-shell pt-0">
        <div className="section-container">
          <TestimonialsGrid />
        </div>
      </section>
      <CtaBanner />
    </>
  );
}

function TestimonialsGrid() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as Array<{
    quote: string;
    name: string;
    role: string;
  }>;

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {items.map((item, i) => (
        <MotionInView key={item.name} delay={i * 0.1}>
          <article className="surface-card h-full rounded-2xl p-6">
            <p className="text-sm leading-relaxed text-foreground/85">“{item.quote}”</p>
            <div className="mt-6 border-t pt-4">
              <p className="font-bold">{item.name}</p>
              <p className="text-xs text-muted-foreground">{item.role}</p>
            </div>
          </article>
        </MotionInView>
      ))}
    </div>
  );
}
