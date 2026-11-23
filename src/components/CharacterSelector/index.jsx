import React from 'react';
import { motion } from 'framer-motion';
import { characters } from '../../data/characters';
import { useGameStore } from '../../store/useGameStore';
import Character from '../Character';
import CharacterCreator from '../CharacterCreator';
import { Sparkles, Wand2, ArrowRight, Shield, Zap, BookOpen, Check } from 'lucide-react';

export default function CharacterSelector({ onSelect, onCustomize, onProceed }) {
  const { selectedCharacter, setSelectedCharacter, customization, customCharacters } = useGameStore();
  const [showCreator, setShowCreator] = React.useState(false);

  const allCharacters = [...characters, ...(customCharacters || [])];
  const activeHero = allCharacters.find(c => c.id === selectedCharacter) || allCharacters[0] || characters[0];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6 flex flex-col items-center">
      {/* Title */}
      <div className="text-center mb-6">
        <span className="text-xs font-cinzel font-bold text-amber-400 uppercase tracking-widest">
          Heróis Lendários
        </span>
        <h2 className="text-3xl sm:text-4xl font-cinzel font-black text-amber-200 mt-1">
          Escolha seu Personagem
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-amber-100/80 max-w-lg mx-auto">
          Cada herói possui arquétipo, animações exclusivas e uma habilidade especial para guiar sua expedição.
        </p>
      </div>

      {/* Grid of 10 Characters */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full mb-8">
        {allCharacters.map((hero) => {
          const isSelected = selectedCharacter === hero.id;

          return (
            <motion.button
              key={hero.id}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedCharacter(hero.id);
                if (onSelect) onSelect(hero.id);
              }}
              className={`p-3 rounded-2xl border-2 flex flex-col items-center text-center transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-amber-950/80 border-amber-400 shadow-[0_0_20px_rgba(244,197,66,0.5)] scale-102'
                  : 'bg-slate-900/80 border-amber-500/20 hover:border-amber-500/50 hover:bg-slate-850'
              }`}
            >
              {isSelected && (
                <div className="absolute top-2 right-2 text-amber-400">
                  <Check className="w-3.5 h-3.5" />
                </div>
              )}

              {/* Character Avatar thumbnail */}
              <div className="w-20 h-24 flex items-center justify-center mb-2">
                <Character
                  characterId={hero.id}
                  customization={isSelected ? customization : hero.defaultCustomization}
                  size="sm"
                  animationType={isSelected ? 'idle' : 'idle'}
                />
              </div>

              <span className="font-cinzel font-bold text-sm text-amber-200 truncate w-full">
                {hero.name}
              </span>
              <span className="text-[10px] text-amber-400/80 font-semibold uppercase tracking-wider">
                {hero.type}
              </span>
            </motion.button>
          );
        })}
      </div>

      <div className="w-full max-w-6xl mx-auto px-4 mb-6 flex justify-end">
        <button
          onClick={() => setShowCreator(true)}
          className="px-4 py-2 bg-amber-600/10 border border-amber-500/30 rounded-xl text-amber-200 text-sm font-bold"
        >
          + Adicionar Personagem
        </button>
      </div>

      {showCreator && <CharacterCreator onClose={() => setShowCreator(false)} />}

      {/* Hero Spotlight Card */}
      <div className="w-full max-w-3xl parchment-dark p-6 rounded-3xl border-2 border-amber-500/50 shadow-2xl flex flex-col md:flex-row items-center gap-6">
        <div className="w-36 h-44 sm:w-44 sm:h-52 flex items-center justify-center shrink-0">
          <Character
            characterId={activeHero.id}
            customization={customization}
            size="lg"
            animationType="special"
          />
        </div>

        <div className="flex-1 text-left">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-bold uppercase font-cinzel">
              {activeHero.type}
            </span>
            <span className="text-xs text-amber-200/60 font-medium">
              {activeHero.title}
            </span>
          </div>

          <h3 className="text-2xl font-cinzel font-black text-amber-300 mt-1">
            {activeHero.name}
          </h3>

          <p className="text-xs sm:text-sm text-amber-100/90 mt-2 leading-relaxed">
            {activeHero.description}
          </p>

          {/* Special Ability Pill */}
          <div className="mt-3 p-3 bg-amber-950/40 border border-amber-500/30 rounded-xl">
            <div className="text-[11px] font-bold text-amber-400 flex items-center gap-1.5 font-cinzel">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Habilidade: {activeHero.ability}</span>
            </div>
            <p className="text-xs text-amber-200/80 mt-1">
              {activeHero.abilityDesc}
            </p>
          </div>

          <p className="mt-3 text-xs italic text-amber-300/70">
            "{activeHero.quote}"
          </p>

          {/* Action Buttons */}
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={onCustomize}
              className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 rounded-xl text-amber-300 font-cinzel text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Wand2 className="w-4 h-4" /> Personalizar Herói
            </button>

            <button
              onClick={onProceed}
              className="px-6 py-2.5 gold-gradient-btn rounded-xl font-cinzel font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer shadow-md"
            >
              <span>Escolher Mapa</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
