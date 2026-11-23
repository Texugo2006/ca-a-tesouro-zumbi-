import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Radio } from 'lucide-react';

/* ── Radio Frequency Tuning Phase ───────────────────────────────────
   Player tunes a military radio to the exact frequency using
   + / - buttons. The signal "noise" SVG reacts in real time.
   Miss = crackling static + life lost. Hit = clear transmission.
────────────────────────────────────────────────────────────────────── */

function StaticWaveform({ value, target, locked }) {
  const noise = Math.abs(value - target);
  const clarity = Math.max(0, 1 - noise / 20); // 0 = total static, 1 = clear

  // Generate waveform bars
  const bars = Array.from({ length: 28 }, (_, i) => {
    const base = Math.sin((i / 28) * Math.PI * 4) * 0.5 + 0.5;
    const staticNoise = (1 - clarity) * (Math.random() * 0.8 + 0.1);
    const clearSignal = clarity * (Math.sin((i / 28) * Math.PI * 6 + Date.now() * 0.002) * 0.4 + 0.6);
    return Math.min(1, base * 0.2 + staticNoise * 0.5 + clearSignal * 0.8);
  });

  return (
    <div className="relative w-full h-20 flex items-center gap-0.5 px-2 rounded-lg overflow-hidden"
      style={{ background: '#050f08', border: `1px solid ${locked ? '#10b981' : '#1a2a1a'}` }}
    >
      {/* Scan line */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(0deg, rgba(16,185,129,0.03) 0px, rgba(16,185,129,0.03) 2px, transparent 2px, transparent 4px)`
        }}
      />

      {bars.map((h, i) => (
        <div
          key={i}
          className="flex-1 rounded-sm transition-none"
          style={{
            height: `${h * 100}%`,
            background: locked
              ? `rgba(16,185,129,${0.4 + h * 0.6})`
              : clarity > 0.5
              ? `rgba(250,204,21,${0.3 + h * 0.5})`
              : `rgba(${Math.floor(239 * (1 - clarity) + 16 * clarity)},${Math.floor(68 * (1 - clarity) + 185 * clarity)},${Math.floor(68 * (1 - clarity) + 129 * clarity)},${0.3 + h * 0.4})`,
          }}
        />
      ))}

      {/* Frequency readout on bar */}
      {locked && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-emerald-300 font-mono font-black text-lg bg-black/60 px-3 py-1 rounded-lg tracking-widest">
            ▶ SINAL LIMPO ◀
          </span>
        </div>
      )}
    </div>
  );
}

// Live animated waveform (re-renders every 80ms for noise effect)
function LiveStaticWaveform({ value, target, locked }) {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (locked) return;
    const id = setInterval(() => setTick(t => t + 1), 80);
    return () => clearInterval(id);
  }, [locked]);
  return <StaticWaveform value={value} target={target} locked={locked} key={tick} />;
}

export default function FrequencyPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const targetFreq = phase.targetFreq || 88.5;
  const minFreq = phase.minFreq || 70.0;
  const maxFreq = phase.maxFreq || 120.0;
  const stepBig = 1.0;
  const stepSmall = 0.1;

  const [freq, setFreq] = useState(phase.startFreq || Math.round((minFreq + maxFreq) / 2 * 10) / 10);
  const [locked, setLocked] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [statusMsg, setStatusMsg] = useState(null);
  const [confirmed, setConfirmed] = useState(false);

  const tolerance = phase.tolerance || 0.15;
  const noise = Math.abs(freq - targetFreq);
  const isOnTarget = noise <= tolerance;

  // Signal strength label
  const signalLabel = noise <= tolerance ? 'SINAL PERFEITO' : noise < 1.5 ? 'SINAL FRACO' : noise < 6 ? 'ESTÁTICA PESADA' : 'RUÍDO TOTAL';
  const signalColor = noise <= tolerance ? '#10b981' : noise < 1.5 ? '#facc15' : noise < 6 ? '#f97316' : '#ef4444';

  const adjust = (delta) => {
    if (locked || confirmed) return;
    setFreq(prev => {
      const next = Math.round((prev + delta) * 10) / 10;
      return Math.max(minFreq, Math.min(maxFreq, next));
    });
  };

  const handleConfirm = () => {
    if (confirmed) return;
    sound.playClick?.();
    setAttempts(a => a + 1);
    if (isOnTarget) {
      setLocked(true);
      setConfirmed(true);
      sound.playCorrect?.();
      setStatusMsg({ type: 'success', text: `Frequência ${targetFreq.toFixed(1)} MHz travada. Transmissão recebida. Coordenadas de exfiltração confirmadas.` });
      setTimeout(() => onComplete(phase.reward || 150, phase.clue), 1800);
    } else {
      loseLife();
      sound.playError?.();
      const diff = freq - targetFreq;
      const hint = diff > 0 ? '↓ Diminua a frequência.' : '↑ Aumente a frequência.';
      setStatusMsg({ type: 'fail', text: `Frequência incorreta — ${hint} Sinal perdido. (-1 Vida)` });
      setTimeout(() => setStatusMsg(null), 2000);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none font-mono">

      {/* Header */}
      <div className="w-full bg-[#040a06] rounded-t-2xl border-2 border-b-0 border-emerald-600/50 p-4 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{ backgroundImage: 'linear-gradient(#10b981 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)', backgroundSize: '16px 16px' }}
        />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950/80 border border-emerald-600/40 rounded text-[10px] font-bold text-emerald-400 uppercase tracking-widest mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"/>
            RÁDIO TÁTICO DE CAMPO · CRIPTOGRAFADO
          </div>
          <h3 className="font-black text-emerald-100 text-lg uppercase tracking-wide">
            {phase.title || 'Sintonização do Canal de Exfiltração'}
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">{phase.description}</p>
        </div>
      </div>

      {/* Radio body */}
      <div className="w-full border-2 border-t-0 border-b-0 border-emerald-600/50 bg-[#070e09] p-5 space-y-4">

        {/* Frequency display */}
        <div className="rounded-xl border-2 border-emerald-900/80 bg-[#030805] p-4 flex flex-col items-center gap-1"
          style={{ boxShadow: isOnTarget ? '0 0 24px rgba(16,185,129,0.3)' : 'none' }}
        >
          <div className="text-[10px] font-bold uppercase tracking-widest" style={{ color: signalColor }}>
            {signalLabel}
          </div>
          <div
            className="font-black tabular-nums tracking-widest"
            style={{ fontSize: '3rem', color: signalColor, textShadow: `0 0 20px ${signalColor}` }}
          >
            {freq.toFixed(1)}
            <span className="text-xl ml-1 font-bold opacity-70">MHz</span>
          </div>
          <div className="text-[10px] text-zinc-600 tracking-widest">
            ALCANCE: {minFreq.toFixed(1)} – {maxFreq.toFixed(1)} MHz
          </div>
        </div>

        {/* Live waveform */}
        <LiveStaticWaveform value={freq} target={targetFreq} locked={locked} />

        {/* Frequency controls */}
        <div className="grid grid-cols-4 gap-2">
          <button onClick={() => adjust(-stepBig)}
            disabled={locked}
            className="py-3 rounded-lg text-sm font-black border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-700/60 transition-all active:scale-95 disabled:opacity-30"
          >― 1.0</button>
          <button onClick={() => adjust(-stepSmall)}
            disabled={locked}
            className="py-3 rounded-lg text-sm font-black border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-700/60 transition-all active:scale-95 disabled:opacity-30"
          >― 0.1</button>
          <button onClick={() => adjust(+stepSmall)}
            disabled={locked}
            className="py-3 rounded-lg text-sm font-black border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-700/60 transition-all active:scale-95 disabled:opacity-30"
          >+ 0.1</button>
          <button onClick={() => adjust(+stepBig)}
            disabled={locked}
            className="py-3 rounded-lg text-sm font-black border border-emerald-900/60 bg-emerald-950/30 text-emerald-300 hover:bg-emerald-900/40 hover:border-emerald-700/60 transition-all active:scale-95 disabled:opacity-30"
          >+ 1.0</button>
        </div>

        {/* Confirm button */}
        <button
          onClick={handleConfirm}
          disabled={confirmed}
          className={`w-full py-3.5 rounded-xl font-black uppercase tracking-widest text-sm transition-all active:scale-95 ${
            isOnTarget
              ? 'bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.5)]'
              : 'bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border-2 border-zinc-700/60'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {confirmed ? 'FREQUÊNCIA TRAVADA' : isOnTarget ? 'TRAVAR FREQUÊNCIA ← AGORA' : 'CONFIRMAR FREQUÊNCIA'}
        </button>

        {/* Signal hint bar */}
        <div className="flex items-center gap-2">
          <div className="text-[10px] text-zinc-600 flex-shrink-0">RUÍDO</div>
          <div className="flex-1 h-2 rounded-full bg-zinc-900 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-200"
              style={{
                width: `${Math.max(2, (1 - Math.min(noise, 15) / 15) * 100)}%`,
                background: `linear-gradient(90deg, #ef4444, #facc15, #10b981)`,
              }}
            />
          </div>
          <div className="text-[10px] text-zinc-600 flex-shrink-0">LIMPO</div>
        </div>
      </div>

      {/* GM Feedback */}
      <div className="w-full border-2 border-t-0 border-emerald-600/50 rounded-b-2xl bg-[#040a06] px-5 py-3 min-h-[56px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {statusMsg ? (
            <motion.p
              key="status"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`text-xs font-mono font-bold text-center leading-tight ${statusMsg.type === 'success' ? 'text-emerald-300' : 'text-red-400'}`}
            >
              {statusMsg.text}
            </motion.p>
          ) : (
            <motion.p key="idle" className="text-zinc-500 text-[11px] font-mono italic text-center">
              Sintonize com precisão. O Capitão da Extração aguarda na frequência exata — e ele não vai repetir a rota.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
