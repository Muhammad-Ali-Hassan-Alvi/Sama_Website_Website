"use client";

import type { IconType } from "react-icons";
import {
  SiGoogle,
  SiNextdotjs,
  SiNodedotjs,
  SiOpenai,
  SiPostgresql,
  SiReact,
  SiShopify,
} from "react-icons/si";

const SCROLL_DURATION = 32;

const techIconMap: Record<
  string,
  { Icon: IconType; color: string }
> = {
  React: { Icon: SiReact, color: "#61DAFB" },
  "Next.js": { Icon: SiNextdotjs, color: "currentColor" },
  "Node.js": { Icon: SiNodedotjs, color: "#68A063" },
  "Gen AI": { Icon: SiOpenai, color: "#412991" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169E1" },
  Shopify: { Icon: SiShopify, color: "#96BF48" },
  GMB: { Icon: SiGoogle, color: "#4285F4" },
};

export function HeroTechScroller({ labels }: { labels: string[] }) {
  const items = labels
    .map((label) => ({ label, ...techIconMap[label] }))
    .filter((item) => item.Icon);
  const track = [...items, ...items];
  const count = items.length || 1;

  if (items.length === 0) return null;

  return (
    <div className="hero-tech-marquee">
      <div
        className="hero-tech-track"
        style={
          {
            "--tech-scroll-duration": `${SCROLL_DURATION}s`,
          } as React.CSSProperties
        }
      >
        {track.map(({ label, Icon, color }, i) => (
          <div
            key={`${label}-${i}`}
            className="hero-tech-card"
            style={{
              animationDelay: `${-((i % count) / count) * SCROLL_DURATION}s`,
            }}
          >
            <Icon style={{ color }} className="hero-tech-icon" aria-hidden />
            <span className="hero-tech-label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
