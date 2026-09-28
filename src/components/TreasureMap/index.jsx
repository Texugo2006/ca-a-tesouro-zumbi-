import React from 'react';
import { motion } from 'framer-motion';
import { maps } from '../../data/maps';
import { phasesData } from '../../data/phases';
import { useGameStore } from '../../store/useGameStore';
import { Compass, Check, Lock, Sparkles, Play, ArrowLeft, Key } from 'lucide-react';

export default function TreasureMap({ onStartPhase, onBackToMapSelect }) {
  const { selectedMap, mapProgress, startPhase, setActiveScreen } = useGameStore();

  const currentMapData = maps.find(m => m.id === selectedMap) || maps[0];
  const phases = phasesData[selectedMap] || [];
  const progress = mapProgress[selectedMap] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };

  const maxUnlocked = progress.maxPhaseUnlocked || 1;
  const clues = progress.cluesCollected || [];

  // Determine current active playable phase
  const activePhaseNumber = progress.completed ? 7 : maxUnlocked;
  const activePhaseIndex = Math.min(phases.length - 1, activePhaseNumber - 1);

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-6 flex flex-col items-center select-none">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between mb-4">
        <button
          onClick={onBackToMapSelect}
          className="px-3 py-1.5 bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-amber-300 font-cinzel text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Escolher Outro Mapa
        </button>

        <div className="flex items-center gap-2">
          <span className="text-2xl">{currentMapData.visuals.bannerIcon}</span>
          <h2 className="text-xl sm:text-2xl font-cinzel font-black text-amber-300">
            {currentMapData.name}
          </h2>
        </div>

        <div className="text-xs font-cinzel font-bold text-amber-400 bg-slate-950/80 px-3 py-1.5 rounded-xl border border-amber-500/30">
          Progresso: {progress.completed ? '7/7 Concluído' : `${maxUnlocked}/7 Fases`}
        </div>
      </div>

      {/* Main Parchment Map View */}
      <div className="w-full parchment-card p-6 sm:p-8 rounded-3xl shadow-2xl border-4 border-amber-900/40 relative overflow-hidden">
        {/* Background compass rose watermark */}
        <div className="absolute right-4 top-4 text-9xl opacity-10 pointer-events-none">
          🧭
        </div>
        <div className="absolute left-4 bottom-4 text-9xl opacity-5 pointer-events-none">
          🗺️
        </div>

        <div className="text-center mb-8 relative z-10">
          <span className="text-xs font-cinzel font-bold text-amber-900 uppercase tracking-widest">
            {currentMapData.subtitle}
          </span>
          <h3 className="text-2xl sm:text-3xl font-cinzel font-black text-amber-950 mt-1">
            Carta de Expedição das 7 Fases
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-amber-900/80 max-w-md mx-auto">
            Siga a trilha pontilhada. Cada marco desvenda uma pista crucial para abrir o baú final.
          </p>
        </div>

        {/* 7 Phases Interactive Trail */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3 mb-8">
          {phases.map((phaseItem) => {
            const num = phaseItem.phaseNumber;
            const isCompleted = num < maxUnlocked || progress.completed;
            const isCurrent = num === maxUnlocked && !progress.completed;
            const isLocked = num > maxUnlocked && !progress.completed;
            const isFinal = num === 7;

            let cardStyle = "bg-amber-100/90 border-amber-900/40 text-amber-950 hover:bg-amber-200";
            if (isCompleted) {
              cardStyle = "bg-emerald-800/90 border-emerald-600 text-white shadow-md";
            } else if (isCurrent) {
              cardStyle = "bg-amber-500 border-amber-800 text-slate-950 shadow-[0_0_20px_rgba(244,197,66,0.8)] scale-105 font-bold";
            } else if (isLocked) {
              cardStyle = "bg-amber-950/30 border-amber-900/20 text-amber-900/40 cursor-not-allowed opacity-60";
            }

            return (
              <motion.button
                key={phaseItem.id}
                whileHover={!isLocked ? { scale: 1.05, y: -4 } : {}}
                whileTap={!isLocked ? { scale: 0.95 } : {}}
                onClick={() => {
                  if (!isLocked) {
                    startPhase(num - 1);
                    if (onStartPhase) onStartPhase(num - 1);
                  }
                }}
                disabled={isLocked}
                className={`p-4 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer relative ${cardStyle}`}
              >
                {/* Phase Number Badge */}
                <div className="flex items-center justify-between w-full mb-2">
                  <span className="text-[10px] uppercase font-cinzel font-black">
                    {isFinal ? '🏆 FASE 7' : `FASE ${num}`}
                  </span>
                  {isCompleted && <Check className="w-3.5 h-3.5 text-emerald-300 stroke-[3]" />}
                  {isCurrent && <Sparkles className="w-3.5 h-3.5 text-slate-950 animate-spin-slow" />}
                  {isLocked && <Lock className="w-3.5 h-3.5 text-amber-900/50" />}
                </div>

                {/* Phase Icon */}
                <div className="text-3xl sm:text-4xl my-2 drop-shadow-sm">
                  {isFinal ? '👑' : phaseItem.type === 'coordinates' ? '🧭' : phaseItem.type === 'question' ? '📜' : phaseItem.type === 'find_object' ? '🔍' : phaseItem.type === 'path_choice' ? '🌲' : phaseItem.type === 'code' ? '🔢' : phaseItem.type === 'memory' ? '🃏' : phaseItem.type === 'difference' ? '🗿' : '✨'}
                </div>

                <div className="font-cinzel text-xs font-black truncate max-w-full mt-1">
                  {phaseItem.title}
                </div>

                <span className="text-[9px] uppercase tracking-wider mt-1 opacity-80 font-bold">
                  {isCompleted ? '✓ Concluída' : isCurrent ? '▶ Desbravar' : 'Bloqueada'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Big Action CTA: Desbravar Fase Atual */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-amber-950/20 rounded-2xl border border-amber-900/30">
          <div className="text-left">
            <div className="text-[11px] uppercase font-cinzel font-bold text-amber-900">
              Próximo Destino da Viagem
            </div>
            <h4 className="text-lg font-cinzel font-black text-amber-950">
              Fase {activePhaseNumber}: {phases[activePhaseIndex]?.title || 'Abertura do Baú'}
            </h4>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              startPhase(activePhaseIndex);
              if (onStartPhase) onStartPhase(activePhaseIndex);
            }}
            className="w-full sm:w-auto px-8 py-3.5 gold-gradient-btn rounded-xl font-cinzel font-black text-sm flex items-center justify-center gap-2 cursor-pointer shadow-xl"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>DESBRAVAR FASE {activePhaseNumber}</span>
          </motion.button>
        </div>

        {/* Collected Clues Scroll at bottom */}
        <div className="mt-6 pt-5 border-t-2 border-amber-900/20">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-amber-950 font-cinzel font-black text-sm">
              <Key className="w-4 h-4 text-amber-800" />
              <span>Pergaminho de Evidências ({clues.length}/5 Pistas)</span>
            </div>
            <span className="text-xs text-amber-900/70 italic">
              Serão usadas na Fase 7 para abrir o baú
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2.5">
            {phases.slice(0, 5).map((p, idx) => {
              const clueFound = clues.find(c => c.id === p.clue?.id) || clues[idx];

              return (
                <div
                  key={idx}
                  className={`p-2.5 rounded-xl border text-xs flex items-center gap-2.5 ${
                    clueFound
                      ? 'bg-amber-950/80 border-amber-500 text-amber-200 shadow-sm'
                      : 'bg-amber-100/60 border-dashed border-amber-900/30 text-amber-900/50'
                  }`}
                >
                  <span className="text-2xl">{clueFound ? clueFound.icon : '❓'}</span>
                  <div>
                    <div className="text-[9px] uppercase font-bold tracking-wider">
                      {clueFound ? (clueFound.title || 'Pista') : `Pista Fase ${idx + 1}`}
                    </div>
                    <div className="font-cinzel font-black text-sm truncate">
                      {clueFound ? clueFound.value : 'Ainda Oculta'}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
