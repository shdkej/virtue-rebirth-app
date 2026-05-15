"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

const AppError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  useEffect(() => {
    // Surface stack/message to PostHog so $exception events are not null.
    posthog.captureException(error, {
      flow: "app-error-boundary",
      digest: error.digest ?? null,
    });
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 text-center">
      <p className="text-sm text-muted-foreground">앗, 잠깐 문제가 생겼어요.</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-xl border border-border px-4 py-2 text-xs text-muted-foreground hover:text-foreground"
      >
        다시 시도
      </button>
    </div>
  );
};

export default AppError;
