'use client';

import { useEffect, useState } from 'react';

export default function SWUpdatePrompt() {
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || process.env.NODE_ENV !== 'production') return;
    if (!('serviceWorker' in navigator)) return;

    let registration: ServiceWorkerRegistration | undefined;

    const onControllerChange = () => {
      window.location.reload();
    };

    const checkForUpdate = (reg: ServiceWorkerRegistration) => {
      if (!reg) return;
      if (reg.waiting) {
        setWaiting(reg.waiting);
        return;
      }
      reg.addEventListener('updatefound', () => {
        const installing = reg.installing;
        if (!installing) return;
        installing.addEventListener('statechange', () => {
          if (installing.state === 'installed' && navigator.serviceWorker.controller) {
            setWaiting(reg.waiting || installing);
          }
        });
      });
    };

    navigator.serviceWorker.ready
      .then((reg) => {
        registration = reg;
        checkForUpdate(reg);
      })
      .catch(() => {});

    navigator.serviceWorker.addEventListener('controllerchange', onControllerChange);

    return () => {
      navigator.serviceWorker.removeEventListener('controllerchange', onControllerChange);
    };
  }, []);

  if (!waiting) return null;

  const activateUpdate = () => {
    try {
      waiting.postMessage({ type: 'SKIP_WAITING' });
    } catch {}
    setTimeout(() => window.location.reload(), 150);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      right: 16,
      background: '#111827',
      color: 'white',
      padding: '12px 14px',
      borderRadius: 8,
      boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
      zIndex: 1000,
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      fontSize: 14,
    }}>
      <span>A new version is available.</span>
      <button
        onClick={activateUpdate}
        style={{
          background: '#10B981',
          color: '#052e2b',
          border: 'none',
          padding: '6px 10px',
          borderRadius: 6,
          cursor: 'pointer',
          fontWeight: 600,
        }}
      >Refresh</button>
    </div>
  );
}

