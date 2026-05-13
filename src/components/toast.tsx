"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface IToast {
  id: number;
  msg: string;
}

type IListener = (toasts: IToast[]) => void;

// Module-scoped store.
let TOASTS: IToast[] = [];
const LISTENERS: Set<IListener> = new Set();
let NEXT_ID = 1;

const emit = () => {
  for (const l of LISTENERS) l(TOASTS);
};

const subscribe = (l: IListener) => {
  LISTENERS.add(l);
  return () => {
    LISTENERS.delete(l);
  };
};

const DURATION = 2400;

/**
 * Imperative API. Safe to call from event handlers; no React hook required.
 */
export const showToast = (msg: string) => {
  const id = NEXT_ID++;
  TOASTS = [...TOASTS, { id, msg }];
  emit();
  if (typeof window !== "undefined") {
    window.setTimeout(() => {
      TOASTS = TOASTS.filter((t) => t.id !== id);
      emit();
    }, DURATION);
  }
};

export const useToast = () => ({ show: showToast });

export const ToastViewport = () => {
  const [mounted, setMounted] = useState(false);
  const [toasts, setToasts] = useState<IToast[]>(TOASTS);

  useEffect(() => {
    setMounted(true);
    return subscribe(setToasts);
  }, []);

  if (!mounted) return null;
  if (toasts.length === 0) return null;

  const node = (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 z-[120] flex flex-col items-center gap-2 px-5"
      aria-live="polite"
      aria-atomic="true"
    >
      {toasts.map((t) => (
        <div
          key={t.id}
          className="animate-soft-fade pointer-events-auto w-full max-w-md rounded-2xl border border-border bg-card/95 px-4 py-3 text-center text-sm text-foreground shadow-lg backdrop-blur"
          role="status"
        >
          {t.msg}
        </div>
      ))}
    </div>
  );

  return createPortal(node, document.body);
};
