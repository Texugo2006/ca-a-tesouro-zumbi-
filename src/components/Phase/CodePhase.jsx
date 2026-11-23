import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { KeyRound, ShieldAlert, CheckCircle2, ChevronUp, ChevronDown, Lock, Unlock, RotateCw } from 'lucide-react';
import { sound } from '../../services/soundEngine';

export default function CodePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const targetCode = String(phase.targetCode || '34').padStart(2, '0');
  const codeLength = targetCode.length;

  // Initialize tumblers with zeros
  const [dials, setDials] = useState(Array(codeLength).fill(0));
  const [isSuccess, setIsSuccess] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleDialChange = (index, delta) => {
    if (isSuccess || isUnlocking) return;
    sound.playClick();
    setDials(prev => {
      const next = [...prev];
      next[index] = (next[index] + delta + 10) % 10;
      return next;
    });
    setErrorMessage(null);
  };

  const handleTryUnlock = () => {
    if (isSuccess || isUnlocking) return;
    const currentCode = dials.join('');

    setIsUnlocking(true);
    sound.playClick();

    if (currentCode === targetCode) {
      setTimeout(() => {
        setIsSuccess(true);
        setIsUnlocking(false);
        sound.playCorrect();
        setTimeout(() => {
          onComplete(phase.reward || 150, phase.clue);
        }, 1600);
      }, 700);
    } else {
      setTimeout(() => {
        sound.playError();
        loseLife();
        setErrorMessage("As engrenagens travaram! A combinação de discos está desalinhada.");
        setIsUnlocking(false);
      }, 700);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      {/* Heavy Steel Bunker Vault Door Container */}
      <div className="w-full bg-[#0a110d] rounded-3xl p-5 sm:p-7 relative shadow-2xl border-4 border-emerald-500/60">
        
        {/* Metal Rivet Accents around Vault Perimeter */}
        <div className="absolute top-3 left-4 flex gap-2 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
        </div>
        <div className="absolute top-3 right-4 flex gap-2 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
        </div>
        <div className="absolute bottom-3 left-4 flex gap-2 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
        </div>
        <div className="absolute bottom-3 right-4 flex gap-2 opacity-70">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 border border-black shadow-inner" />
        </div>

        {/* Vault Header & Mystery Plaque */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-bold mb-1 shadow-md">
            <KeyRound className="w-3.5 h-3.5 text-emerald-400" /> TERMINAL DO ARSENAL BLINDADO · ACESSO NÍVEL 5
          </div>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-white mt-1">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-zinc-300 max-w-md mx-auto font-outfit">
            {phase.description}
          </p>
        </div>

        {/* The Central Brass Tumblers Assembly */}
        <div className="relative my-4 p-4 sm:p-5 rounded-2xl bg-gradient-to-b from-[#1E252F] via-[#12171E] to-[#0A0D12] border-2 border-amber-500/40 shadow-inner flex flex-col items-center">
          
          <div className="text-[10px] uppercase font-mono font-bold text-emerald-400 tracking-widest mb-3 flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-emerald-400" /> DISCOS DE COMBINAÇÃO DE TITÂNIO
          </div>

          {/* Tumbler Dials Container */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
            {dials.map((digit, idx) => (
              <div key={idx} className="flex flex-col items-center">
                {/* Dial Increment Arrow */}
                <button
                  onClick={() => handleDialChange(idx, 1)}
                  disabled={isSuccess || isUnlocking}
                  className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-sm"
                  title="Girar para cima"
                >
                  <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Heavy Titanium Tumbler Cylinder Display */}
                <div className="my-1.5 w-14 sm:w-16 h-20 sm:h-22 rounded-xl bg-gradient-to-b from-[#0f172a] via-[#334155] via-[#475569] via-[#1e293b] to-[#020617] p-[2px] shadow-2xl relative overflow-hidden border border-emerald-500/50">
                  <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center relative">
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-emerald-400/10 to-transparent pointer-events-none rounded-t-[9px]" />

                    <span className="text-xs text-zinc-500 font-mono font-bold">
                      {(digit - 1 + 10) % 10}
                    </span>

                    <motion.span
                      key={digit}
                      initial={{ y: -8, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.15 }}
                      className="font-mono text-3xl sm:text-4xl font-black text-emerald-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.7)] my-0.5"
                    >
                      {digit}
                    </motion.span>

                    <span className="text-xs text-zinc-500 font-mono font-bold">
                      {(digit + 1) % 10}
                    </span>

                    <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-[1px] bg-emerald-400/40 pointer-events-none" />
                  </div>
                </div>

                {/* Dial Decrement Arrow */}
                <button
                  onClick={() => handleDialChange(idx, -1)}
                  disabled={isSuccess || isUnlocking}
                  className="p-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-800 text-emerald-300 border border-emerald-500/40 transition-all cursor-pointer hover:scale-110 active:scale-95 shadow-sm"
                  title="Girar para baixo"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Central Rotating Wheel Lever Handle */}
          <div className="mt-2 flex flex-col items-center">
            <motion.button
              whileHover={!isSuccess && !isUnlocking ? { scale: 1.04 } : {}}
              whileTap={!isSuccess && !isUnlocking ? { scale: 0.96 } : {}}
              onClick={handleTryUnlock}
              disabled={isSuccess || isUnlocking}
              className={`py-3 px-6 rounded-2xl font-mono font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all shadow-xl cursor-pointer ${
                isSuccess
                  ? "bg-emerald-500 text-slate-950 border-2 border-emerald-300 shadow-[0_0_25px_#22c55e]"
                  : isUnlocking
                  ? "bg-amber-600 text-slate-950"
                  : "bg-emerald-950 hover:bg-emerald-600 hover:text-slate-950 text-emerald-300 border border-emerald-500/50"
              }`}
            >
              <motion.div
                animate={isUnlocking || isSuccess ? { rotate: 360 } : { rotate: 0 }}
                transition={{ duration: 0.6, repeat: isUnlocking ? Infinity : 0 }}
              >
                {isSuccess ? <Unlock className="w-5 h-5 text-slate-950" /> : <RotateCw className="w-5 h-5" />}
              </motion.div>
              <span>{isSuccess ? "ARSENAL DESBLOQUEADO!" : isUnlocking ? "TESTANDO COMBINAÇÃO..." : "EXECUTAR BYPASS DE ACESSO"}</span>
            </motion.button>
          </div>
        </div>

        {/* Error Feedback */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-3 p-3 bg-red-950/95 border-2 border-red-500 rounded-xl text-red-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-xl"
          >
            <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {/* Success Feedback */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3 p-3 bg-emerald-950 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-300 shrink-0" />
            <span>Travas pneumáticas liberadas! O arsenal tático foi aberto e a pista recolhida!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
