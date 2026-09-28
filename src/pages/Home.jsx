import React from 'react';
import { motion } from 'framer-motion';
import GameLogo from '../components/Header/GameLogo';
import Character from '../components/Character';
import { useGameStore } from '../store/useGameStore';
import { characters } from '../data/characters';
import { Play, Users, Wand2, Map, HelpCircle, Sparkles, Volume2, VolumeX, Music } from 'lucide-react';

export default function Home() {
  const {
    selectedCharacter,
    customization,
    setActiveScreen,
    setShowHowToPlay,
    coins,
    score,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic
  } = useGameStore();

  const hero = characters.find(c => c.id === selectedCharacter) || characters[0];

  return (
    <div className="relative min-h-screen max-h-screen flex flex-col items-center justify-between py-3 sm:py-5 px-4 select-none z-10 overflow-y-auto sm:overflow-hidden">
      {/* Top Bar with Audio and Stats */}
      <div className="w-full max-w-4xl flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3 bg-slate-950/80 px-3.5 py-1.5 rounded-2xl border border-amber-500/40 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-1.5 font-cinzel font-bold text-amber-300 text-sm">
            <span>🪙</span>
            <span>{coins}</span>
          </div>
          <div className="w-[1px] h-4 bg-amber-500/30" />
          <div className="flex items-center gap-1.5 font-cinzel font-bold text-amber-200/80 text-xs">
            <span>⭐</span>
            <span>{score} pts</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl bg-slate-950/80 border border-amber-500/40 text-amber-400 hover:bg-slate-900 backdrop-blur-md cursor-pointer transition-colors"
            title={soundEnabled ? 'Desativar Sons' : 'Ativar Sons'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={toggleMusic}
            className="p-2 rounded-xl bg-slate-950/80 border border-amber-500/40 text-amber-400 hover:bg-slate-900 backdrop-blur-md cursor-pointer transition-colors"
            title={musicEnabled ? 'Desativar Música' : 'Ativar Música'}
          >
            <Music className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Center Stage: Adventure Logo + Hero Showcase */}
      <div className="flex flex-col items-center text-center my-1 sm:my-2 shrink-0">
        <GameLogo size="lg" />

        <p className="mt-2 text-xs sm:text-sm md:text-base font-cinzel text-amber-200/90 max-w-md drop-shadow-md">
          "Uma aventura cheia de enigmas espera por você."
        </p>

        {/* Hero Character Stand */}
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
          className="relative mt-2 sm:mt-3 mb-1 flex flex-col items-center cursor-pointer group"
          onClick={() => setActiveScreen('character_select')}
          title="Clique para trocar de herói"
        >
          {/* Pedestal platform */}
          <div className="w-36 h-6 bg-amber-500/20 rounded-full blur-md absolute -bottom-1" />

          <div className="w-36 h-40 sm:w-44 sm:h-48 flex items-center justify-center">
            <Character
              characterId={hero.id}
              customization={customization}
              size="lg"
              animationType="idle"
            />
          </div>

          <div className="px-3 py-1 rounded-full bg-slate-950/90 border border-amber-500/40 text-[11px] font-cinzel font-bold text-amber-300 shadow-md group-hover:border-amber-300 transition-colors">
            {hero.name} ({hero.type}) • <span className="text-amber-400/80 underline">Trocar</span>
          </div>
        </motion.div>
      </div>

      {/* Main Navigation Action Buttons */}
      <div className="w-full max-w-md flex flex-col gap-2 shrink-0 pb-1">
        {/* Play Master CTA */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setActiveScreen('map_overview')}
          className="w-full py-3 sm:py-3.5 gold-gradient-btn rounded-2xl font-cinzel font-black text-base sm:text-lg flex items-center justify-center gap-2 cursor-pointer shadow-2xl relative overflow-hidden"
        >
          <Play className="w-5 h-5 fill-current" />
          <span>JOGAR AGORA</span>
        </motion.button>

        {/* Secondary options row */}
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScreen('character_select')}
            className="py-2.5 px-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-amber-200 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <Users className="w-4 h-4 text-amber-400" />
            <span>Escolher Personagem</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScreen('character_edit')}
            className="py-2.5 px-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel text-xs sm:text-sm font-bold text-amber-200 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <Wand2 className="w-4 h-4 text-amber-400" />
            <span>Personalizar Herói</span>
          </motion.button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveScreen('map_select')}
            className="py-2 px-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel text-xs font-bold text-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <Map className="w-4 h-4 text-amber-400" />
            <span>Escolher Mapa</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setShowHowToPlay(true)}
            className="py-2 px-3 bg-slate-900/90 hover:bg-slate-800 border border-amber-500/40 rounded-xl font-cinzel text-xs font-bold text-amber-300 flex items-center justify-center gap-2 cursor-pointer shadow-md transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Como Jogar</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
