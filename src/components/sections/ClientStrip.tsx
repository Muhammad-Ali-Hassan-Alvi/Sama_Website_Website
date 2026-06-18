"use client";

import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { FaGoogle } from "react-icons/fa";
import { SiMeta, SiShopify, SiStripe } from "react-icons/si";

const logos = [
  { Icon: SiMeta, label: "Meta" },
  { Icon: FaGoogle, label: "Google" },
  { Icon: SiShopify, label: "Shopify" },
  { Icon: SiStripe, label: "Stripe" },
];

export function ClientStrip() {
  const { t } = useTranslation();

  return (
    <section className="border-y border-border bg-background py-10">
      <div className="section-container">
        <MotionInView className="text-center">
          <h2 className="text-lg font-bold text-foreground md:text-xl">{t("clients.title")}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-sm text-foreground/70">
            {t("clients.subtitle")}
          </p>
        </MotionInView>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 md:gap-10">
          {logos.map(({ Icon, label }, i) => (
            <MotionInView key={label} delay={i * 0.08}>
              <div className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-3 text-sm font-semibold text-card-foreground shadow-sm">
                <Icon className="h-5 w-5" />
                {label}
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
