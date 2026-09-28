import React from 'react';
import { motion } from 'framer-motion';
import { maps } from '../../data/maps';
import { useGameStore } from '../../store/useGameStore';
import { Compass, ArrowRight, Lock, CheckCircle2, Trees, Landmark, Snowflake } from 'lucide-react';

export default function MapSelector({ onSelectMap, onBack, onEditCharacter }) {
  const { selectedMap, setSelectedMap, mapProgress } = useGameStore();

  const iconMap = {
    Compass: <Compass className="w-6 h-6 text-amber-400" />,
    Trees: <Trees className="w-6 h-6 text-emerald-400" />,
    Landmark: <Landmark className="w-6 h-6 text-orange-400" />,
    Snowflake: <Snowflake className="w-6 h-6 text-sky-300" />
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center select-none">
      {/* Header */}
      <div className="w-full flex items-center justify-between mb-8">
        <div className="text-center mx-auto">
        <span className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-widest">
          Territórios Misteriosos
        </span>
        <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-amber-200 mt-1">
          Escolha seu Mapa do Tesouro
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-amber-100/80 max-w-lg mx-auto">
          Cada mapa esconde enigmas únicos e mecânicas próprias. Conquiste todas as 7 fases para abrir o baú lendário de cada região.
        </p>
        </div>

        <div className="flex items-center gap-3">
          {onEditCharacter && (
            <button
              onClick={onEditCharacter}
              className="px-3 py-2 bg-slate-900/80 border border-amber-500/30 rounded-xl text-amber-200 text-sm font-bold"
            >
              Editar Personagem
            </button>
          )}
          {onBack && (
            <button
              onClick={onBack}
              className="px-3 py-2 bg-slate-900/60 border border-slate-700 rounded-xl text-amber-300 text-sm"
            >
              Voltar
            </button>
          )}
        </div>
      </div>

      {/* Grid of 4 Maps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mb-6">
        {maps.map((mapItem) => {
          const isSelected = selectedMap === mapItem.id;
          const prog = mapProgress[mapItem.id] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
          const unlockedCount = prog.completed ? 7 : Math.min(7, prog.maxPhaseUnlocked);

          return (
            <motion.div
              key={mapItem.id}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setSelectedMap(mapItem.id);
                if (onSelectMap) onSelectMap(mapItem.id);
              }}
              className={`rounded-3xl border-2 p-6 flex flex-col justify-between transition-all cursor-pointer relative overflow-hidden bg-gradient-to-br ${mapItem.visuals.bgGradient} ${
                isSelected
                  ? 'border-amber-400 shadow-[0_0_30px_rgba(244,197,66,0.4)] scale-101'
                  : 'border-amber-500/30 hover:border-amber-400/60 shadow-xl'
              }`}
            >
              {/* Background emblem stamp */}
              <div className="absolute right-3 bottom-3 text-7xl opacity-10 pointer-events-none">
                {mapItem.visuals.bannerIcon}
              </div>

              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-slate-950/60 border border-amber-500/30">
                      {iconMap[mapItem.icon] || <Compass className="w-6 h-6 text-amber-400" />}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-amber-300/80 font-cinzel">
                        {mapItem.difficulty}
                      </span>
                      <h3 className="text-xl sm:text-2xl font-cinzel font-black text-amber-200">
                        {mapItem.name}
                      </h3>
                    </div>
                  </div>

                  {prog.completed && (
                    <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-[10px] font-bold flex items-center gap-1 font-cinzel">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Concluído
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-amber-100/85 leading-relaxed mb-4">
                  {mapItem.description}
                </p>

                <p className="text-xs italic text-amber-300/70 border-l-2 border-amber-400/50 pl-2.5 py-0.5">
                  "{mapItem.flavor}"
                </p>
              </div>

              {/* Progress & Explore Button */}
              <div className="mt-6 pt-4 border-t border-amber-500/20 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-amber-300/70">
                    Progresso: {unlockedCount} / 7 Fases
                  </div>
                  <div className="w-28 sm:w-36 h-2 bg-slate-950/80 rounded-full overflow-hidden mt-1 border border-amber-500/20">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-yellow-300 transition-all duration-500"
                      style={{ width: `${(unlockedCount / 7) * 100}%` }}
                    />
                  </div>
                </div>

                <button
                  className={`px-4 py-2 rounded-xl font-cinzel font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer ${
                    isSelected ? 'gold-gradient-btn text-slate-950' : 'bg-slate-950/70 hover:bg-slate-900 text-amber-300 border border-amber-500/40'
                  }`}
                >
                  <span>Explorar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
