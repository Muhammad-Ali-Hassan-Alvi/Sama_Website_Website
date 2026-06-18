"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const companyLinks = [
  { key: "about", to: "/about" },
  { key: "team", to: "/team" },
  { key: "careers", to: "/careers" },
  { key: "faq", to: "/faq" },
] as const;

const quickLinks = [
  { key: "services", to: "/services" },
  { key: "industries", to: "/industries" },
  { key: "caseStudies", to: "/case-studies" },
  { key: "contact", to: "/contact" },
] as const;

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-8">
      <div className="footer-glass-wrap mx-4 mb-4 overflow-hidden rounded-[1.75rem] md:mx-6">
        <div aria-hidden className="footer-gradient-bg pointer-events-none absolute inset-0" />
        <div
          aria-hidden
          className="absolute -end-20 -top-20 h-56 w-56 rounded-full bg-brand/25 blur-3xl"
        />
        <div
          aria-hidden
          className="absolute -bottom-16 start-1/4 h-48 w-48 rounded-full bg-brand-mist blur-3xl"
        />

        <div className="footer-glass-panel relative">
          <div className="section-container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
            <div className="lg:col-span-1">
              <div className="mb-4 flex items-center gap-3">
                <span className="brand-logo flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-extrabold text-white">
                  S
                </span>
                <p className="text-lg font-bold">{t("brand.name")}</p>
              </div>
              <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
                {t("footer.description")}
              </p>
              <div className="mt-5 flex gap-2.5">
                {[FaLinkedinIn, FaInstagram].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card/50 text-foreground/65 backdrop-blur-sm transition hover:border-brand/30 hover:text-brand"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                {t("footer.quickLinks")}
              </p>
              <ul className="space-y-2.5 text-sm">
                {quickLinks.map(({ key, to }) => (
                  <li key={to}>
                    <Link href={to} className="hover-text-brand text-muted-foreground transition">
                      {t(`nav.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                {t("footer.company")}
              </p>
              <ul className="space-y-2.5 text-sm">
                {companyLinks.map(({ key, to }) => (
                  <li key={to}>
                    <Link href={to} className="hover-text-brand text-muted-foreground transition">
                      {t(`nav.${key}`)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-foreground/50">
                {t("footer.contact")}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2.5">
                  <Mail className="text-brand mt-0.5 h-4 w-4 shrink-0" />
                  {t("footer.email")}
                </li>
                <li className="flex items-start gap-2.5">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-foreground/50" />
                  {t("footer.phone")}
                </li>
                <li className="flex items-start gap-2.5">
                  <MapPin className="text-brand mt-0.5 h-4 w-4 shrink-0" />
                  {t("footer.location")}
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
            © {year} {t("brand.name")}. {t("footer.rights")}
          </div>
        </div>
      </div>
    </footer>
  );
}
