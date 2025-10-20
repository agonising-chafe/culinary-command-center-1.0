"use client";

import { useEffect, useState } from "react";

export default function UpdateButton() {
  const [busy, setBusy] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;
    let mounted = true;
    const updateVisibility = async () => {
      try {
        const hasController = Boolean(navigator.serviceWorker.controller);
        const regs = await navigator.serviceWorker.getRegistrations();
        if (!mounted) return;
        setVisible(hasController || regs.length > 0);
      } catch {
        if (!mounted) return;
        setVisible(false);
      }
    };
    updateVisibility();
    const onController = () => updateVisibility();
    navigator.serviceWorker.addEventListener("controllerchange", onController);
    return () => {
      mounted = false;
      navigator.serviceWorker.removeEventListener("controllerchange", onController);
    };
  }, []);

  const refreshApp = async () => {
    if (busy) return;
    setBusy(true);
    try {
      // Try to update/activate SW if present
      if ("serviceWorker" in navigator) {
        const regs = await navigator.serviceWorker.getRegistrations();
        await Promise.all(regs.map((r) => r.update().catch(() => {})));
        for (const r of regs) {
          const sw = r.waiting || r.installing;
          if (sw) {
            try { sw.postMessage({ type: "SKIP_WAITING" }); } catch {}
          }
        }
      }
      // Clear caches to avoid stale chunk URLs
      if ("caches" in window) {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      }
    } finally {
      try { sessionStorage.setItem('ccc_refresh', '1'); } catch {}
      // Small delay to allow SW to take control
      setTimeout(() => window.location.reload(), 150);
    }
  };

  if (!visible) return null;

  return (
    <button
      onClick={refreshApp}
      disabled={busy}
      className="rounded-full border px-3 py-1 text-sm transition hover:bg-gray-50 disabled:opacity-60"
      title="Refresh and clear cached assets"
    >
      {busy ? "Refreshing…" : "Refresh"}
    </button>
  );
}
