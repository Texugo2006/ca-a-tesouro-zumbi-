import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Compass, Footprints, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function PathChoicePhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [selectedPath, setSelectedPath] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const paths = phase.paths || [];

  const handleChoosePath = (path) => {
    if (isSuccess) return;
    setSelectedPath(path.id);

    if (path.isCorrect) {
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        onComplete(phase.reward || 120, phase.clue);
      }, 1500);
    } else {
      loseLife();
      setErrorMessage(path.failMessage || "Caminho perigoso! Armadilha ativada.");
      setTimeout(() => {
        setSelectedPath(null);
        setErrorMessage(null);
      }, 1600);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      <div className="w-full parchment-dark p-5 sm:p-7 rounded-3xl shadow-2xl relative">
        <div className="text-center mb-6">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest font-cinzel">
            Encruzilhada de Caminhos
          </span>
          <h3 className="text-xl sm:text-3xl font-cinzel font-black text-amber-200 mt-1">
            {phase.title}
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-amber-100/80 max-w-xl mx-auto">
            {phase.description}
          </p>
        </div>

        {/* The 3 Paths cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paths.map((path, idx) => {
            const isSelected = selectedPath === path.id;

            let borderClass = "border-amber-500/30 hover:border-amber-400 bg-slate-900/80";
            if (isSelected) {
              borderClass = isSuccess
                ? "border-emerald-500 bg-emerald-950/80 shadow-[0_0_20px_rgba(16,185,129,0.5)]"
                : "border-red-500 bg-red-950/80 shadow-[0_0_20px_rgba(239,68,68,0.5)]";
            }

            const icons = ['🌳', '⛰️', '🌊'];

            return (
              <motion.button
                key={path.id}
                whileHover={!selectedPath ? { scale: 1.03, y: -4 } : {}}
                whileTap={!selectedPath ? { scale: 0.97 } : {}}
                onClick={() => handleChoosePath(path)}
                disabled={Boolean(selectedPath)}
                className={`p-5 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer relative overflow-hidden group ${borderClass}`}
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {icons[idx % icons.length]}
                </div>

                <h4 className="font-cinzel font-bold text-amber-300 text-base mb-2">
                  {path.title}
                </h4>

                <p className="text-xs text-amber-100/70 leading-relaxed">
                  {path.desc}
                </p>

                <div className="mt-4 pt-3 border-t border-amber-500/20 w-full flex items-center justify-center gap-1.5 text-xs font-bold text-amber-400">
                  <Footprints className="w-3.5 h-3.5" />
                  <span>Seguir por aqui</span>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Error or Success feedback message */}
        {errorMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-3.5 bg-red-950/80 border border-red-500 rounded-xl text-red-200 text-xs sm:text-sm text-center font-semibold flex items-center justify-center gap-2"
          >
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span>{errorMessage} (-1 Vida)</span>
          </motion.div>
        )}

        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 p-3.5 bg-emerald-950/80 border border-emerald-500 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-bold flex items-center justify-center gap-2 shadow-lg"
          >
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span>Caminho seguro percorrido com maestria! Pista desvendada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
