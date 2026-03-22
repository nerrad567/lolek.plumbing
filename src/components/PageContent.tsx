"use client";

import { useLang } from "@/lib/LangContext";
import { reviews as allReviews } from "@/lib/reviews";
import { COMPANY } from "@/lib/constants";
import { useMemo } from "react";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import ServicesSection from "./ServicesSection";
import ProjectsSection from "./ProjectsSection";
import ReviewsSection from "./ReviewsSection";
import ContactSection from "./ContactSection";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileStickyCall from "./MobileStickyCall";
import Footer from "./Footer";

// Structured data built from trusted constants only
const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Plumber",
  name: COMPANY.fullName,
  url: `https://${COMPANY.domain}`,
  telephone: COMPANY.phone,
  email: COMPANY.email,
  address: { "@type": "PostalAddress", addressLocality: "Colchester", addressRegion: "Essex", addressCountry: "GB" },
  geo: { "@type": "GeoCoordinates", latitude: 51.8959, longitude: 0.8919 },
  areaServed: ["Colchester", "Ipswich", "Braintree", "Witham", "Chelmsford", "Clacton", "Harwich", "Manningtree", "Sudbury", "Halstead", "Tiptree", "Wivenhoe"],
  hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Gas Safe Registered" },
  aggregateRating: { "@type": "AggregateRating", ratingValue: "5", bestRating: "5", ratingCount: "55" },
  openingHours: "Mo-Su 07:00-22:00",
  priceRange: "££",
});

export default function PageContent() {
  const { dict } = useLang();
  // Use a fixed slice to avoid hydration mismatch from random shuffle
  const reviews = useMemo(() => allReviews.slice(0, 9), []);

  const features = useMemo(() => [
    { title: dict.features.smart.title, desc: dict.features.smart.desc },
    { title: dict.features.emergency.title, desc: dict.features.emergency.desc },
    { title: dict.features.nocallout.title, desc: dict.features.nocallout.desc },
    { title: dict.features.rated.title, desc: dict.features.rated.desc },
    { title: dict.features.gassafe.title, desc: dict.features.gassafe.desc },
    { title: dict.features.local.title, desc: dict.features.local.desc },
  ], [dict]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: structuredData }} />
      <Navigation />
      <LanguageSwitcher />
      <MobileStickyCall />
      <main className="snap-container">
        <HeroSection dict={dict.home} features={features} />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ReviewsSection reviews={reviews} />
        <div className="snap-last">
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
