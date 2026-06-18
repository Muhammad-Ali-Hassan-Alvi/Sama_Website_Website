"use client";

import { Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function ContactFormSection() {
  const { t } = useTranslation();
  const [sent, setSent] = useState(false);

  return (
    <MotionInView>
      <form
        className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg md:p-8"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        {sent ? (
          <p className="rounded-xl bg-secondary/10 px-4 py-6 text-center font-medium text-secondary">
            {t("contactPage.form.success")}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("contactPage.form.name")}
              </label>
              <Input required />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium">
                {t("contactPage.form.email")}
              </label>
              <Input type="email" required />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                {t("contactPage.form.company")}
              </label>
              <Input />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                {t("contactPage.form.message")}
              </label>
              <Textarea required />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg">
                {t("contactPage.form.submit")}
                <Send />
              </Button>
            </div>
          </div>
        )}
      </form>
    </MotionInView>
  );
}
