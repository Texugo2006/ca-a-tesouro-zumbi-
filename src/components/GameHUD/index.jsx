import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { maps } from '../../data/maps';
import { Volume2, VolumeX, Music, HelpCircle, Pause, Map, Compass, Sparkles, Key } from 'lucide-react';

export default function GameHUD({ showMapReturn = true, currentPhaseNumber = null }) {
  const {
    lives,
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
            <span className="text-lg">{currentMapData.visuals.bannerIcon}</span>
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
          {/* Vidas / Hearts */}
          <div className="flex items-center gap-1" title="Vidas Restantes">
            {[1, 2, 3].map((heartIndex) => {
              const isAlive = heartIndex <= lives;
              return (
                <motion.span
                  key={heartIndex}
                  animate={isAlive ? { scale: [1, 1.1, 1] } : { scale: 0.85, filter: 'grayscale(100%)' }}
                  transition={isAlive ? { duration: 1.8, repeat: Infinity, delay: heartIndex * 0.2 } : {}}
                  className={`text-lg sm:text-2xl transition-all ${isAlive ? 'drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]' : 'opacity-40'}`}
                >
                  ❤️
                </motion.span>
              );
            })}
          </div>

          <div className="w-[1px] h-6 bg-amber-500/30" />

          {/* Moedas / Coins */}
          <div className="flex items-center gap-1.5" title="Moedas de Ouro">
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="text-lg sm:text-xl drop-shadow-[0_0_8px_rgba(244,197,66,0.6)]"
            >
              🪙
            </motion.span>
            <span className="text-amber-300 font-bold font-cinzel text-sm sm:text-base">
              {coins}
            </span>
          </div>

          <div className="hidden md:block w-[1px] h-6 bg-amber-500/30" />

          {/* Pontuação */}
          <div className="hidden md:flex items-center gap-1 text-xs text-amber-200/80">
            <span>⭐</span>
            <span className="font-semibold">{score} pts</span>
          </div>
        </div>

        {/* Right: Controls (Clues, Sound, Music, Pause, Help) */}
        <div className="flex items-center gap-1 sm:gap-2">
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

      {/* Clues Drawer Modal */}
      <AnimatePresence>
        {showCluesDrawer && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-x-4 top-16 max-w-xl mx-auto z-40 bg-slate-950/95 border-2 border-amber-500/60 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-3 border-b border-amber-500/30">
              <div className="flex items-center gap-2">
                <span className="text-xl">📜</span>
                <h3 className="font-cinzel font-bold text-amber-300 text-base">
                  Pistas Coletadas ({clues.length}/5)
                </h3>
              </div>
              <button
                onClick={() => setShowCluesDrawer(false)}
                className="text-amber-400/70 hover:text-amber-200 text-sm font-bold px-2 py-1"
              >
                ✕ Fechar
              </button>
            </div>

            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
              {clues.length === 0 ? (
                <div className="col-span-full py-6 text-center text-amber-200/60 text-xs">
                  Nenhuma pista encontrada ainda. Supere as fases deste mapa para desbloquear coordenadas, símbolos e senhas!
                </div>
              ) : (
                clues.map((clue, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 bg-amber-950/40 border border-amber-500/30 rounded-xl flex items-center gap-3"
                  >
                    <span className="text-2xl">{clue.icon || '🔍'}</span>
                    <div>
                      <div className="text-[10px] uppercase font-bold text-amber-400">
                        {clue.title || clue.label || 'Pista Secreta'}
                      </div>
                      <div className="font-cinzel font-black text-amber-200 text-sm">
                        {clue.value}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <p className="mt-3 text-[11px] text-amber-300/60 text-center italic">
              💡 Você precisará de todas essas informações para desvendar o enigma final na Fase 7!
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
