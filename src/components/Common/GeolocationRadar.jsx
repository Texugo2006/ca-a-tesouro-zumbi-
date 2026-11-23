import React, { useState, useEffect } from 'react';
import { Navigation, MapPin, Radio, Check, AlertCircle } from 'lucide-react';

export default function GeolocationRadar({ onLocationDetected }) {
  const [coords, setCoords] = useState(null);
  const [status, setStatus] = useState('idle'); // 'idle' | 'tracking' | 'success' | 'error'
  const [errorMsg, setErrorMsg] = useState(null);

  const requestPosition = () => {
    if (!('geolocation' in navigator)) {
      setStatus('error');
      setErrorMsg('Geolocalização não suportada neste navegador.');
      return;
    }

    setStatus('tracking');
    setErrorMsg(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const data = {
          lat: pos.coords.latitude.toFixed(4),
          lng: pos.coords.longitude.toFixed(4),
          accuracy: Math.round(pos.coords.accuracy),
          timestamp: new Date().toLocaleTimeString('pt-BR'),
        };
        setCoords(data);
        setStatus('success');
        if (onLocationDetected) onLocationDetected(data);
      },
      (err) => {
        setStatus('error');
        if (err.code === 1) {
          setErrorMsg('Acesso ao GPS recusado pelo usuário.');
        } else {
          setErrorMsg('Sinal de satélite fraco no setor.');
        }
      },
      { enableHighAccuracy: true, timeout: 8000, maximumAge: 60000 }
    );
  };

  useEffect(() => {
    // Tenta obter posição silenciosamente se já permitido
    if ('permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((res) => {
        if (res.state === 'granted') {
          requestPosition();
        }
      }).catch(() => {});
    }
  }, []);

  return (
    <div
      role="region"
      aria-label="Radar de Geolocalização Tática"
      className="p-3 rounded-xl bg-[#09100a] border border-emerald-500/40 shadow-md text-xs font-mono"
    >
      <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Navigation className={`w-3.5 h-3.5 ${status === 'tracking' ? 'animate-spin text-amber-400' : 'text-emerald-400'}`} />
          <span className="text-[11px] uppercase tracking-wider">Geolocalização do Operador</span>
        </div>

        <button
          onClick={requestPosition}
          disabled={status === 'tracking'}
          aria-label="Sincronizar coordenadas de geolocalização do GPS"
          className="px-2.5 py-1 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-500/50 text-emerald-300 font-mono text-[10px] font-bold flex items-center gap-1 cursor-pointer transition-colors active:scale-95 disabled:opacity-50"
        >
          <Radio className="w-3 h-3 text-emerald-400" />
          <span>{status === 'tracking' ? 'Buscando GPS...' : status === 'success' ? 'Atualizar GPS' : 'Sincronizar GPS'}</span>
        </button>
      </div>

      {status === 'success' && coords && (
        <div className="p-2 rounded bg-black/60 border border-emerald-500/30 text-zinc-300 space-y-1">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <Check className="w-3 h-3 text-emerald-400" />
              <span>Sinal Travado:</span>
            </span>
            <span className="text-amber-300 font-bold">
              {coords.lat}°, {coords.lng}°
            </span>
          </div>
          <div className="flex items-center justify-between text-[10px] text-zinc-400">
            <span>Precisão do Raio: ±{coords.accuracy}m</span>
            <span>Última Sincronia: {coords.timestamp}</span>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-2 rounded bg-red-950/40 border border-red-500/30 text-[10px] text-red-300 flex items-center gap-1.5">
          <AlertCircle className="w-3 h-3 text-red-400 shrink-0" />
          <span>{errorMsg || 'GPS offline. Usando triangulação estimada da estação base.'}</span>
        </div>
      )}

      {status === 'idle' && (
        <p className="text-[10px] text-zinc-400 italic">
          Clique em "Sincronizar GPS" para integrar suas coordenadas físicas ao mapa de expedição.
        </p>
      )}
    </div>
  );
}
