import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Eye, Check, ShieldAlert } from 'lucide-react';

export default function DifferencePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedId, setSelectedId] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const options = phase.options || [];

  const handleSelect = (opt) => {
    if (isSuccess) return;
    setSelectedId(opt.id);

    if (opt.isCorrect) {
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        onComplete(phase.reward || 140, phase.clue);
      }, 1400);
    } else {
      loseLife();
      setErrorMessage("Esta relíquia é uma cópia ilusória! A pedra não continha o selo autêntico.");
      setTimeout(() => {
        setSelectedId(null);
        setErrorMessage(null);
      }, 1300);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-5">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-cinzel">
            Observação & Análise Visual
          </span>
          <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200 mt-1">
            {phase.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/90 leading-relaxed">
            {phase.description}
          </p>
        </div>

        {/* The Two Artifacts to Compare */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
          {options.map((opt, idx) => {
            const isSelected = selectedId === opt.id;

            let borderClass = "border-amber-500/30 hover:border-amber-400 bg-slate-900/80";
            if (isSelected) {
              borderClass = isSuccess
                ? "border-emerald-500 bg-emerald-950/90 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : "border-red-500 bg-red-950/90 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
            }

            return (
              <motion.button
                key={opt.id}
                whileHover={!selectedId ? { scale: 1.02, y: -3 } : {}}
                whileTap={!selectedId ? { scale: 0.98 } : {}}
                onClick={() => handleSelect(opt)}
                disabled={Boolean(selectedId)}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer relative ${borderClass}`}
              >
                <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-3xl mb-3">
                  {idx === 0 ? '🗿' : '🏺'}
                </div>

                <h4 className="font-cinzel font-bold text-amber-300 text-sm sm:text-base mb-2">
                  {opt.title}
                </h4>

                <p className="text-xs text-amber-100/80 leading-relaxed">
                  {opt.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-amber-500/20 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
                  <Eye className="w-3.5 h-3.5" />
                  <span>Escolher esta relíquia</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Error or Success feedback */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-3 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs text-center font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 p-3 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Olhar impecável! A relíquia autêntica ativou o selo!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
