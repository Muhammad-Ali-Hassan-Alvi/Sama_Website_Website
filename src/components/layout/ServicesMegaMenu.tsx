"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { serviceMenuColumns, type ServiceMenuBlock } from "@/content/siteData";
import { cn } from "@/lib/utils";

type ServicesMegaMenuProps = {
  className?: string;
  onNavigate?: () => void;
  showTitle?: boolean;
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
          className="text-base font-bold text-foreground transition hover:text-primary"
        >
          {t(`servicePages.${block.slug}.title`)}
        </Link>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-3 text-base font-bold text-foreground">
        {t(`serviceCategories.${block.categoryKey}.title`)}
      </p>
      <ul className="space-y-2">
        {block.slugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`/services/${slug}`}
              onClick={onNavigate}
              className="text-sm text-foreground/75 transition hover:text-primary"
            >
              {t(`servicePages.${slug}.title`)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ServicesMegaMenu({
  className,
  onNavigate,
  showTitle = true,
}: ServicesMegaMenuProps) {
  const { t } = useTranslation();

  return (
    <div className={cn(className)}>
      {showTitle ? (
        <p className="mb-8 font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {t("services.capabilitiesTitle")}
        </p>
      ) : null}
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
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
      <div className="mt-8 border-t border-border pt-6">
        <Link
          href="/services"
          onClick={onNavigate}
          className="text-sm font-semibold text-primary transition hover:underline"
        >
          {t("services.viewAll")} →
        </Link>
      </div>
    </div>
  );
}
