import type { Metadata } from "next";
import Script from "next/script";
import { Cairo, Outfit, Syne } from "next/font/google";
import { Providers } from "@/components/providers";
import { SiteShell } from "@/components/SiteShell";
import "@/styles/globals.css";

const syne = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-outfit",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zyvron Tech",
  description:
    "Zyvron Tech — product engineering, web applications, digital marketing, and B2B solutions for the GCC.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-icon.png",
  },
};

const themeInitScript = `(function(){try{var t=localStorage.getItem("sama-theme");var dark=t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches);if(dark)document.documentElement.classList.add("dark");document.documentElement.style.colorScheme=dark?"dark":"light";}catch(e){}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${outfit.variable} ${cairo.variable}`}
      suppressHydrationWarning
    >
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
