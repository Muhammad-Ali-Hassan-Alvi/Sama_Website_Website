"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="section-shell min-h-[60vh]">
      <div className="section-container flex flex-col items-center justify-center text-center">
        <MotionInView>
          <p className="text-8xl font-extrabold tracking-tighter text-primary/20">404</p>
          <h1 className="mt-4 text-3xl font-bold">{t("notFound.title")}</h1>
          <p className="mt-3 max-w-md text-muted-foreground">{t("notFound.subtitle")}</p>
          <Button asChild className="mt-8">
            <Link href="/">{t("notFound.back")}</Link>
          </Button>
        </MotionInView>
      </div>
    </section>
  );
}
