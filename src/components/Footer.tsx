"use client";

import { COMPANY } from "@/lib/constants";
import { useLang } from "@/lib/LangContext";

export default function Footer() {
  const { dict } = useLang();

  return (
    <footer className="bg-dark-surface border-t-2 border-light/5 py-6 text-center text-xs text-light/25 pb-20 md:pb-6">
      <p className="mb-1">
        <span className="font-black text-blue">LOLEK</span>
        <span className="text-red font-black">.</span>
        <span className="text-light/20">plumbing</span>
      </p>
      <p>
        &copy; {new Date().getFullYear()} {COMPANY.fullName}. {dict.footer.rights}
      </p>
      <p className="mt-2">
        Website by{" "}
        <a
          href="https://digital.graylogic.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="text-light/30 hover:text-light/60 transition-colors"
        >
          Gray Logic
        </a>
      </p>
    </footer>
  );
}
