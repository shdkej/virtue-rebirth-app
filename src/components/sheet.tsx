"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";

interface IProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const Sheet = ({ open, onClose, children, title, className }: IProps) => {
  const [mounted, setMounted] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // focus the panel
    const id = requestAnimationFrame(() => {
      panelRef.current?.focus();
    });
    // prevent body scroll
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      cancelAnimationFrame(id);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  if (!mounted || !open) return null;

  const node = (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      <div
        ref={panelRef}
        tabIndex={-1}
        className={cn(
          "relative mx-auto w-full max-w-md rounded-t-3xl border border-border bg-card text-card-foreground shadow-2xl outline-none animate-sheet-up",
          "max-h-[90vh] overflow-y-auto",
          className,
        )}
      >
        <div className="sticky top-0 flex justify-center pt-2.5 pb-1">
          <span className="h-1.5 w-10 rounded-full bg-muted" aria-hidden />
        </div>
        {title ? (
          <h2 className="px-6 pt-1 pb-2 text-base font-semibold">{title}</h2>
        ) : null}
        {children}
      </div>
    </div>
  );

  return createPortal(node, document.body);
};
