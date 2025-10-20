'use client';

import { useEffect } from 'react';

export default function DevSwUnregister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    // Unregister any existing service workers on this origin (dev only)
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations?.().then((regs) => {
        regs.forEach((reg) => reg.unregister());
      });
    }
    // Clear caches to avoid stale chunk URLs
    if ('caches' in window) {
      caches.keys().then((keys) => keys.forEach((k) => caches.delete(k)));
    }
  }, []);
  return null;
}

