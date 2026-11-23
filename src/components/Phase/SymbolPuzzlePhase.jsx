import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { RotateCcw, Check, ShieldAlert, Zap } from 'lucide-react';
import { sound } from '../../services/soundEngine';
import TacticalIcon from '../Common/TacticalIcon';

// Dedicated Vector SVG Artifacts for High-Tech Defense & Reactor Relays
const defenseRelaySVGs = {
  emp: (
    <svg viewBox="0 0 60 60" className="w-full h-full p-1 drop-shadow-md">
      <circle cx="30" cy="30" r="26" fill="#082f49" stroke="#38bdf8" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="20" fill="none" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3 3" />
      <polygon points="32,8 18,32 30,32 26,52 44,26 31,26" fill="#facc15" stroke="#f59e0b" strokeWidth="1.2" />
      <circle cx="30" cy="30" r="3" fill="#ffffff" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 60 60" className="w-full h-full p-1 drop-shadow-md">
      <circle cx="30" cy="30" r="26" fill="#052e16" stroke="#4ade80" strokeWidth="2.5" />
      <polygon points="30,12 46,20 46,40 30,48 14,40 14,20" fill="#064e3b" stroke="#4ade80" strokeWidth="2.5" />
      <polygon points="30,18 40,24 40,36 30,42 20,36 20,24" fill="none" stroke="#86efac" strokeWidth="1" />
      <circle cx="30" cy="30" r="4" fill="#fef08a" />
    </svg>
  ),
  purge: (
    <svg viewBox="0 0 60 60" className="w-full h-full p-1 drop-shadow-md">
      <circle cx="30" cy="30" r="26" fill="#451a03" stroke="#f59e0b" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="16" fill="#78350f" stroke="#fbbf24" strokeWidth="2" />
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <line
          key={i}
          x1="30"
          y1="30"
          x2={30 + Math.sin(angle * Math.PI / 180) * 22}
          y2={30 - Math.cos(angle * Math.PI / 180) * 22}
          stroke="#f59e0b"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
      ))}
      <circle cx="30" cy="30" r="5" fill="#fef08a" />
    </svg>
  ),
  radar: (
    <svg viewBox="0 0 60 60" className="w-full h-full p-1 drop-shadow-md">
      <circle cx="30" cy="30" r="26" fill="#1e1b4b" stroke="#a855f7" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="18" fill="none" stroke="#c084fc" strokeWidth="1.2" />
      <circle cx="30" cy="30" r="10" fill="none" stroke="#c084fc" strokeWidth="1.2" />
      <line x1="30" y1="6" x2="30" y2="54" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
      <line x1="6" y1="30" x2="54" y2="30" stroke="#c084fc" strokeWidth="1" opacity="0.6" />
      <polygon points="30,30 46,14 44,12" fill="#e879f9" opacity="0.8" />
      <circle cx="42" cy="22" r="3" fill="#ef4444" />
      <circle cx="30" cy="30" r="3" fill="#a855f7" />
    </svg>
  )
};

export default function SymbolPuzzlePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [currentSequence, setCurrentSequence] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // Tactical Defense Relays (Dead Ahead Zombie Theme)
  const defaultRelays = [
    { id: "emp", label: "Capacitor EMP", codename: "PULSO 01", icon: "Zap" },
    { id: "shield", label: "Barreira Iônica", codename: "ESCUDO 02", icon: "Shield" },
    { id: "purge", label: "Válvula de Purga", codename: "PURGA 03", icon: "AlertTriangle" },
    { id: "radar", label: "Sensor Sísmico", codename: "RADAR 04", icon: "Radio" }
  ];

  const symbols = phase.symbols || defaultRelays;
  const correctSequence = phase.targetSequence || ["emp", "shield", "purge", "radar"];
  const requiredCount = correctSequence.length;

  const handleSymbolClick = (symbolId) => {
    if (isSuccess || currentSequence.includes(symbolId) || currentSequence.length >= requiredCount) {
      return;
    }

    sound.playClick();
    const nextSeq = [...currentSequence, symbolId];
    setCurrentSequence(nextSeq);
    setErrorMessage(null);

    // If all sockets are populated, check calibration
    if (nextSeq.length === requiredCount) {
      const isMatch = nextSeq.every((val, idx) => val === correctSequence[idx]);

      if (isMatch) {
        if (sound.playCyberHacking) sound.playCyberHacking();
        setIsSuccess(true);
        setErrorMessage(null);
        setTimeout(() => {
          sound.playCorrect();
          onComplete(phase.reward || 140, phase.clue);
        }, 1500);
      } else {
        if (sound.playAlarm) sound.playAlarm();
        else sound.playError();
        loseLife();
        setErrorMessage("SOBRECARGA NO CIRCUITO: A ordem dos relés de defesa está incorreta!");
        setTimeout(() => {
          setCurrentSequence([]);
          setErrorMessage(null);
        }, 1400);
      }
    }
  };

  const handleReset = () => {
    if (isSuccess) return;
    sound.playClick();
    setCurrentSequence([]);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      {/* Reactor Console Container */}
      <div className="w-full bg-[#0a110d] p-4 sm:p-6 rounded-3xl shadow-2xl relative border-2 border-emerald-500/50">
        
        {/* Header */}
        <div className="text-center mb-3">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold mb-1 shadow-md">
            <Zap className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>PAINEL DO REATOR NUCLEAR · REDE DEFENSIVA DE QUARENTENA</span>
          </div>
          <h3 className="text-lg sm:text-xl font-cinzel font-black text-white">
            {phase.title || "Calibração dos Relés de Defesa da Base"}
          </h3>
          <p className="mt-1 text-xs text-zinc-300 max-w-md mx-auto font-outfit">
            {phase.description || "Encaixe os 4 relés de energia na ordem tática correta para armar a barreira elétrica antes da invasão da horda."}
          </p>
        </div>

        {/* Central High-Voltage Reactor Core with Sockets */}
        <div className="relative my-3 p-4 rounded-2xl bg-gradient-to-b from-[#0c1510] via-[#050b07] to-[#020503] border border-emerald-500/40 flex flex-col items-center shadow-inner">
          
          {/* Rotating Reactor Core Graphic */}
          <div className="relative w-48 sm:w-56 h-48 sm:h-56 flex items-center justify-center my-2">
            <motion.div
              animate={isSuccess ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none"
            >
              <svg viewBox="0 0 200 200" className="w-full h-full opacity-35">
                <circle cx="100" cy="100" r="86" fill="none" stroke="#22c55e" strokeWidth="4" strokeDasharray="8 6" />
                <circle cx="100" cy="100" r="62" fill="none" stroke="#38bdf8" strokeWidth="2" />
                <circle cx="100" cy="100" r="28" fill="#064e3b" stroke="#4ade80" strokeWidth="3" />
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
                  <line
                    key={i}
                    x1="100"
                    y1="100"
                    x2="100"
                    y2="14"
                    stroke="#22c55e"
                    strokeWidth="2"
                    transform={`rotate(${angle} 100 100)`}
                  />
                ))}
              </svg>
            </motion.div>

            {/* 4 Interactive Sockets arranged clearly */}
            <div className="grid grid-cols-4 gap-2.5 z-10">
              {Array.from({ length: requiredCount }).map((_, slotIdx) => {
                const symId = currentSequence[slotIdx];
                const symObj = symbols.find(s => s.id === symId);
                const artwork = symObj ? defenseRelaySVGs[symObj.id] || <div className="w-8 h-8 flex items-center justify-center"><TacticalIcon icon={symObj.icon} className="w-7 h-7" /></div> : null;

                return (
                  <div
                    key={slotIdx}
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex flex-col items-center justify-center transition-all relative ${
                      symObj
                        ? isSuccess
                          ? 'bg-emerald-950 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.8)] scale-105'
                          : 'bg-slate-900 border-cyan-400 shadow-md scale-105'
                        : 'bg-black/70 border-dashed border-emerald-500/40 text-emerald-400/50'
                    }`}
                  >
                    {symObj ? (
                      <motion.div
                        initial={{ scale: 0, rotate: -30 }}
                        animate={{ scale: 1, rotate: 0 }}
                        className="w-full h-full flex items-center justify-center p-1"
                      >
                        {artwork}
                      </motion.div>
                    ) : (
                      <span className="text-xs font-mono font-black opacity-60">
                        {`SLOT ${slotIdx + 1}`}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <span className="text-[11px] font-mono font-bold text-emerald-300 mt-1">
            CONECTE OS 4 MÓDULOS DE SOBREVIVÊNCIA NA ORDEM DE PURGA
          </span>
        </div>

        {/* Clickable Defense Relays Tokens */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-2">
          {symbols.map((sym) => {
            const isAlreadyIn = currentSequence.includes(sym.id);
            const artwork = defenseRelaySVGs[sym.id] || <div className="w-8 h-8 flex items-center justify-center"><TacticalIcon icon={sym.icon} className="w-7 h-7" /></div>;

            return (
              <motion.button
                key={sym.id}
                whileHover={!isAlreadyIn && !isSuccess ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isAlreadyIn && !isSuccess ? { scale: 0.95 } : {}}
                onClick={() => handleSymbolClick(sym.id)}
                disabled={isAlreadyIn || isSuccess}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                  isAlreadyIn
                    ? 'bg-black/50 border-zinc-800 opacity-30 cursor-not-allowed scale-95'
                    : 'bg-[#101b14] border-emerald-500/50 hover:border-emerald-300 hover:bg-[#16271c] shadow-lg'
                }`}
              >
                <div className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center">
                  {artwork}
                </div>
                <div className="text-center">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 block leading-none">
                    {sym.codename || "MÓDULO"}
                  </span>
                  <span className="text-[11px] font-cinzel font-bold text-white truncate max-w-[95%] block mt-0.5">
                    {sym.label}
                  </span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Clear sequence action */}
        {currentSequence.length > 0 && !isSuccess && (
          <div className="flex justify-center mt-2">
            <button
              onClick={handleReset}
              className="text-xs text-amber-300 hover:text-amber-100 flex items-center gap-1.5 font-mono font-bold py-1 px-3 rounded-lg bg-black/60 border border-amber-500/30 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> REINICIAR ALINHAMENTO
            </button>
          </div>
        )}

        {/* Feedback messages */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-2.5 bg-red-950/95 border-2 border-red-500 rounded-xl text-red-200 text-xs text-center font-bold flex items-center justify-center gap-2 shadow-xl"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-2.5 bg-emerald-950 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Reator calibrado com sucesso! A barreira de íons foi ativada e a horda foi repelida!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
