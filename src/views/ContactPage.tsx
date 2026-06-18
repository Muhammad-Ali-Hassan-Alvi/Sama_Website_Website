"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PageHero } from "@/components/sections/PageHero";
import { ContactFormSection } from "@/components/sections/ContactFormSection";
import { MotionInView } from "@/components/MotionInView";

export function ContactPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageHero title={t("contactPage.title")} subtitle={t("contactPage.subtitle")} />
      <section className="section-shell">
        <div className="section-container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <MotionInView>
            <div className="space-y-6">
              {[
                { Icon: Mail, label: t("footer.email"), value: t("footer.email") },
                { Icon: Phone, label: t("footer.phone"), value: t("footer.phone") },
                { Icon: MapPin, label: t("footer.location"), value: t("footer.location") },
              ].map(({ Icon, label, value }) => (
                <div key={label} className="flex gap-4 rounded-2xl border border-border bg-card p-5 text-card-foreground">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {label}
                    </p>
                    <p className="mt-1 font-medium">{value}</p>
                  </div>
                </div>
              ))}
            </div>
          </MotionInView>
          <ContactFormSection />
        </div>
      </section>
    </>
  );
}
