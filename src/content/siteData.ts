export const serviceSlugs = [
  "web-development",
  "app-development",
  "custom-software-development",
  "ux-ui-design",
  "dynamics-365-erp",
  "dynamics-365-crm",
  "power-apps",
  "salesforce",
  "blockchain-cryptography",
  "gen-ai",
  "data-analytics",
  "staff-augmentation",
  "quality-assurance",
  "devops",
  "cybersecurity",
  "saas",
  "ecommerce-design-development",
  "ecommerce-maintenance-support",
  "google-business-profile",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export type ServiceMenuBlock =
  | { type: "group"; categoryKey: string; slugs: ServiceSlug[] }
  | { type: "link"; slug: ServiceSlug };

export const serviceMenuColumns: [ServiceMenuBlock[], ServiceMenuBlock[]] = [
  [
    {
      type: "group",
      categoryKey: "digitalTransformation",
      slugs: [
        "web-development",
        "app-development",
        "custom-software-development",
        "ux-ui-design",
      ],
    },
    {
      type: "group",
      categoryKey: "businessApplications",
      slugs: ["dynamics-365-erp", "dynamics-365-crm", "power-apps", "salesforce"],
    },
    { type: "link", slug: "blockchain-cryptography" },
    { type: "link", slug: "gen-ai" },
    { type: "link", slug: "data-analytics" },
    { type: "link", slug: "google-business-profile" },
    { type: "link", slug: "staff-augmentation" },
  ],
  [
    { type: "link", slug: "quality-assurance" },
    { type: "link", slug: "devops" },
    { type: "link", slug: "cybersecurity" },
    { type: "link", slug: "saas" },
    {
      type: "group",
      categoryKey: "ecommerce",
      slugs: ["ecommerce-design-development", "ecommerce-maintenance-support"],
    },
  ],
];

export const homepageCategoryKeys = [
  "digitalTransformation",
  "businessApplications",
  "genAi",
  "dataAnalytics",
  "ecommerce",
] as const;

export const industrySlugs = ["retail", "healthcare", "fintech", "hospitality"] as const;
export const caseStudySlugs = ["noor-retail", "fleetpulse", "gulfpay"] as const;
export const careerSlugs = ["senior-react-dev", "growth-marketer", "arabic-copywriter"] as const;
export const teamMemberIds = ["layla", "omar", "sarah", "ahmed"] as const;

export type IndustrySlug = (typeof industrySlugs)[number];
export type CaseStudySlug = (typeof caseStudySlugs)[number];
export type CareerSlug = (typeof careerSlugs)[number];
export type TeamMemberId = (typeof teamMemberIds)[number];

const imagePool = [
  "/images/digital-marketing.jpg",
  "/images/daniel-korpai-pKRNxEguRgM-unsplash.jpg",
  "/images/fotis-fotopoulos-LJ9KY8pIH3E-unsplash.jpg",
  "/images/mobile-development.jpg",
  "/images/team.jpg",
  "/images/data-insights.jpg",
  "/images/collaboration.jpg",
  "/images/webdevelopment.jpg",
  "/images/analytics-dashboard.jpg",
] as const;

export const serviceImages = Object.fromEntries(
  serviceSlugs.map((slug, i) => [slug, imagePool[i % imagePool.length]]),
) as Record<ServiceSlug, string>;

export const caseStudyImages: Record<CaseStudySlug, string> = {
  "noor-retail": "/images/premium_photo-1720287601300-cf423c3d6760.avif",
  fleetpulse: "/images/webdevelopment.jpg",
  gulfpay: "/images/analytics-dashboard.jpg",
};

export const openSourceProjects = [
  { id: "locale-ui", image: "/images/picture.avif", href: "https://github.com" },
  {
    id: "ship-kit",
    image: "/images/premium_photo-1720287601920-ee8c503af775.avif",
    href: "https://github.com",
  },
  { id: "motion-primitives", image: "/images/data-insights.jpg", href: "https://github.com" },
] as const;

export const industryImages: Record<IndustrySlug, string> = {
  retail: "/images/digital-marketing.jpg",
  healthcare: "/images/collaboration.jpg",
  fintech: "/images/data-insights.jpg",
  hospitality: "/images/premium_photo-1720287601920-ee8c503af775.avif",
};

export const industryGradients = {
  retail: "from-[#F86B64]/15 to-[#FFEDED]",
  healthcare: "from-[#FFEDED] to-white",
  fintech: "from-[#F86B64]/10 to-[#FFEDED]",
  hospitality: "from-[#FFEDED] to-[#F86B64]/10",
} as const;

export const caseStudyMetrics = {
  "noor-retail": ["38% CPL drop", "2.4x CR", "6 weeks"],
  fleetpulse: ["6 week ship", "99.9% uptime", "i18n ready"],
  gulfpay: ["52% signups", "3 locales", "4 sprints"],
} as const;
