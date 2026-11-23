import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Crosshair, Check, Radio, AlertTriangle, Target, X } from 'lucide-react';
import { sound } from '../../services/soundEngine';

export default function CoordinatesPhase({ phase, onComplete }) {
  const { loseLife } = useGameStore();
  const [clickedCoord, setClickedCoord] = useState(null);
  const [hoveredCoord, setHoveredCoord] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [misses, setMisses] = useState([]);

  const gridSize = phase.gridSize || 6;
  const targetX = phase.targetCoord?.x || 3;
  const targetY = phase.targetCoord?.y || 4;

  const colLabels = ['A', 'B', 'C', 'D', 'E', 'F'];

  const handleTileClick = (col, row) => {
    if (isSuccess || clickedCoord) return;

    sound.playClick();
    setClickedCoord({ x: col, y: row });

    if (col === targetX && row === targetY) {
      setIsSuccess(true);
      if (sound.playGunshot) sound.playGunshot();
      setTimeout(() => {
        sound.playCorrect();
        onComplete(phase.reward || 100, phase.clue);
      }, 1500);
    } else {
      if (sound.playZombieGrowl) sound.playZombieGrowl();
      else sound.playError();
      loseLife();
      setMisses(prev => [...prev, `${col}_${row}`]);
      setTimeout(() => {
        setClickedCoord(null);
      }, 900);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center select-none">
      {/* Tactical Radar Terminal */}
      <div className="w-full bg-[#080d09] rounded-3xl p-4 sm:p-6 text-zinc-100 relative shadow-2xl overflow-hidden border-2 border-emerald-500/60 shadow-[0_0_40px_rgba(34,197,94,0.15)]">
        
        {/* Terminal Scanline & Header */}
        <div className="flex items-center justify-between border-b border-emerald-500/40 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/80 border border-emerald-500/60 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(34,197,94,0.4)]">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold tracking-widest text-emerald-400 uppercase block">
                RADAR TÁTICO MILITAR · SATÉLITE DE VARREDURA 04
              </span>
              <h3 className="text-base sm:text-lg font-cinzel font-black text-white leading-tight">
                {phase.title}
              </h3>
            </div>
          </div>

          {/* Aiming Reticle Status */}
          <div className="bg-black/80 text-emerald-300 px-3 py-1.5 rounded-xl font-mono text-xs font-bold border border-emerald-500/50 shadow-md flex items-center gap-1.5">
            <Crosshair className="w-4 h-4 text-emerald-400" />
            <span>MIRA: {hoveredCoord ? `${colLabels[hoveredCoord.x - 1]}-${hoveredCoord.y}` : '--'}</span>
          </div>
        </div>

        {/* Mission Briefing Banner */}
        <div className="mb-4 bg-black/80 border border-emerald-500/50 p-3 sm:p-3.5 rounded-2xl flex items-center gap-3 text-xs sm:text-sm text-zinc-100 shadow-lg">
          <Target className="w-6 h-6 text-amber-400 shrink-0" />
          <p className="leading-relaxed font-outfit">
            <strong className="font-mono font-bold text-amber-300 uppercase tracking-wide mr-1.5">ORDEM TÁTICA:</strong>
            <span className="text-zinc-200 font-medium">{phase.instructions || phase.description}</span>
          </p>
        </div>

        {/* Cyber-Military Radar Display (Green Phosphor Grid) */}
        <div className="relative w-full max-w-md mx-auto aspect-square bg-[#030805] rounded-2xl border-2 border-emerald-500/70 overflow-hidden shadow-[inset_0_0_35px_rgba(34,197,94,0.3)] flex flex-col p-1 sm:p-2">
          
          {/* Tactical Radar HUD Overlay */}
          <svg viewBox="0 0 300 300" className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
            {/* Concentric distance rings */}
            <circle cx="150" cy="150" r="135" fill="none" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="150" cy="150" r="95" fill="none" stroke="#22c55e" strokeWidth="1" />
            <circle cx="150" cy="150" r="50" fill="none" stroke="#22c55e" strokeWidth="1" strokeDasharray="3 3" />
            
            {/* Reticle axis lines */}
            <line x1="0" y1="150" x2="300" y2="150" stroke="#22c55e" strokeWidth="1" />
            <line x1="150" y1="0" x2="150" y2="300" stroke="#22c55e" strokeWidth="1" />

            {/* Radar Sweeper Beam Effect */}
            <polygon points="150,150 290,60 270,30" fill="#22c55e" opacity="0.15" />

            {/* Military Quarantine Sector Outlines */}
            <path d="M70,50 L110,60 L100,100 L60,90 Z" fill="#22c55e" opacity="0.12" stroke="#22c55e" strokeWidth="1" />
            <text x="75" y="75" fill="#22c55e" fontSize="7" fontFamily="monospace">ZONA VERMELHA</text>

            <path d="M190,180 L250,190 L240,240 L180,230 Z" fill="#ef4444" opacity="0.15" stroke="#ef4444" strokeWidth="1" />
            <text x="195" y="210" fill="#ef4444" fontSize="7" fontFamily="monospace">HORDA DETECTADA</text>
          </svg>

          {/* Top Longitude Ruler (A-F) */}
          <div className="grid grid-cols-6 pl-6 sm:pl-7 pr-1 mb-1 z-10 shrink-0">
            {colLabels.map((label) => (
              <div
                key={label}
                className="text-center font-mono font-bold text-emerald-300 text-xs sm:text-sm bg-[#061f10] rounded mx-0.5 border border-emerald-500/50 py-0.5 shadow-sm"
              >
                {label}
              </div>
            ))}
          </div>

          {/* Latitude Rows (1-6) + Grid Cells */}
          <div className="flex-1 flex flex-col justify-between z-10">
            {Array.from({ length: gridSize }).map((_, rIdx) => {
              const row = rIdx + 1;
              return (
                <div key={row} className="flex-1 flex items-center gap-1">
                  {/* Left Latitude Ruler Marker */}
                  <span className="w-5 sm:w-6 text-center font-mono font-bold text-emerald-300 text-xs sm:text-sm bg-[#061f10] rounded border border-emerald-500/50 py-0.5 shadow-sm shrink-0">
                    {row}
                  </span>

                  {/* Interactive Radar Grid Cells */}
                  <div className="grid grid-cols-6 gap-1 flex-1 h-full">
                    {Array.from({ length: gridSize }).map((_, cIdx) => {
                      const col = cIdx + 1;
                      const isTarget = col === targetX && row === targetY;
                      const isClicked = clickedCoord?.x === col && clickedCoord?.y === row;
                      const wasMissed = misses.includes(`${col}_${row}`);

                      return (
                        <motion.button
                          key={col}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onMouseEnter={() => setHoveredCoord({ x: col, y: row })}
                          onMouseLeave={() => setHoveredCoord(null)}
                          onClick={() => handleTileClick(col, row)}
                          disabled={isSuccess}
                          className={`relative h-full rounded-lg border transition-all cursor-pointer flex items-center justify-center overflow-hidden ${
                            isSuccess && isTarget
                              ? "bg-emerald-950 border-emerald-400 shadow-[0_0_20px_#22c55e]"
                              : wasMissed
                              ? "bg-red-950/50 border-red-600/70"
                              : "border-emerald-500/20 bg-emerald-950/20 hover:border-emerald-400 hover:bg-emerald-900/30"
                          }`}
                        >
                          {/* Crosshair guidelines on hover */}
                          {hoveredCoord?.x === col && hoveredCoord?.y === row && !isSuccess && (
                            <motion.div
                              layoutId="mapReticle"
                              className="absolute inset-0 border-2 border-emerald-400 rounded-lg flex items-center justify-center bg-emerald-500/15 pointer-events-none"
                            >
                              <div className="w-2.5 h-2.5 rounded-full border border-emerald-300" />
                            </motion.div>
                          )}

                          {/* Success: Locked Target Reticle with Ammunition Crate Icon */}
                          {isSuccess && isTarget ? (
                            <motion.div
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 400, damping: 15 }}
                              className="relative flex items-center justify-center w-full h-full text-emerald-300"
                            >
                              <Target className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_#22c55e]" />
                            </motion.div>
                          ) : isClicked && !isTarget ? (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: [0, 1.2, 1] }}
                              className="text-base text-red-400 flex items-center justify-center"
                            >
                              <X className="w-4 h-4 text-red-400" />
                            </motion.div>
                          ) : wasMissed ? (
                            <div className="w-2 h-2 rounded-full bg-red-500/80 shadow-[0_0_6px_#ef4444]" />
                          ) : null}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Success Banner */}
        {isSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-3.5 p-2.5 bg-emerald-950 border-2 border-emerald-400 rounded-xl text-emerald-200 text-xs sm:text-sm text-center font-mono font-bold flex items-center justify-center gap-2 shadow-2xl"
          >
            <Check className="w-4 h-4 text-emerald-400" />
            <span>Alvo travado no radar militar! Carga de suprimentos e munição recuperada antes do ataque da horda.</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
