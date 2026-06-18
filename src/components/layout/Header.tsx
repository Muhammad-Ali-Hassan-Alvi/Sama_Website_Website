"use client";

import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { localeLabels, supportedLocales, type Locale } from "@/lib/i18n";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { cn } from "@/lib/utils";

type NavItem =
  | { key: string; to: string; children?: undefined }
  | { key: string; to: string; children: Array<{ key: string; to: string }> };

const navItems: NavItem[] = [
  { key: "home", to: "/" },
  { key: "services", to: "/services" },
  {
    key: "work",
    to: "/case-studies",
    children: [
      { key: "caseStudies", to: "/case-studies" },
      { key: "testimonials", to: "/testimonials" },
    ],
  },
  { key: "industries", to: "/industries" },
  {
    key: "about",
    to: "/about",
    children: [
      { key: "about", to: "/about" },
      { key: "team", to: "/team" },
      { key: "careers", to: "/careers" },
      { key: "faq", to: "/faq" },
    ],
  },
  { key: "contact", to: "/contact" },
];

function navChildLabel(key: string, t: (k: string) => string) {
  return t(`nav.${key}`);
}

export function Header() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  return (
    <header className="site-header relative sticky top-0 z-50 border-b backdrop-blur-xl">
      <div
        onMouseLeave={() => {
          if (activeDropdown === "services") setActiveDropdown(null);
        }}
      >
        <div className="section-container flex h-[4.75rem] items-center justify-between gap-4">
        <Link href="/" className="group flex shrink-0 items-center gap-3">
          <span className="brand-logo flex h-10 w-10 items-center justify-center rounded-2xl text-lg font-extrabold text-white transition group-hover:scale-[1.03]">
            S
          </span>
          <div className="leading-tight">
            <p className="text-[15px] font-bold tracking-tight">{t("brand.name")}</p>
            <p className="text-[11px] font-medium text-muted-foreground">{t("brand.short")}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) =>
            item.key === "services" ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
              >
                <NavLink
                  href={item.to}
                  className={({ isActive }) =>
                    cn(
                      "nav-pill inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium",
                      isActive ? "nav-pill-active" : "text-foreground/75",
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </NavLink>
              </div>
            ) : item.children ? (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.key)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <NavLink
                  href={item.to}
                  className={({ isActive }) =>
                    cn(
                      "nav-pill inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium",
                      isActive ? "nav-pill-active" : "text-foreground/75",
                    )
                  }
                >
                  {t(`nav.${item.key}`)}
                  <ChevronDown className="h-3.5 w-3.5 opacity-50" />
                </NavLink>
                {activeDropdown === item.key ? (
                  <div className="absolute start-0 top-full z-50 before:absolute before:-top-2 before:h-2 before:w-full before:content-['']">
                    <div className="nav-dropdown nav-panel min-w-[190px] overflow-hidden rounded-2xl p-1.5">
                      {item.children.map((child) => (
                        <Link
                          key={child.to}
                          href={child.to}
                          className="block rounded-xl px-3.5 py-2.5 text-sm font-medium text-foreground/80 transition hover:bg-muted hover:text-primary"
                        >
                          {navChildLabel(child.key, t)}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : (
              <NavLink
                key={item.key}
                href={item.to}
                className={({ isActive }) =>
                  cn(
                    "nav-pill rounded-full px-3.5 py-2 text-sm font-medium",
                    isActive ? "nav-pill-active" : "text-foreground/75",
                  )
                }
              >
                {t(`nav.${item.key}`)}
              </NavLink>
            ),
          )}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle className="bg-card/80" />
          <div
            className="relative"
            onMouseEnter={() => setLangOpen(true)}
            onMouseLeave={() => setLangOpen(false)}
          >
            <Button
              variant="outline"
              size="sm"
              className="bg-card/80"
              onClick={(e) => {
                e.stopPropagation();
                setLangOpen((v) => !v);
              }}
              aria-label="Change language"
              aria-expanded={langOpen}
            >
              <Globe />
              {localeLabels[locale]}
            </Button>
            {langOpen ? (
              <div className="absolute end-0 top-full z-50 pt-2">
                <div
                  className="nav-dropdown nav-panel min-w-[148px] overflow-hidden rounded-xl p-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  {supportedLocales.map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        setLocale(code as Locale);
                        setLangOpen(false);
                      }}
                      className={cn(
                        "flex w-full rounded-lg px-3 py-2 text-start text-sm transition hover:bg-muted",
                        locale === code && "bg-primary/10 font-semibold text-primary",
                      )}
                    >
                      {localeLabels[code]}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          <Button asChild className="shadow-md shadow-primary/15">
            <Link href="/contact">{t("nav.cta")}</Link>
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-card xl:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

        {activeDropdown === "services" ? (
          <div className="hidden border-t border-border bg-card shadow-2xl xl:block">
            <div className="section-container py-10">
              <ServicesMegaMenu />
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="max-h-[80vh] overflow-y-auto border-t bg-card px-4 py-4 xl:hidden">
          <nav className="flex flex-col gap-1">
            <NavLink
              href="/"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-xl px-4 py-3 text-sm font-medium",
                  isActive ? "bg-primary/10 text-primary" : "text-foreground/80",
                )
              }
            >
              {t("nav.home")}
            </NavLink>

            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex items-center justify-between rounded-xl px-4 py-3 text-start text-sm font-medium text-foreground/80"
            >
              {t("nav.services")}
              <ChevronDown
                className={cn("h-4 w-4 transition", mobileServicesOpen && "rotate-180")}
              />
            </button>
            {mobileServicesOpen ? (
              <div className="mb-2 rounded-2xl border border-border bg-background p-4">
                <ServicesMegaMenu
                  showTitle={false}
                  onNavigate={() => {
                    setOpen(false);
                    setMobileServicesOpen(false);
                  }}
                />
              </div>
            ) : null}

            {navItems
              .filter((item) => item.key !== "home" && item.key !== "services")
              .flatMap((item) =>
                item.children
                  ? item.children.map((child) => (
                      <NavLink
                        key={child.to}
                        href={child.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "rounded-xl px-4 py-3 text-sm font-medium",
                            isActive ? "bg-primary/10 text-primary" : "text-foreground/80",
                          )
                        }
                      >
                        {navChildLabel(child.key, t)}
                      </NavLink>
                    ))
                  : [
                      <NavLink
                        key={item.to}
                        href={item.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          cn(
                            "rounded-xl px-4 py-3 text-sm font-medium",
                            isActive ? "bg-primary/10 text-primary" : "text-foreground/80",
                          )
                        }
                      >
                        {t(`nav.${item.key}`)}
                      </NavLink>,
                    ],
              )}
          </nav>
          <div className="mt-4 flex flex-col gap-2 border-t pt-4">
            <ThemeToggle className="w-full justify-center bg-card" />
            <Button
              variant="outline"
              onClick={() => {
                setLocale(locale === "en" ? "ar" : "en");
                setOpen(false);
              }}
            >
              <Globe />
              {locale === "en" ? "العربية" : "English"}
            </Button>
            <Button asChild>
              <Link href="/contact" onClick={() => setOpen(false)}>
                {t("nav.cta")}
              </Link>
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href="https://wa.me/97141234567"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
