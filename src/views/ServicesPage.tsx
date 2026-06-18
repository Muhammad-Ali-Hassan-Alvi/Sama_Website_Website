"use client";

import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/PageHero";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { CtaBanner } from "@/components/sections/CtaBanner";

export function ServicesPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero
        title={t("servicesPage.title")}
        subtitle={t("servicesPage.subtitle")}
        breadcrumbs={[{ label: t("nav.services") }]}
      />
      <section className="section-shell border-b border-border bg-card/50">
        <div className="section-container">
          <ServicesMegaMenu showTitle={false} />
        </div>
      </section>
      <ProcessSection />
      <CtaBanner />
    </>
  );
}
