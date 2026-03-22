"use client";

import { Phone } from "lucide-react";
import { COMPANY } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

export default function MobileStickyCall() {
  const { dict } = useLang();

  return (
    <a
      href={COMPANY.phoneHref}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden flex items-center justify-center gap-2 bg-blue py-4 text-light font-bold text-lg"
      aria-label={dict.contact.calltext}
    >
      <Phone size={20} />
      {dict.contact.calltext}
    </a>
  );
}
