"use client";

import { useEffect } from "react";

export default function ClientErrorForwarder() {
  useEffect(() => {
    const postJSON = (body: unknown) => {
      try {
        const json = JSON.stringify(body);
        // Prefer sendBeacon (non-blocking); fall back to fetch
        if (!(navigator.sendBeacon && navigator.sendBeacon("/api/client-error", new Blob([json], { type: "application/json" })))) {
          void fetch("/api/client-error", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: json,
          });
        }
      } catch {
        // swallow
      }
    };

    const onError = (event: ErrorEvent) => {
      const payload = {
        kind: "error" as const,
        message: event.message || "Unknown error",
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        stack: (event.error instanceof Error ? event.error.stack : null) ?? null,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      };
      postJSON(payload);
    };

    const onRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const isErr = reason instanceof Error;
      const payload = {
        kind: "unhandledrejection" as const,
        message: isErr ? reason.message : String(reason),
        stack: isErr ? reason.stack ?? null : null,
        userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
      };
      postJSON(payload);
    };

    window.addEventListener("error", onError);
    window.addEventListener("unhandledrejection", onRejection);
    return () => {
      window.removeEventListener("error", onError);
      window.removeEventListener("unhandledrejection", onRejection);
    };
  }, []);

  return null;
}
