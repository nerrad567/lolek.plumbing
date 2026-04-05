"use client";

import { useEffect, useRef, useCallback } from "react";

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export default function ScrollController() {
  const isAnimating = useRef(false);
  const currentIndex = useRef(0);
  const touchStartY = useRef(0);

  const getContainer = useCallback(() => {
    return document.querySelector(".snap-container") as HTMLElement | null;
  }, []);

  const getSections = useCallback(() => {
    const container = getContainer();
    if (!container) return [];
    // Direct children: sections and the snap-last wrapper
    return Array.from(container.children) as HTMLElement[];
  }, [getContainer]);

  const scrollToIndex = useCallback((index: number) => {
    const sections = getSections();
    const container = getContainer();
    if (!container || sections.length === 0) return;

    const clampedIndex = Math.max(0, Math.min(index, sections.length - 1));
    if (clampedIndex === currentIndex.current && isAnimating.current) return;

    isAnimating.current = true;
    currentIndex.current = clampedIndex;

    const startScroll = container.scrollTop;
    // Target: top of the section element relative to the container's scroll
    let endScroll = 0;
    for (let i = 0; i < clampedIndex; i++) {
      endScroll += sections[i].offsetHeight;
    }

    // For the last section, scroll to the bottom so footer is visible
    if (clampedIndex === sections.length - 1) {
      endScroll = container.scrollHeight - container.clientHeight;
    }

    const distance = endScroll - startScroll;

    if (Math.abs(distance) < 2) {
      isAnimating.current = false;
      return;
    }

    const duration = 1200;
    let startTime: number | null = null;

    function animate(time: number) {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutCubic(progress);

      container!.scrollTop = startScroll + distance * eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          isAnimating.current = false;
        }, 150);
      }
    }

    requestAnimationFrame(animate);
  }, [getSections, getContainer]);

  useEffect(() => {
    const container = getContainer();
    if (!container || window.innerWidth < 769) return;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (isAnimating.current) return;

      const direction = e.deltaY > 0 ? 1 : -1;
      scrollToIndex(currentIndex.current + direction);
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const deltaY = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(deltaY) < 50) return;
      scrollToIndex(currentIndex.current + (deltaY > 0 ? 1 : -1));
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        scrollToIndex(currentIndex.current + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        scrollToIndex(currentIndex.current - 1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchend", handleTouchEnd, { passive: true });
    document.addEventListener("keydown", handleKeyDown);

    // Expose for nav component
    (window as unknown as Record<string, unknown>).__scrollToSection = scrollToIndex;

    // Handle hash on load (from language switch)
    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const sectionMap: Record<string, number> = {
        home: 0, about: 1, services: 2, work: 3, reviews: 4, faq: 5, contact: 6,
      };
      const targetIndex = sectionMap[hash];
      if (targetIndex !== undefined && targetIndex > 0) {
        // Jump instantly then clear hash
        const sections = getSections();
        let jumpTo = 0;
        for (let i = 0; i < targetIndex && i < sections.length; i++) {
          jumpTo += sections[i].offsetHeight;
        }
        container.scrollTop = jumpTo;
        currentIndex.current = targetIndex;
        history.replaceState(null, "", window.location.pathname);
      }
    }

    return () => {
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      document.removeEventListener("keydown", handleKeyDown);
      delete (window as unknown as Record<string, unknown>).__scrollToSection;
    };
  }, [scrollToIndex, getContainer]);

  return null;
}
