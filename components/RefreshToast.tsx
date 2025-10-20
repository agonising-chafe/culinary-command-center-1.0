'use client';

import { useEffect, useState } from 'react';

export default function RefreshToast() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const flag = sessionStorage.getItem('ccc_refresh');
    if (flag) {
      sessionStorage.removeItem('ccc_refresh');
      setShow(true);
      const t = setTimeout(() => setShow(false), 3000);
      return () => clearTimeout(t);
    }
  }, []);

  if (!show) return null;

  return (
    <div style={{
      position: 'fixed',
      bottom: 16,
      left: '50%',
      transform: 'translateX(-50%)',
      background: '#111827',
      color: 'white',
      padding: '10px 14px',
      borderRadius: 8,
      boxShadow: '0 6px 18px rgba(0,0,0,0.25)',
      zIndex: 1000,
      fontSize: 14,
    }}>
      App refreshed to the latest version.
    </div>
  );
}

