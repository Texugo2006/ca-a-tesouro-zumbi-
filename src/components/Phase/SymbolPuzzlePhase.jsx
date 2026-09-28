import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Sparkles, RotateCcw, Check, ShieldAlert } from 'lucide-react';

export default function SymbolPuzzlePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [currentSequence, setCurrentSequence] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const symbols = phase.symbols || [];
  const targetSequence = phase.targetSequence || [];
  const requiredCount = targetSequence.length;

  const handleSymbolClick = (symId) => {
    if (isSuccess) return;
    if (currentSequence.length >= requiredCount) return;

    const nextSeq = [...currentSequence, symId];
    setCurrentSequence(nextSeq);

    if (nextSeq.length === requiredCount) {
      // Check correctness
      const matches = nextSeq.every((id, idx) => id === targetSequence[idx]);
      if (matches) {
        setIsSuccess(true);
        setErrorMessage(null);
        setTimeout(() => {
          onComplete(phase.reward || 140, phase.clue);
        }, 1400);
      } else {
        loseLife();
        setErrorMessage("Sequência incorreta! Os mecanismos antigos se desalinharam.");
        setTimeout(() => {
          setCurrentSequence([]);
          setErrorMessage(null);
        }, 1300);
      }
    }
  };

  const handleReset = () => {
    if (isSuccess) return;
    setCurrentSequence([]);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-4 sm:p-6 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-3">
          <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest font-cinzel">
            Alinhamento Rúnico & Lógica
          </span>
          <h3 className="text-lg sm:text-xl font-cinzel font-black text-amber-200 mt-0.5">
            {phase.title}
          </h3>
          <p className="mt-1 text-xs text-amber-100/80 max-w-md mx-auto">
            {phase.description}
          </p>
        </div>

        {/* Sequence Slots Display */}
        <div className="flex items-center justify-center gap-2.5 mb-4">
          {Array.from({ length: requiredCount }).map((_, slotIdx) => {
            const symId = currentSequence[slotIdx];
            const symObj = symbols.find(s => s.id === symId);

            return (
              <div
                key={slotIdx}
                className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${
                  symObj
                    ? isSuccess
                      ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                      : 'bg-amber-950/80 border-amber-400 shadow-md'
                    : 'bg-slate-900/60 border-dashed border-amber-500/30 text-amber-500/40'
                }`}
              >
                {symObj ? (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="text-2xl sm:text-3xl"
                  >
                    {symObj.icon}
                  </motion.span>
                ) : (
                  <span className="text-xs font-cinzel font-bold">{slotIdx + 1}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Available Clickable Symbols */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-3">
          {symbols.map((sym) => {
            const isAlreadyIn = currentSequence.includes(sym.id);

            return (
              <motion.button
                key={sym.id}
                whileHover={!isAlreadyIn && !isSuccess ? { scale: 1.05, y: -2 } : {}}
                whileTap={!isAlreadyIn && !isSuccess ? { scale: 0.95 } : {}}
                onClick={() => handleSymbolClick(sym.id)}
                disabled={isAlreadyIn || isSuccess}
                className={`p-2.5 rounded-2xl border-2 flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  isAlreadyIn
                    ? 'bg-slate-900/40 border-slate-700 opacity-40 cursor-not-allowed'
                    : 'bg-slate-900/90 border-amber-500/40 hover:border-amber-400 hover:bg-slate-850'
                }`}
              >
                <span className="text-2xl sm:text-3xl">{sym.icon}</span>
                <span className="text-[11px] font-cinzel font-bold text-amber-200 truncate max-w-[90%]">
                  {sym.label}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Clear / Reset button */}
        {currentSequence.length > 0 && !isSuccess && (
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="text-xs text-amber-400/80 hover:text-amber-200 flex items-center gap-1 font-semibold py-1 px-3 rounded-lg hover:bg-slate-900 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Limpar Sequência
            </button>
          </div>
        )}

        {/* Feedback message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs text-center font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-4 p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Alinhamento perfeito! As runas liberaram a nova pista!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
