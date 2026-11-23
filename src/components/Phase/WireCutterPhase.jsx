import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { sound } from '../../services/soundEngine';
import { Zap, Scissors, Bomb, Radio, CheckCircle2 } from 'lucide-react';

/* ── Wire Defusal Phase ──────────────────────────────────────────────
   Player must cut the CORRECT wire based on a tactical riddle.
   Wrong wire = life lost + electric shock feedback.
   Correct wire = clean snip + sector restored.
────────────────────────────────────────────────────────────────────── */

const WIRE_COLORS = [
  { id: 'red',    label: 'VERMELHO',  hex: '#ef4444', cut: '#450a0a', spark: '#fca5a5', glow: 'rgba(239,68,68,0.5)' },
  { id: 'blue',   label: 'AZUL',     hex: '#3b82f6', cut: '#1e3a5f', spark: '#93c5fd', glow: 'rgba(59,130,246,0.5)' },
  { id: 'yellow', label: 'AMARELO',  hex: '#facc15', cut: '#3a2a00', spark: '#fef08a', glow: 'rgba(250,204,21,0.5)' },
  { id: 'green',  label: 'VERDE',    hex: '#22c55e', cut: '#062a12', spark: '#86efac', glow: 'rgba(34,197,94,0.5)'  },
  { id: 'white',  label: 'BRANCO',   hex: '#e5e7eb', cut: '#1f2937', spark: '#f9fafb', glow: 'rgba(229,231,235,0.5)' },
  { id: 'purple', label: 'ROXO',     hex: '#a855f7', cut: '#2e1065', spark: '#d8b4fe', glow: 'rgba(168,85,247,0.5)' },
];

function WireSVG({ color, isCut, isShocked, onClick, disabled }) {
  const { hex, cut, spark, glow } = color;
  const [hover, setHover] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled || isCut}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      animate={isShocked ? { x: [-6, 6, -6, 6, -3, 3, 0] } : {}}
      transition={{ duration: 0.35 }}
      className="w-full relative flex items-center cursor-pointer group"
      style={{ height: '52px' }}
    >
      {/* Left terminal block */}
      <div className="w-8 h-10 rounded-r-sm flex-shrink-0 relative" style={{ background: '#1e1e2a', border: '2px solid #2a2a3a' }}>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: hex, boxShadow: hover ? `0 0 8px ${glow}` : 'none' }}/>
      </div>

      {/* Wire body */}
      <div className="flex-1 relative h-6 flex items-center mx-1">
        {isCut ? (
          <>
            {/* Left stub */}
            <div className="h-3 rounded-full" style={{ width: '38%', background: `linear-gradient(90deg, ${hex}, ${cut})` }}/>
            {/* Gap */}
            <div className="flex-1 flex items-center justify-center">
              {isShocked && (
                <motion.span
                  initial={{ scale: 0, opacity: 1 }}
                  animate={{ scale: [0, 1.5, 1], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center justify-center font-bold"
                  style={{ color: spark }}
                >
                  <Zap className="w-5 h-5 text-amber-300" />
                </motion.span>
              )}
            </div>
            {/* Right stub — frayed end */}
            <div className="h-3 rounded-full" style={{ width: '38%', background: `linear-gradient(90deg, ${cut}, ${hex})` }}/>
          </>
        ) : (
          <div
            className="w-full h-3 rounded-full transition-all duration-200"
            style={{
              background: `linear-gradient(90deg, ${hex}cc, ${hex}, ${hex}cc)`,
              boxShadow: hover && !disabled ? `0 0 12px ${glow}` : 'none',
              filter: disabled && !hover ? 'brightness(0.6)' : 'brightness(1)',
            }}
          />
        )}
      </div>

      {/* Right terminal block */}
      <div className="w-8 h-10 rounded-l-sm flex-shrink-0 relative" style={{ background: '#1e1e2a', border: '2px solid #2a2a3a' }}>
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full" style={{ background: hex }}/>
      </div>

      {/* Wire label */}
      {!isCut && (
        <div
          className="absolute right-10 top-1/2 -translate-y-1/2 text-[9px] font-bold font-mono tracking-widest px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"
          style={{ background: '#000000cc', color: hex, border: `1px solid ${hex}40` }}
        >
          {color.label}
        </div>
      )}

      {/* Scissors icon on hover */}
      {!isCut && !disabled && hover && (
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none z-20"
        >
          <Scissors className="w-5 h-5 text-zinc-200" />
        </motion.span>
      )}
    </motion.button>
  );
}

export default function WireCutterPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [cutWireId, setCutWireId] = useState(null);
  const [shockedWireId, setShockedWireId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [statusMsg, setStatusMsg] = useState(null);

  const wires = phase.wires || [];
  const correctWireId = phase.correctWire;

  const handleCut = (wire) => {
    if (cutWireId || isSuccess) return;
    sound.playClick?.();
    setCutWireId(wire.id);

    if (wire.id === correctWireId) {
      setIsSuccess(true);
      sound.playCorrect?.();
      setStatusMsg({ type: 'success', text: 'Circuito isolado. Detonador neutralizado. Setor restaurado.' });
      setTimeout(() => onComplete(phase.reward || 160, phase.clue), 1600);
    } else {
      setShockedWireId(wire.id);
      loseLife();
      sound.playError?.();
      setIsFail(true);
      setStatusMsg({ type: 'fail', text: `Fio errado. Descarga de ${wire.id === 'red' ? '220V' : '110V'} pelo chassis. Protocolo de emergência ainda ativo. (-1 Vida)` });
      setTimeout(() => {
        setCutWireId(null);
        setShockedWireId(null);
        setIsFail(false);
        setStatusMsg(null);
      }, 2000);
    }
  };

  const wireObjs = wires.map(wId => WIRE_COLORS.find(c => c.id === wId) || WIRE_COLORS[0]);

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none font-mono">

      {/* Header — explosive device banner */}
      <div className="w-full bg-[#0a0007] rounded-t-2xl border-2 border-b-0 border-red-800/60 p-4 relative overflow-hidden">
        {/* Danger stripe */}
        <div className="absolute top-0 left-0 right-0 h-1.5"
          style={{ background: 'repeating-linear-gradient(90deg, #ef4444 0px, #ef4444 16px, #facc15 16px, #facc15 32px)' }}
        />
        <div className="text-center mt-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/80 border border-red-700/50 rounded text-[10px] font-bold text-red-400 uppercase tracking-widest">
            <Bomb className="w-3.5 h-3.5 text-red-400 animate-pulse" />
            DISPOSITIVO EXPLOSIVO DETECTADO · DESARME IMEDIATO
            <Bomb className="w-3.5 h-3.5 text-red-400 animate-pulse" />
          </div>
          <h3 className="font-black text-red-100 text-lg uppercase tracking-wide mt-2">
            {phase.title || 'Neutralização do Detonador IED'}
          </h3>
          <p className="text-xs text-zinc-300 mt-1 font-sans leading-relaxed">
            {phase.description}
          </p>
        </div>
      </div>

      {/* Main bomb panel */}
      <div className="w-full border-2 border-t-0 border-b-0 border-red-800/60 bg-[#0d0008] p-5">

        {/* Riddle box */}
        <div className="rounded-lg border border-yellow-700/50 bg-yellow-950/30 p-3 mb-5">
          <div className="text-[9px] font-bold text-yellow-500 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-yellow-400" />
            <span>INTERCEPTAÇÃO DE SINAL — MANUAL DO ARTEFATO</span>
          </div>
          <p className="text-sm text-yellow-100 font-sans leading-relaxed">
            {phase.riddle || phase.description}
          </p>
        </div>

        {/* Wire panel */}
        <div className="rounded-xl border-2 border-zinc-700/50 bg-[#0a0a14] p-4 space-y-1 relative">
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest mb-3 flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
            PAINEL DE FIOS — SELECIONE PARA CORTAR
            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"/>
          </div>

          {wireObjs.map((wire) => (
            <WireSVG
              key={wire.id}
              color={wire}
              isCut={cutWireId === wire.id}
              isShocked={shockedWireId === wire.id}
              disabled={Boolean(cutWireId) || isSuccess}
              onClick={() => handleCut(wire)}
            />
          ))}

          {/* Success wire cut confetti overlay */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 rounded-xl bg-emerald-950/60 flex items-center justify-center z-30"
            >
              <div className="text-center flex flex-col items-center">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mb-1" />
                <p className="font-black text-emerald-300 text-base uppercase tracking-wider mt-1">DETONADOR INATIVO</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* GM Feedback */}
      <div className="w-full border-2 border-t-0 border-red-800/60 rounded-b-2xl bg-[#0a0007] px-5 py-3 min-h-[56px] flex items-center justify-center">
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
              Mãos firmes. Um fio errado e este quarteirão vira crateras. Leia o manual com cuidado.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
