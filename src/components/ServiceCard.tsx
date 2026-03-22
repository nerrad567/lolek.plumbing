"use client";

import { motion } from "framer-motion";
import {
  Flame,
  ShowerHead,
  Thermometer,
  Smartphone,
  Wrench,
  ClipboardCheck,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  boilers: Flame,
  bathrooms: ShowerHead,
  heating: Thermometer,
  smart: Smartphone,
  plumbing: Wrench,
  landlord: ClipboardCheck,
};

const accentMap: Record<string, string> = {
  boilers: "border-l-red",
  bathrooms: "border-l-blue",
  heating: "border-l-yellow",
  smart: "border-l-green",
  plumbing: "border-l-blue",
  landlord: "border-l-yellow",
};

interface ServiceCardProps {
  serviceKey: string;
  title: string;
  desc: string;
}

export default function ServiceCard({ serviceKey, title, desc }: ServiceCardProps) {
  const Icon = iconMap[serviceKey] || Wrench;
  const accent = accentMap[serviceKey] || "border-l-blue";

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.4, ease: "easeOut" },
        },
      }}
      whileHover={{ x: 4, transition: { duration: 0.15 } }}
      className={`card-solid border-l-2 ${accent} p-5 cursor-default`}
    >
      <div className="flex items-start gap-4">
        <Icon size={24} className="text-light/50 shrink-0 mt-0.5" />
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-1">{title}</h3>
          <p className="text-xs text-light/50 leading-relaxed">{desc}</p>
        </div>
      </div>
    </motion.div>
  );
}
