"use client";

import { useLang } from "@/lib/LangContext";

/* eslint-disable @next/next/no-img-element */

export default function LanguageSwitcher() {
  const { lang, switchLang } = useLang();

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2">
      <button
        onClick={() => switchLang("en")}
        className={`transition-opacity duration-300 ${lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        aria-label="English"
      >
        <img src="/images/ui/en.png" alt="English" width={70} height={70} className="drop-shadow-md w-10 h-10 md:w-[70px] md:h-[70px]" />
      </button>
      <button
        onClick={() => switchLang("pl")}
        className={`transition-opacity duration-300 ${lang === "pl" ? "opacity-100" : "opacity-40 hover:opacity-70"}`}
        aria-label="Polski"
      >
        <img src="/images/ui/pl.png" alt="Polski" width={70} height={70} className="drop-shadow-md w-10 h-10 md:w-[70px] md:h-[70px]" />
      </button>
    </div>
  );
}
