"use client";

import { Loader2, Send } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { MotionInView } from "@/components/MotionInView";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FormState = "idle" | "sending" | "sent" | "error";

export function ContactFormSection() {
  const { t } = useTranslation();
  const [state, setState] = useState<FormState>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          company: formData.get("company"),
          message: formData.get("message"),
        }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        throw new Error(data.error ?? t("contactPage.form.error"));
      }

      setState("sent");
      form.reset();
    } catch (error) {
      setState("error");
      setErrorMessage(
        error instanceof Error ? error.message : t("contactPage.form.error"),
      );
    }
  }

  return (
    <MotionInView>
      <form
        className="rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg md:p-8"
        onSubmit={handleSubmit}
      >
        {state === "sent" ? (
          <p className="rounded-xl bg-secondary/10 px-4 py-6 text-center font-medium text-secondary">
            {t("contactPage.form.success")}
          </p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {state === "error" ? (
              <p className="md:col-span-2 rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
              </p>
            ) : null}
            <div>
              <label htmlFor="contact-name" className="mb-2 block text-sm font-medium">
                {t("contactPage.form.name")}
              </label>
              <Input id="contact-name" name="name" required disabled={state === "sending"} />
            </div>
            <div>
              <label htmlFor="contact-email" className="mb-2 block text-sm font-medium">
                {t("contactPage.form.email")}
              </label>
              <Input
                id="contact-email"
                name="email"
                type="email"
                required
                disabled={state === "sending"}
              />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="contact-company" className="mb-2 block text-sm font-medium">
                {t("contactPage.form.company")}
              </label>
              <Input id="contact-company" name="company" disabled={state === "sending"} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="contact-message" className="mb-2 block text-sm font-medium">
                {t("contactPage.form.message")}
              </label>
              <Textarea id="contact-message" name="message" required disabled={state === "sending"} />
            </div>
            <div className="md:col-span-2">
              <Button type="submit" size="lg" disabled={state === "sending"}>
                {state === "sending" ? t("contactPage.form.sending") : t("contactPage.form.submit")}
                {state === "sending" ? (
                  <Loader2 className="animate-spin" />
                ) : (
                  <Send />
                )}
              </Button>
            </div>
          </div>
        )}
      </form>
    </MotionInView>
  );
}
