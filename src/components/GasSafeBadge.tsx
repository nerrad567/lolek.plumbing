import Image from "next/image";
import { COMPANY } from "@/lib/constants";

export default function GasSafeBadge() {
  return (
    <a
      href={COMPANY.gasSafeUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed top-3 right-28 z-40 hidden md:block transition-transform hover:scale-105"
      aria-label="Gas Safe Registered"
    >
      <Image
        src="/images/ui/gas-safe.png"
        alt="Gas Safe Registered"
        width={394}
        height={428}
        className="w-[80px] h-auto"
        priority
      />
    </a>
  );
}
