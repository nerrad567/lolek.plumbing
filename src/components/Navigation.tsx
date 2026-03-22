"use client";

import { useState, useEffect, useCallback } from "react";
import { Home, User, Wrench, Briefcase, Phone } from "lucide-react";
import { NAV_SECTIONS } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

const icons = {
  home: Home,
  about: User,
  services: Wrench,
  work: Briefcase,
  contact: Phone,
} as const;

const indexToNav: Record<number, string> = {
  0: "home",
  1: "about",
  2: "services",
  3: "work",
  4: "work",
  5: "contact",
};

const navToIndex: Record<string, number> = {
  home: 0,
  about: 1,
  services: 2,
  work: 3,
  contact: 5,
};

export default function Navigation() {
  const { dict } = useLang();
  const labels = dict.nav;
  const [active, setActive] = useState("home");

  const updateFromScroll = useCallback(() => {
    const container = document.querySelector(".snap-container") as HTMLElement | null;
    if (!container) return;

    const scrollTop = container.scrollTop;
    const children = Array.from(container.children) as HTMLElement[];
    let accumulated = 0;

    for (let i = 0; i < children.length; i++) {
      const childHeight = children[i].offsetHeight;
      if (scrollTop < accumulated + childHeight * 0.6) {
        const navId = indexToNav[i];
        if (navId) setActive(navId);
        return;
      }
      accumulated += childHeight;
    }
  }, []);

  useEffect(() => {
    const container = document.querySelector(".snap-container") as HTMLElement | null;
    if (!container) return;

    container.addEventListener("scroll", updateFromScroll, { passive: true });
    updateFromScroll();
    return () => container.removeEventListener("scroll", updateFromScroll);
  }, [updateFromScroll]);

  const scrollTo = (id: string) => {
    const scrollFn = (window as unknown as Record<string, unknown>).__scrollToSection as ((i: number) => void) | undefined;
    if (scrollFn && id in navToIndex) {
      scrollFn(navToIndex[id]);
    }
  };

  return (
    <nav className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden md:block">
      {/* Industrial rail */}
      <div className="bg-dark-surface/95 border-r-2 border-blue/30 border-t border-b border-t-light/5 border-b-light/5 py-4 px-2.5 flex flex-col gap-1.5">
        {NAV_SECTIONS.map((id) => {
          const Icon = icons[id];
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`group relative w-10 h-10 flex items-center justify-center transition-all duration-200 ${
                isActive
                  ? "bg-blue text-light rounded-sm"
                  : "text-light/30 hover:text-light/70 hover:bg-light/5 rounded-sm"
              }`}
              aria-label={labels[id]}
            >
              <Icon size={17} strokeWidth={isActive ? 2.5 : 1.5} />
              <span className="absolute left-full ml-4 px-3 py-1.5 bg-dark-surface/98 border border-light/8 text-xs font-bold text-light uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity rounded-sm">
                {labels[id]}
              </span>
              {isActive && (
                <span className="absolute -right-2.5 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue" />
              )}
            </button>
          );
        })}

        {/* Section indicator line */}
        <div className="mt-3 pt-3 border-t border-light/5 text-center">
          <span className="text-[8px] text-light/20 uppercase tracking-[0.3em] font-bold">Nav</span>
        </div>
      </div>
    </nav>
  );
}
