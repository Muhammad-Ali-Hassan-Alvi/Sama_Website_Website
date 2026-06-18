"use client";

import { useEffect, useRef } from "react";

export function CursorFollower() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const hoveringRef = useRef(false);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!finePointer || reduceMotion) return;

    document.body.classList.add("custom-cursor-active");

    const target = { x: -100, y: -100 };
    const dot = { x: -100, y: -100 };
    const ring = { x: -100, y: -100 };
    let frame = 0;
    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      dotRef.current?.classList.remove("opacity-0");
      ringRef.current?.classList.remove("opacity-0");
    };

    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      show();
    };

    const onOver = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      hoveringRef.current = Boolean(
        el?.closest("a, button, [role='button'], input, textarea, select, label"),
      );
    };

    const tick = () => {
      dot.x += (target.x - dot.x) * 0.55;
      dot.y += (target.y - dot.y) * 0.55;
      ring.x += (target.x - ring.x) * 0.16;
      ring.y += (target.y - ring.y) * 0.16;

      const scale = hoveringRef.current ? 1.55 : 1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }

      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    frame = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[9999] opacity-0"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[10000] opacity-0"
      />
    </>
  );
}
