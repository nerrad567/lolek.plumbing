import type { Metadata } from "next";
import localFont from "next/font/local";
import { locales } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionary";
import type { Locale } from "@/lib/i18n";
import GasSafeBadge from "@/components/GasSafeBadge";
import Lightbox from "@/components/Lightbox";
import ScrollController from "@/components/ScrollController";
import { LangProvider } from "@/lib/LangContext";
import "../globals.css";

const outfit = localFont({
  src: "../../assets/outfit.woff2",
  variable: "--font-outfit",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isPolish = lang === "pl";

  return {
    metadataBase: new URL("https://www.lolek.plumbing"),
    title: isPolish
      ? "LOLEK Hydraulik Colchester | Ogrzewanie i Hydraulika"
      : "LOLEK Plumbing Colchester | Heating Engineer & Plumber",
    description: isPolish
      ? "Certyfikowany hydraulik i inżynier ogrzewania w Colchester, Essex. Gas Safe. Bez opłaty za wyjazd. Zadzwoń 07549 251073."
      : "Dependable plumber and heating engineer in Colchester, Essex. Gas Safe registered. No call-out fee. Call 07549 251073.",
    keywords: isPolish
      ? ["hydraulik colchester", "polski hydraulik essex", "ogrzewanie colchester", "gas safe"]
      : ["plumber colchester", "heating engineer essex", "gas safe colchester", "boiler install essex"],
    openGraph: {
      type: "website",
      locale: isPolish ? "pl_PL" : "en_GB",
      siteName: "LOLEK Plumbing",
      images: [
        {
          url: "https://www.lolek.plumbing/images/og-image.jpg",
          width: 1200,
          height: 630,
          alt: "LOLEK Plumbing — Colchester",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      images: ["https://www.lolek.plumbing/images/og-image.jpg"],
    },
    alternates: {
      canonical: lang === "en" ? "/" : `/${lang}`,
      languages: {
        en: "/",
        pl: "/pl",
        "x-default": "/",
      },
    },
    other: {
      "geo.region": "GB-ESS",
      "geo.placename": "Colchester",
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={outfit.variable}>
      <body className="antialiased overflow-x-hidden">
        <a href="#home" className="sr-only focus:not-sr-only focus:absolute focus:z-[200] focus:bg-blue focus:text-white focus:p-4">
          Skip to content
        </a>
        <LangProvider initialLang={lang as Locale} initialDict={dict}>
          <GasSafeBadge />
          {children}
          <Lightbox />
          <ScrollController />
        </LangProvider>
      </body>
    </html>
  );
}
