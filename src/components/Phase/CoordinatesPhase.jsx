import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Compass, Crosshair, Check, AlertTriangle } from 'lucide-react';

export default function CoordinatesPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [clickedCoord, setClickedCoord] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const gridSize = phase.gridSize || 6;
  const targetX = phase.targetCoord?.x || 3;
  const targetY = phase.targetCoord?.y || 4;

  const colLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleTileClick = (col, row) => {
    if (isSuccess) return;

    setClickedCoord({ x: col, y: row });
    setAttempts(a => a + 1);

    if (col === targetX && row === targetY) {
      setIsSuccess(true);
      setTimeout(() => {
        onComplete(phase.reward || 100, phase.clue);
      }, 1400);
    } else {
      loseLife();
      setTimeout(() => {
        setClickedCoord(null);
      }, 1000);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      <div className="w-full parchment-card p-5 sm:p-7 rounded-3xl text-slate-900 relative shadow-2xl overflow-hidden">
        {/* Background compass watermark */}
        <div className="absolute right-2 bottom-2 text-8xl opacity-10 pointer-events-none">
          🧭
        </div>

        <div className="flex items-center justify-between border-b-2 border-amber-900/20 pb-3 mb-4">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-amber-900 uppercase font-cinzel">
              Navegação de Alta Precisão
            </span>
            <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-950">
              {phase.title}
            </h3>
          </div>
          <Compass className="w-8 h-8 text-amber-800 animate-spin-slow" />
        </div>

        <p className="text-xs sm:text-sm text-amber-950 font-medium mb-5 bg-amber-100/60 p-3 rounded-xl border border-amber-900/20">
          📍 <strong className="font-bold">Missão:</strong> {phase.instructions}
        </p>

        {/* The Coordinate Grid */}
        <div className="flex flex-col items-center justify-center">
          {/* Column headers */}
          <div className="grid grid-cols-6 gap-2 w-full max-w-md mb-1 pl-6 sm:pl-8">
            {Array.from({ length: gridSize }).map((_, i) => (
              <div key={i} className="text-center font-cinzel font-black text-amber-900 text-xs sm:text-sm">
                {colLabels[i]} ({i + 1})
              </div>
            ))}
          </div>

          {/* Grid Rows */}
          <div className="w-full max-w-md space-y-2">
            {Array.from({ length: gridSize }).map((_, rIdx) => {
              const row = rIdx + 1;
              return (
                <div key={row} className="flex items-center gap-2">
                  <span className="w-4 sm:w-6 text-right font-cinzel font-black text-amber-900 text-xs sm:text-sm">
                    {row}
                  </span>

                  <div className="grid grid-cols-6 gap-2 flex-1">
                    {Array.from({ length: gridSize }).map((_, cIdx) => {
                      const col = cIdx + 1;
                      const isTarget = col === targetX && row === targetY;
                      const isClicked = clickedCoord?.x === col && clickedCoord?.y === row;

                      let cellBg = "bg-amber-100/80 hover:bg-amber-200/90 border-amber-900/40";
                      if (isClicked) {
                        cellBg = isTarget
                          ? "bg-emerald-500 border-emerald-700 text-white shadow-lg"
                          : "bg-red-500 border-red-700 text-white animate-shake";
                      } else if (isSuccess && isTarget) {
                        cellBg = "bg-emerald-500 border-emerald-700 text-white";
                      }

                      return (
                        <motion.button
                          key={col}
                          whileHover={{ scale: 1.08 }}
                          whileTap={{ scale: 0.92 }}
                          onClick={() => handleTileClick(col, row)}
                          disabled={isSuccess}
                          className={`aspect-square rounded-xl border-2 flex items-center justify-center transition-colors cursor-pointer shadow-sm relative ${cellBg}`}
                        >
                          {isSuccess && isTarget ? (
                            <motion.span
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="text-lg"
                            >
                              ⭐
                            </motion.span>
                          ) : isClicked && !isTarget ? (
                            <span className="text-sm">🌊</span>
                          ) : (
                            <Crosshair className="w-3.5 h-3.5 opacity-20 text-amber-950" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Coordinate feedback */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-5 p-3 bg-emerald-700 text-white text-xs sm:text-sm rounded-xl font-bold text-center flex items-center justify-center gap-2 shadow-lg"
          >
            <Check className="w-5 h-5" />
            <span>Coordenada correta localizada com sucesso! Luneta apontada!</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
