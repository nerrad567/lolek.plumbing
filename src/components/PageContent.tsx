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
import FaqSection from "./FaqSection";
import ContactSection from "./ContactSection";
import Navigation from "./Navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import MobileStickyCall from "./MobileStickyCall";
import Footer from "./Footer";

// Structured data built from trusted constants only
const BUSINESS_ID = `https://${COMPANY.domain}/#business`;
const businessRef = { "@id": BUSINESS_ID };

const services = [
  {
    name: "Boiler Installation, Repair and Servicing",
    description: "Gas Safe certified installation, repair and annual servicing of combi, system and conventional boilers. All major brands including Worcester Bosch, Vaillant, Baxi and Ideal. 10-year warranty available on qualifying new installations.",
  },
  {
    name: "Bathroom Design and Installation",
    description: "Complete bathroom refurbishments in Colchester and across Essex — full suites, wet rooms, walk-in showers, tiling and plumbing. Design consultation through to handover.",
  },
  {
    name: "Central Heating Installation and Upgrades",
    description: "Radiator replacement, underfloor heating, power flushing and full central heating system upgrades. Improves efficiency and reduces running costs.",
  },
  {
    name: "Smart Heating Controls Installation",
    description: "Installation and setup of Hive, Nest, Tado and other smart thermostats. Cut your energy bills with wireless heating control.",
  },
  {
    name: "Emergency Plumbing Repairs",
    description: "Same-day response for burst pipes, leaks, blocked drains, tap and toilet repairs in Colchester, Ipswich, Chelmsford and surrounding Essex towns. No call-out fee.",
  },
  {
    name: "Landlord Gas Safety Certificates (CP12)",
    description: "CP12 gas safety inspections and certificates for rental properties. Same-day issue. Competitive rates for letting agents and portfolio landlords.",
  },
];

const structuredData = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Plumber",
  "@id": BUSINESS_ID,
  name: COMPANY.fullName,
  description: "Gas Safe registered plumber and heating engineer serving Colchester, Essex and surrounding areas. Boilers, bathrooms, central heating and emergency plumbing. No call-out fee.",
  url: `https://${COMPANY.domain}`,
  telephone: COMPANY.phoneHref.replace("tel:", ""),
  email: COMPANY.email,
  image: `https://${COMPANY.domain}/images/ui/og-image.jpg`,
  priceRange: "££",
  knowsLanguage: ["en", "pl"],
  identifier: {
    "@type": "PropertyValue",
    propertyID: "Gas Safe Register",
    value: "657768",
  },
  sameAs: [
    "https://share.google/bIOM1gZZBme5GvhJX",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Colchester",
    addressRegion: "Essex",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 51.8959, longitude: 0.8919 },
  areaServed: [
    "Colchester", "Ipswich", "Braintree", "Witham", "Chelmsford", "Clacton",
    "Harwich", "Manningtree", "Sudbury", "Halstead", "Tiptree", "Wivenhoe",
  ].map((name) => ({ "@type": "City", name })),
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Gas Safe Registered",
    identifier: "657768",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5",
    bestRating: "5",
    ratingCount: "55",
  },
  openingHoursSpecification: [{
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "07:00",
    closes: "22:00",
  }],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Plumbing and Heating Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.name,
        description: s.description,
        provider: businessRef,
        areaServed: { "@type": "AdministrativeArea", name: "Essex" },
      },
    })),
  },
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
        <FaqSection />
        <div className="snap-last">
          <ContactSection />
          <Footer />
        </div>
      </main>
    </>
  );
}
