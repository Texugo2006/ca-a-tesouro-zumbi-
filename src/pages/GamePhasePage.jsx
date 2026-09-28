import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { phasesData } from '../data/phases';
import GameHUD from '../components/GameHUD';
import HintSystem from '../components/HintSystem';
import Character from '../components/Character';

// Phase mechanic components
import QuestionPhase from '../components/Phase/QuestionPhase';
import CoordinatesPhase from '../components/Phase/CoordinatesPhase';
import PathChoicePhase from '../components/Phase/PathChoicePhase';
import MemoryPhase from '../components/Phase/MemoryPhase';
import SymbolPuzzlePhase from '../components/Phase/SymbolPuzzlePhase';
import CodePhase from '../components/Phase/CodePhase';
import FindObjectPhase from '../components/Phase/FindObjectPhase';
import DifferencePhase from '../components/Phase/DifferencePhase';
import FinalRiddlePhase from '../components/Phase/FinalRiddlePhase';
import BotanicalChoicePhase from '../components/Phase/BotanicalChoicePhase';

export default function GamePhasePage() {
  const {
    selectedMap,
    currentPhaseIndex,
    selectedCharacter,
    customization,
    characterAnimation,
    completePhase,
    collectClue,
    setActiveScreen
  } = useGameStore();

  const phases = phasesData[selectedMap] || [];
  const currentPhase = phases[currentPhaseIndex] || phases[0];
  const phaseNumber = currentPhase.phaseNumber || (currentPhaseIndex + 1);

  // Variety rule check in code: ensure consecutive phases don't repeat the same type
  const previousPhase = currentPhaseIndex > 0 ? phases[currentPhaseIndex - 1] : null;
  if (previousPhase && previousPhase.type === currentPhase.type && currentPhase.type !== 'final_riddle') {
    console.warn(`Variety rule check: Phase ${phaseNumber} has identical type to Phase ${phaseNumber - 1}`);
  }

  const handlePhaseComplete = (reward, clue) => {
    if (clue) {
      collectClue(selectedMap, clue);
    }
    completePhase(selectedMap, phaseNumber, reward);
  };

  const renderPhaseComponent = () => {
    switch (currentPhase.type) {
      case 'coordinates':
        return <CoordinatesPhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'question':
        return <QuestionPhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'find_object':
        return <FindObjectPhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'path_choice':
        return <PathChoicePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'botanical_choice':
        return <BotanicalChoicePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'code':
        return <CodePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'symbol_puzzle':
        return <SymbolPuzzlePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'memory':
        return <MemoryPhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'difference':
        return <DifferencePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'final_riddle':
        return <FinalRiddlePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      default:
        return <QuestionPhase phase={currentPhase} onComplete={handlePhaseComplete} />;
    }
  };

  return (
    <div className="h-screen max-h-screen flex flex-col justify-between select-none relative z-10 pb-3 pt-1 overflow-hidden">
      {/* Game HUD */}
      <GameHUD showMapReturn={true} currentPhaseNumber={phaseNumber} />

      {/* Main Phase Stage */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-1 max-w-5xl mx-auto w-full min-h-0 overflow-y-auto">
        {/* Phase Header Controls Bar */}
        <div className="w-full max-w-3xl flex items-center justify-between mb-2 px-2 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-xs font-cinzel font-black text-amber-400 bg-slate-950/80 px-2.5 py-1 rounded-lg border border-amber-500/30">
              FASE {phaseNumber} / 7
            </span>
            <span className="text-xs text-amber-200/70 font-semibold hidden sm:inline">
              • {currentPhase.subtitle || currentPhase.title}
            </span>
          </div>

          <HintSystem phase={currentPhase} mapId={selectedMap} />
        </div>

        {/* Dynamic Phase Component with smooth key transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedMap}_${phaseNumber}`}
            initial={{ opacity: 0, scale: 0.96, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -15 }}
            transition={{ duration: 0.35 }}
            className="w-full flex justify-center"
          >
            {renderPhaseComponent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Companion Hero Bar */}
      <footer className="w-full max-w-4xl mx-auto px-4 flex items-end justify-between pointer-events-none shrink-0 pt-1">
        <div className="pointer-events-auto flex items-center gap-3 bg-slate-950/85 border border-amber-500/40 px-3 py-1.5 rounded-2xl backdrop-blur-md shadow-xl">
          <div className="w-12 h-14 shrink-0 flex items-center justify-center">
            <Character
              characterId={selectedCharacter}
              customization={customization}
              size="xs"
              animationType={characterAnimation}
            />
          </div>
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-amber-400 font-cinzel">
              Companheiro de Aventura
            </div>
            <div className="text-xs text-amber-100/90 font-semibold truncate max-w-[200px] sm:max-w-xs">
              {characterAnimation === 'error'
                ? '⚠️ Cuidado com armadilhas!'
                : characterAnimation === 'success'
                ? '✨ Excelente dedução!'
                : characterAnimation === 'clue'
                ? '🔍 Pista registrada no pergaminho!'
                : characterAnimation === 'special'
                ? '⚡ Poder ancestral ativado!'
                : 'Observando atentamente os arredores...'}
            </div>
          </div>
        </div>

        <button
          onClick={() => setActiveScreen('map_overview')}
          className="pointer-events-auto text-xs font-cinzel font-bold text-amber-400/90 hover:text-amber-200 py-1.5 px-3 bg-slate-950/80 border border-amber-500/30 rounded-xl transition-colors cursor-pointer shadow-lg hover:border-amber-400"
        >
          🗺️ Visão Geral do Mapa
        </button>
      </footer>
    </div>
  );
}
