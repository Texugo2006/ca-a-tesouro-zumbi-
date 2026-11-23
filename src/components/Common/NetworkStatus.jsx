import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff } from 'lucide-react';

export default function NetworkStatus({ className = '' }) {
  const [isOnline, setIsOnline] = useState(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border transition-all ${
        isOnline
          ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-400'
          : 'bg-amber-950/90 border-amber-500/60 text-amber-300 animate-pulse'
      } ${className}`}
      title={isOnline ? 'Aplicação conectada (Online)' : 'Aplicação em modo Offline (PWA ativo)'}
    >
      {isOnline ? (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <Wifi className="w-3 h-3 text-emerald-400" />
          <span>Online</span>
        </>
      ) : (
        <>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <WifiOff className="w-3 h-3 text-amber-400" />
          <span>Offline</span>
        </>
      )}
    </div>
  );
}
