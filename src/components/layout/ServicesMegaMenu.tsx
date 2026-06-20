"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { serviceMenuColumns, type ServiceMenuBlock } from "@/content/siteData";
import { GlassMegaMenu } from "@/components/layout/GlassMegaMenu";
import { cn } from "@/lib/utils";

type ServicesMegaMenuProps = {
  className?: string;
  onNavigate?: () => void;
  embedded?: boolean;
};

function MenuBlock({
  block,
  onNavigate,
}: {
  block: ServiceMenuBlock;
  onNavigate?: () => void;
}) {
  const { t } = useTranslation();

  if (block.type === "link") {
    return (
      <div>
        <Link
          href={`/services/${block.slug}`}
          onClick={onNavigate}
          className="nav-glass-link text-base font-semibold"
        >
          {t(`servicePages.${block.slug}.title`)}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-sm font-bold whitespace-nowrap uppercase tracking-[0.12em] text-foreground">
        {t(`serviceCategories.${block.categoryKey}.title`)}
      </p>
      <ul className="space-y-1">
        {block.slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/services/${slug}`}
              onClick={onNavigate}
              className="nav-glass-link block py-1.5 text-[0.9375rem] font-medium"
            >
              {t(`servicePages.${slug}.title`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ServicesMenuGrid({
  onNavigate,
  className,
}: {
  onNavigate?: () => void;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 md:grid-cols-2 md:gap-x-12 md:gap-y-6", className)}>
      {serviceMenuColumns.map((column, colIndex) => (
        <div key={colIndex} className="space-y-8">
          {column.map((block, blockIndex) => (
            <MenuBlock
              key={`${colIndex}-${blockIndex}`}
              block={block}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ServicesMegaMenu({
  className,
  onNavigate,
  embedded = false,
}: ServicesMegaMenuProps) {
  const { t } = useTranslation();

  if (embedded) {
    return (
      <GlassMegaMenu
        title={t("services.capabilitiesTitle")}
        viewAll={{ href: "/services", label: t("services.viewAll") }}
        onNavigate={onNavigate}
        className={className}
      >
        <ServicesMenuGrid onNavigate={onNavigate} />
      </GlassMegaMenu>
    );
  }

  return (
    <div className={cn(className)}>
      <ServicesMenuGrid onNavigate={onNavigate} />
    </div>
  );
}
