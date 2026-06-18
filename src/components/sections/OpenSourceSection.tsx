"use client";

import { useTranslation } from "react-i18next";
import { FaGithub, FaStar } from "react-icons/fa";
import { MotionInView } from "@/components/MotionInView";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { openSourceProjects } from "@/content/siteData";

export function OpenSourceSection() {
  const { t } = useTranslation();

  return (
    <section className="section-shell">
      <div className="section-container">
        <SectionHeader
          eyebrow={t("openSource.eyebrow")}
          title={t("openSource.title")}
          subtitle={t("openSource.subtitle")}
        />

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {openSourceProjects.map((project, i) => (
            <MotionInView key={project.id} delay={i * 0.1}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="surface-card surface-card-hover group flex h-full flex-col overflow-hidden rounded-2xl"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#FFEDED]">
                  <img
                    src={project.image}
                    alt={t(`openSource.projects.${project.id}.name`)}
                    className="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute end-4 top-4 flex items-center gap-1.5 rounded-full border border-white/30 bg-black/40 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-md">
                    <FaStar className="h-3 w-3 text-[#F86B64]" />
                    {t(`openSource.projects.${project.id}.stars`)}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center gap-2">
                    <FaGithub className="h-4 w-4 text-foreground/60" />
                    <h3 className="font-bold">
                      {t(`openSource.projects.${project.id}.name`)}
                    </h3>
                  </div>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {t(`openSource.projects.${project.id}.description`)}
                  </p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-[#F86B64]">
                    {t("openSource.viewRepo")}
                  </span>
                </div>
              </a>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
}
