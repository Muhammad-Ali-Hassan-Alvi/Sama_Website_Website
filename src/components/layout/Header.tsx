"use client";

import { Globe, Menu, X, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { NavLink } from "@/components/NavLink";
import { FaWhatsapp } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useLocale } from "@/hooks/useLocale";
import { localeLabels, supportedLocales, type Locale } from "@/lib/i18n";
import { BrandLogo } from "@/components/layout/BrandLogo";
import { GlassLinkColumns, GlassMegaMenu } from "@/components/layout/GlassMegaMenu";
import { ServicesMegaMenu } from "@/components/layout/ServicesMegaMenu";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { industrySlugs } from "@/content/siteData";
import { cn } from "@/lib/utils";

type NavChild = { key: string; to: string; labelKey?: string };

type NavGroup = {
  key: string;
  to: string;
  mega?: "services";
  children?: NavChild[];
};

const primaryNav: NavGroup[] = [
  { key: "whatWeDo", to: "/services", mega: "services" },
  {
    key: "whoWeHelp",
    to: "/industries",
    children: [
      { key: "allIndustries", to: "/industries" },
      ...industrySlugs.map((slug) => ({
        key: slug,
        to: `/industries/${slug}`,
        labelKey: `industryPages.${slug}.title`,
      })),
    ],
  },
  {
    key: "whoWeAre",
    to: "/about",
    children: [
      { key: "about", to: "/about" },
      { key: "team", to: "/team" },
      { key: "faq", to: "/faq" },
    ],
  },
  {
    key: "howWeDeliver",
    to: "/#process",
    children: [
      { key: "ourProcess", to: "/#process" },
      { key: "testimonials", to: "/testimonials" },
      { key: "caseStudies", to: "/case-studies" },
    ],
  },
  {
    key: "joinUs",
    to: "/careers",
    children: [
      { key: "careers", to: "/careers" },
      { key: "contact", to: "/contact" },
    ],
  },
];

function childLabel(child: NavChild, t: (k: string) => string) {
  if (child.labelKey) return t(child.labelKey);
  return t(`nav.${child.key}`);
}

function PrimaryNavLink({
  href,
  label,
  open,
  className,
}: {
  href: string;
  label: string;
  open?: boolean;
  className?: string;
}) {
  return (
    <NavLink
      href={href}
      className={({ isActive }) =>
        cn(
          "nav-link-primary",
          (isActive || open) && "nav-link-primary-active",
          open && "nav-link-primary-open",
          className,
        )
      }
    >
      {label}
      <ChevronDown className="h-3 w-3 shrink-0" />
    </NavLink>
  );
}

function NavMegaPanel({
  activeKey,
  onNavigate,
}: {
  activeKey: string;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();
  const item = primaryNav.find((nav) => nav.key === activeKey);
  if (!item) return null;

  if (item.key === "whatWeDo") {
    return (
      <ServicesMegaMenu embedded onNavigate={onNavigate} />
    );
  }

  if (!item.children) return null;

  const titles: Record<string, string> = {
    whoWeHelp: t("industriesPage.title"),
    whoWeAre: t("nav.whoWeAre"),
    howWeDeliver: t("nav.howWeDeliver"),
    joinUs: t("nav.joinUs"),
  };

  const viewAllMap: Record<string, { href: string; label: string } | undefined> = {
    whoWeHelp: { href: "/industries", label: t("nav.allIndustries") },
    whoWeAre: { href: "/about", label: t("nav.about") },
    howWeDeliver: { href: "/#process", label: t("nav.ourProcess") },
    joinUs: { href: "/careers", label: t("nav.careers") },
  };

  const viewAll = viewAllMap[item.key];
  const links = item.children
    .filter((child) => !(viewAll && child.key === "allIndustries"))
    .map((child) => ({
      href: child.to,
      label: childLabel(child, t),
    }));

  return (
    <GlassMegaMenu
      title={titles[item.key] ?? t(`nav.${item.key}`)}
      viewAll={viewAll}
      onNavigate={onNavigate}
    >
      <GlassLinkColumns
        links={links}
        onNavigate={onNavigate}
        columns={2}
      />
    </GlassMegaMenu>
  );
}

export function Header() {
  const { t } = useTranslation();
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({});

  const hasOpenMega = useMemo(
    () => primaryNav.some((item) => item.key === activeDropdown),
    [activeDropdown],
  );

  const toggleMobileSection = (key: string) => {
    setMobileSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <header className="site-header relative sticky top-0 z-50 border-b">
      <div onMouseLeave={() => setActiveDropdown(null)}>
        <div className="section-container relative flex h-[5.75rem] items-center justify-between gap-6">
          <Link href="/" className="group relative z-10 flex shrink-0 items-center">
            <BrandLogo priority size="xl" />
          </Link>

          <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 xl:flex xl:flex-nowrap xl:items-center xl:gap-0.5">
            {primaryNav.map((item) => (
              <div
                key={item.key}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.key)}
              >
                <PrimaryNavLink
                  href={item.to}
                  label={t(`nav.${item.key}`)}
                  open={activeDropdown === item.key}
                />
              </div>
            ))}
          </nav>

          <div className="relative z-10 hidden items-center gap-2 lg:flex">
            <ThemeToggle className="h-9 w-9 border-border/80 bg-transparent px-0" />
            <div
              className="relative"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <Button
                variant="outline"
                size="sm"
                className="nav-link-primary h-9 shrink-0 rounded-md border-border/80 bg-transparent px-3 whitespace-nowrap normal-case tracking-normal"
                onClick={(e) => {
                  e.stopPropagation();
                  setLangOpen((v) => !v);
                }}
                aria-label="Change language"
                aria-expanded={langOpen}
              >
                <Globe className="h-3.5 w-3.5" />
                {localeLabels[locale]}
              </Button>
              {langOpen ? (
                <div className="absolute end-0 top-full z-50 pt-2">
                  <div className="nav-glass-panel-compact min-w-[148px] overflow-hidden rounded-xl p-1.5">
                    {supportedLocales.map((code) => (
                      <button
                        key={code}
                        type="button"
                        onClick={() => {
                          setLocale(code as Locale);
                          setLangOpen(false);
                        }}
                        className={cn(
                          "flex w-full rounded-lg px-3 py-2 text-start text-sm transition hover:bg-foreground/5",
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
            <Button
              asChild
              variant="outline"
              className="nav-link-primary h-9 shrink-0 rounded-md border-foreground/20 bg-transparent whitespace-nowrap hover:bg-foreground hover:text-background"
            >
              <Link href="/contact">{t("nav.cta")}</Link>
            </Button>
          </div>

          <button
            type="button"
            className="mobile-menu-toggle relative z-10 inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-card text-foreground xl:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {hasOpenMega ? (
          <div className="nav-glass-panel hidden xl:block">
            <div className="section-container py-10 lg:py-12">
              <NavMegaPanel activeKey={activeDropdown!} />
            </div>
          </div>
        ) : null}
      </div>

      {open ? (
        <div className="mobile-nav-drawer max-h-[85vh] overflow-y-auto border-t bg-card px-4 py-4 text-card-foreground xl:hidden">
          <nav className="flex flex-col gap-1">
            {primaryNav.map((item) => (
              <div key={item.key} className="border-b border-border/60 last:border-0">
                <button
                  type="button"
                  onClick={() => toggleMobileSection(item.key)}
                  className="flex w-full items-center justify-between py-3 text-start text-[11px] font-semibold uppercase tracking-[0.16em] text-inherit"
                >
                  {t(`nav.${item.key}`)}
                  <ChevronDown
                    className={cn(
                      "h-4 w-4 transition",
                      mobileSections[item.key] && "rotate-180",
                    )}
                  />
                </button>
                {mobileSections[item.key] ? (
                  <div className="nav-glass-panel-compact mb-4 rounded-2xl p-4">
                    {item.mega === "services" ? (
                      <ServicesMegaMenu embedded onNavigate={() => setOpen(false)} />
                    ) : item.children ? (
                      <GlassLinkColumns
                        links={item.children.map((child) => ({
                          href: child.to,
                          label: childLabel(child, t),
                        }))}
                        onNavigate={() => setOpen(false)}
                      />
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
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
      href="https://wa.me/923449993391"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 end-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_30px_rgba(37,211,102,0.45)] transition hover:scale-105"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="h-7 w-7" />
    </a>
  );
}
