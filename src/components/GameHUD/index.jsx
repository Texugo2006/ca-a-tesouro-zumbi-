import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { maps } from '../../data/maps';
import { Volume2, VolumeX, Music, HelpCircle, Pause, Map, Compass, Sparkles, Key, Heart, Coins, Star, ScrollText, Lightbulb, X, ShieldCheck } from 'lucide-react';
import TacticalIcon from '../Common/TacticalIcon';
import InventoryModal from '../Inventory/InventoryModal';
import NetworkStatus from '../Common/NetworkStatus';

export default function GameHUD({ showMapReturn = true, currentPhaseNumber = null }) {
  const {
    lives,
    infiniteLives,
    toggleInfiniteLives,
    coins,
    score,
    selectedMap,
    mapProgress,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    setIsPaused,
    setShowHowToPlay,
    setActiveScreen
  } = useGameStore();

  const [showCluesDrawer, setShowCluesDrawer] = useState(false);

  const currentMapData = maps.find(m => m.id === selectedMap) || maps[0];
  const progress = mapProgress[selectedMap] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
  const clues = progress.cluesCollected || [];

  return (
    <>
      {/* Top HUD Bar */}
      <header className="w-full max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-2 z-30 relative select-none">
        {/* Left: Map & Phase Info */}
        <div className="flex items-center gap-2 sm:gap-3">
          {showMapReturn && (
            <motion.button
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.94 }}
              onClick={() => setActiveScreen('map_overview')}
              className="px-2.5 py-1.5 sm:px-3 sm:py-2 bg-slate-900/80 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-amber-300 font-cinzel text-xs sm:text-sm font-bold flex items-center gap-1.5 backdrop-blur-md shadow-lg transition-colors cursor-pointer"
              title="Voltar para o Mapa"
            >
              <Map className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Mapa</span>
            </motion.button>
          )}

          <div className="bg-slate-950/70 border border-amber-500/30 rounded-xl px-3 py-1.5 backdrop-blur-md flex items-center gap-2">
            <TacticalIcon icon={currentMapData.visuals.bannerIcon} className="w-5 h-5 text-amber-400" />
            <div className="flex flex-col">
              <span className="text-xs sm:text-sm font-cinzel font-bold text-amber-300 truncate max-w-[120px] sm:max-w-none">
                {currentMapData.name}
              </span>
              {currentPhaseNumber && (
                <span className="text-[10px] text-amber-200/70 font-semibold">
                  Fase {currentPhaseNumber} de 7
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Center: Hearts & Coins */}
        <div className="flex items-center gap-2 sm:gap-4 bg-slate-950/80 border border-amber-500/40 rounded-2xl px-3 py-1.5 backdrop-blur-md shadow-xl">
          {/* Vidas / Hearts (ou Modo Infinito) */}
          <button
            onClick={toggleInfiniteLives}
            className="flex items-center gap-1.5 cursor-pointer p-0.5 rounded-lg hover:bg-white/5 transition-colors"
            title={infiniteLives ? "Modo Imortal Ativo (Clique para vidas normais)" : "Clique para ativar Modo Vidas Infinitas"}
          >
            {infiniteLives ? (
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-400 text-emerald-300 font-mono text-xs font-black shadow-[0_0_12px_rgba(16,185,129,0.5)]">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>VIDA ∞</span>
              </span>
            ) : (
              [1, 2, 3].map((heartIndex) => {
                const isAlive = heartIndex <= lives;
                return (
                  <motion.span
                    key={heartIndex}
                    animate={isAlive ? { scale: [1, 1.15, 1] } : { scale: 0.85, filter: 'grayscale(100%)' }}
                    transition={isAlive ? { duration: 1.8, repeat: Infinity, delay: heartIndex * 0.2 } : {}}
                    className={`inline-flex items-center justify-center transition-all ${isAlive ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' : 'opacity-30'}`}
                  >
                    <Heart className={`w-5 h-5 sm:w-6 sm:h-6 ${isAlive ? 'fill-red-500 text-red-500' : 'text-zinc-600'}`} />
                  </motion.span>
                );
              })
            )}
          </button>

          <div className="w-[1px] h-6 bg-amber-500/30" />

          {/* Moedas / Coins */}
          <div className="flex items-center gap-1.5" title="Moedas de Ouro">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="inline-flex items-center justify-center text-amber-400 drop-shadow-[0_0_8px_rgba(244,197,66,0.6)]"
            >
              <Coins className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-amber-400" />
            </motion.span>
            <span className="text-amber-300 font-bold font-cinzel text-sm sm:text-base">
              {coins}
            </span>
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-amber-500/30" />

          {/* Pontuação */}
          <div className="hidden md:flex items-center gap-1 text-xs text-amber-200/80">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="font-semibold">{score} pts</span>
          </div>
        </div>

        {/* Right: Controls (Network, Clues, Sound, Music, Pause, Help) */}
        <div className="flex items-center gap-1 sm:gap-2">
          <NetworkStatus className="hidden sm:inline-flex" />
          {/* Botão de Pistas Coletadas */}
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            onClick={() => setShowCluesDrawer(!showCluesDrawer)}
            className="relative p-2 sm:px-3 sm:py-2 bg-gradient-to-b from-amber-600/30 to-amber-900/40 hover:from-amber-600/50 hover:to-amber-900/60 border border-amber-500/50 rounded-xl text-amber-300 flex items-center gap-1.5 backdrop-blur-md shadow-md cursor-pointer"
            title="Ver Pistas Coletadas"
          >
            <Key className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline text-xs font-cinzel font-bold">Pistas</span>
            <span className="bg-amber-500 text-slate-950 font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
              {clues.length}
            </span>
          </motion.button>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className={`p-2 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
              soundEnabled
                ? 'bg-slate-900/80 border-amber-500/40 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-950/60 border-slate-700 text-slate-500'
            }`}
            title={soundEnabled ? 'Desativar Sons' : 'Ativar Sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-xl border backdrop-blur-md transition-colors cursor-pointer ${
              musicEnabled
                ? 'bg-slate-900/80 border-amber-500/40 text-amber-400 hover:bg-slate-800'
                : 'bg-slate-950/60 border-slate-700 text-slate-500'
            }`}
            title={musicEnabled ? 'Desativar Música' : 'Ativar Música'}
          >
            <Music className="w-4 h-4" />
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowHowToPlay(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/40 text-amber-300 hover:bg-slate-800 backdrop-blur-md transition-colors cursor-pointer"
            title="Como Jogar"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Pause Button */}
          <button
            onClick={() => setIsPaused(true)}
            className="p-2 rounded-xl bg-slate-900/80 border border-amber-500/40 text-amber-300 hover:bg-slate-800 backdrop-blur-md transition-colors cursor-pointer"
            title="Pausar"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Clues Inventory Modal with Drag & Drop */}
      <InventoryModal
        isOpen={showCluesDrawer}
        onClose={() => setShowCluesDrawer(false)}
      />
    </>
  );
}
