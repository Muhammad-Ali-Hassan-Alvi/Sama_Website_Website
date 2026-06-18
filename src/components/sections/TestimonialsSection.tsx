"use client";

import { Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export function TestimonialsSection() {
  const { t } = useTranslation();
  const items = t("testimonials.items", { returnObjects: true }) as Testimonial[];

  return (
    <section className="section-shell bg-gradient-to-b from-background to-muted/40 dark:from-white dark:to-[#faf7f2]">
      <div className="section-container">
        <SectionHeader
          eyebrow={t("testimonials.eyebrow")}
          title={t("testimonials.title")}
          subtitle={t("testimonials.subtitle")}
          eyebrowClassName="dark:text-brand"
          titleClassName="dark:text-stone-950"
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <MotionInView key={item.name} delay={i * 0.1}>
              <Card className="surface-card surface-card-hover h-full border-none">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/35" />
                  <p className="mt-4 text-sm leading-[1.75] text-foreground/85">
                    “{item.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t pt-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
