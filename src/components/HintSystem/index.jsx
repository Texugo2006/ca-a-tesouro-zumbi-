import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Lightbulb, Lock, Check } from 'lucide-react';

export default function HintSystem({ phase, mapId }) {
  const { hintsUsed, unlockHint, coins } = useGameStore();
  const [isOpen, setIsOpen] = useState(false);

  const phaseNumber = phase.phaseNumber || 1;
  const key = `${mapId}_${phaseNumber}`;
  const unlockedLevel = hintsUsed[key] || 0;
  const hints = phase.hints || [];

  const handleUnlockHint = (hintObj) => {
    if (hintObj.level <= unlockedLevel) return;
    const success = unlockHint(mapId, phaseNumber, hintObj.level, hintObj.cost);
    if (!success) {
      alert("Moedas insuficientes para desbloquear esta dica!");
    }
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 rounded-xl text-amber-300 font-cinzel text-xs font-bold flex items-center gap-1.5 backdrop-blur-md cursor-pointer transition-all shadow-md"
      >
        <Lightbulb className="w-4 h-4 text-amber-400" />
        <span>Dicas ({unlockedLevel}/{hints.length})</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="absolute right-0 bottom-full mb-2 w-72 sm:w-80 bg-slate-950 border-2 border-amber-500/70 rounded-2xl p-4 shadow-2xl z-40 text-amber-100 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-2 border-b border-amber-500/30 mb-3">
              <span className="font-cinzel font-bold text-xs text-amber-400 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4" /> Dicas da Fase
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-amber-400/60 hover:text-amber-200 text-xs font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-2.5">
              {hints.map((h) => {
                const isUnlocked = h.level <= unlockedLevel;
                const canAfford = coins >= h.cost;

                return (
                  <div
                    key={h.level}
                    className={`p-2.5 rounded-xl border text-xs transition-all ${
                      isUnlocked
                        ? 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                        : 'bg-slate-900/60 border-slate-700 text-slate-400'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold flex items-center gap-1">
                        {isUnlocked ? (
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <Lock className="w-3.5 h-3.5 text-amber-400/60" />
                        )}
                        Dica {h.level} {h.cost === 0 ? '(Grátis)' : `(${h.cost} 🪙)`}
                      </span>

                      {!isUnlocked && (
                        <button
                          onClick={() => handleUnlockHint(h)}
                          disabled={!canAfford}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold font-cinzel transition-all cursor-pointer ${
                            canAfford
                              ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          }`}
                        >
                          {h.cost === 0 ? 'Revelar' : 'Comprar'}
                        </button>
                      )}
                    </div>

                    <div className="text-[11px] leading-snug">
                      {isUnlocked ? (
                        <span className="text-amber-100 font-medium">{h.text}</span>
                      ) : (
                        <span className="italic text-slate-500">
                          {h.level === 1
                            ? 'Dica introdutória com orientação geral.'
                            : h.level === 2
                            ? 'Pista direta para eliminar possibilidades.'
                            : 'Passo a passo revelador da solução.'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
