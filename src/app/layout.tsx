import type { Metadata } from "next";
import Script from "next/script";
import { Providers } from "@/components/providers";
import { SiteShell } from "@/components/SiteShell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "Sama Digital",
  description:
    "Sama Digital — product engineering, web applications, digital marketing, and B2B solutions.",
  icons: {
    icon: "/favicon.svg",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("sama-theme");var dark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("dark");document.documentElement.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Script id="sama-theme-init" strategy="beforeInteractive">
          {themeInitScript}
        </Script>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
