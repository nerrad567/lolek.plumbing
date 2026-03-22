"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface LightboxContextValue {
  open: (src: string, alt: string) => void;
}

let lightboxOpen: LightboxContextValue["open"] | null = null;

export function openLightbox(src: string, alt: string) {
  lightboxOpen?.(src, alt);
}

export default function Lightbox() {
  const [image, setImage] = useState<{ src: string; alt: string } | null>(null);

  const open = useCallback((src: string, alt: string) => {
    setImage({ src, alt });
  }, []);

  const close = useCallback(() => setImage(null), []);

  useEffect(() => {
    lightboxOpen = open;
    return () => { lightboxOpen = null; };
  }, [open]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    if (image) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [image, close]);

  return (
    <AnimatePresence>
      {image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={close}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
          role="dialog"
          aria-label="Image preview"
        >
          <button
            onClick={close}
            className="absolute top-4 right-4 text-white/80 hover:text-white"
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl max-h-[85vh] w-full"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={1200}
              height={800}
              className="object-contain w-full h-full rounded-lg"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
