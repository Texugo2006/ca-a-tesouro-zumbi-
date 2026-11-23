import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/useGameStore';
import { phasesData } from '../data/phases';
import HintSystem from '../components/HintSystem';
import PhaseScoreModal from '../components/PhaseScoreModal';

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
import WireCutterPhase from '../components/Phase/WireCutterPhase';
import FrequencyPhase from '../components/Phase/FrequencyPhase';
import TriagePhase from '../components/Phase/TriagePhase';
import DifficultySelector from '../components/DifficultySelector';
import { adaptPhaseForDifficulty } from '../utils/difficultyAdapter';
import { getOperatorForPhase } from '../data/operators';

import { ArrowLeft, Heart, Coins, Trophy, Radio, ShieldCheck } from 'lucide-react';
import { Volume2, VolumeX, Music, Map } from 'lucide-react';

export default function GamePhasePage() {
  const {
    selectedMap,
    currentPhaseIndex,
    completePhase,
    collectClue,
    setActiveScreen,
    difficulty,
    lives,
    infiniteLives,
    toggleInfiniteLives,
    coins,
    score,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
  } = useGameStore();

  const [hintTrigger, setHintTrigger] = React.useState(0);

  const phases = phasesData[selectedMap] || [];
  const rawPhase = phases[currentPhaseIndex] || phases[0];

  // Dynamically adapt phase parameters according to selected difficulty
  const currentPhase = React.useMemo(() => {
    return adaptPhaseForDifficulty(rawPhase, difficulty);
  }, [rawPhase, difficulty]);

  const phaseNumber = currentPhase.phaseNumber || (currentPhaseIndex + 1);
  const operator = getOperatorForPhase(phaseNumber);
  const maxLives = difficulty === 'easy' ? 5 : difficulty === 'hard' ? 2 : 3;

  const handlePhaseComplete = (reward, clue) => {
    if (clue) collectClue(selectedMap, clue);
    completePhase(selectedMap, phaseNumber, reward);
  };

  const renderPhaseComponent = () => {
    switch (currentPhase.type) {
      case 'coordinates':      return <CoordinatesPhase    phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'question':         return <QuestionPhase        phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'find_object':      return <FindObjectPhase      phase={currentPhase} onComplete={handlePhaseComplete} hintTrigger={hintTrigger} />;
      case 'path_choice':      return <PathChoicePhase      phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'botanical_choice': return <BotanicalChoicePhase phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'code':             return <CodePhase            phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'symbol_puzzle':    return <SymbolPuzzlePhase    phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'memory':           return <MemoryPhase          phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'difference':       return <DifferencePhase      phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'final_riddle':     return <FinalRiddlePhase     phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'wire_cutter':      return <WireCutterPhase      phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'frequency':        return <FrequencyPhase       phase={currentPhase} onComplete={handlePhaseComplete} />;
      case 'triage':           return <TriagePhase          phase={currentPhase} onComplete={handlePhaseComplete} />;
      default:                 return <QuestionPhase        phase={currentPhase} onComplete={handlePhaseComplete} />;
    }
  };


  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: '#0d1108' }}
    >
      {/* ── Compact header ── */}
      <header
        className="flex items-center justify-between px-4 py-2.5 border-b shrink-0"
        style={{ background: '#0a0f08', borderColor: '#1a2014' }}
      >
        {/* Left: back + phase */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveScreen('map_overview')}
            className="flex items-center gap-1 font-outfit text-xs cursor-pointer transition-colors"
            style={{ color: '#4a7c2a' }}
            onMouseOver={e => e.currentTarget.style.color = '#7ab648'}
            onMouseOut={e => e.currentTarget.style.color = '#4a7c2a'}
          >
            <Map className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mapa</span>
          </button>

          <span style={{ color: '#1a2414' }}>|</span>

          <span className="font-cinzel font-bold text-sm" style={{ color: '#d4c9a8' }}>
            MISSÃO {phaseNumber}
            <span className="font-outfit font-normal text-xs ml-1" style={{ color: '#3a3830' }}>
              / 7
            </span>
          </span>

          <span style={{ color: '#1a2414' }}>|</span>

          {/* Difficulty Selector in Header */}
          <div className="hidden sm:block">
            <DifficultySelector compact={true} />
          </div>
        </div>

        {/* Center: progress dots */}
        <div className="hidden md:flex items-center gap-1">
          {phases.map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: i < currentPhaseIndex
                  ? '#4a7c2a'
                  : i === currentPhaseIndex
                  ? '#7ab648'
                  : '#1a2014',
              }}
            />
          ))}
        </div>

        {/* Right: lives + coins + audio */}
        <div className="flex items-center gap-2">
          {/* lives */}
          <button
            onClick={toggleInfiniteLives}
            className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity"
            title={infiniteLives ? "Modo Imortal Ativo (Clique para vidas normais)" : `Vidas (${lives}/${maxLives}) - Clique para modo vida infinita`}
          >
            {infiniteLives ? (
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 border border-emerald-500/60 text-emerald-300 font-mono text-[10px] font-black tracking-wider flex items-center gap-1 shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>VIDA ∞</span>
              </span>
            ) : (
              Array.from({ length: maxLives }, (_, i) => i + 1).map(i => (
                <Heart
                  key={i}
                  className={`w-4 h-4 transition-all ${
                    i <= lives
                      ? 'text-red-500 fill-red-500 drop-shadow-[0_0_6px_rgba(239,68,68,0.7)]'
                      : 'text-zinc-600 fill-zinc-800 opacity-40'
                  }`}
                />
              ))
            )}
          </button>

          <span style={{ color: '#1a2414' }}>|</span>

          {/* coins */}
          <span className="font-outfit text-xs flex items-center gap-1 font-semibold" style={{ color: '#d4af37' }} title="Moedas">
            <Coins className="w-3.5 h-3.5 text-amber-400 inline-block" />
            {coins}
          </span>

          <span style={{ color: '#1a2414' }}>|</span>

          {/* score */}
          <span className="font-cinzel text-xs flex items-center gap-1 font-bold" style={{ color: '#b8d870' }} title="Pontuação Geral">
            <Trophy className="w-3.5 h-3.5 text-amber-400 inline-block" />
            {score}
          </span>

          <span style={{ color: '#1a2414' }}>|</span>

          {/* audio */}
          <button
            onClick={toggleSound}
            className="p-1 rounded cursor-pointer"
            style={{ color: soundEnabled ? '#4a7c2a' : '#2a2a26' }}
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={toggleMusic}
            className="p-1 rounded cursor-pointer"
            style={{ color: musicEnabled ? '#4a7c2a' : '#2a2a26' }}
          >
            <Music className="w-3.5 h-3.5" />
          </button>

          <HintSystem
            phase={currentPhase}
            mapId={selectedMap}
            onTriggerHint={(lvl) => setHintTrigger(prev => prev + 1)}
          />
        </div>
      </header>

      {/* ── Phase content ── */}
      <main className="flex-1 flex flex-col items-center justify-start px-4 py-4 overflow-y-auto">
        {/* Tactical Operator Transmission Banner */}
        <div className="w-full max-w-2xl mb-3 flex items-center justify-between gap-3 px-3.5 py-2.5 bg-[#0c120d]/90 border border-emerald-500/40 rounded-2xl shadow-lg backdrop-blur-sm shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl overflow-hidden border-2 ${operator.borderColor} bg-slate-950 shrink-0 shadow-md flex items-center justify-center`}>
              <img
                src={operator.avatar}
                alt={operator.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.src = '/assets/personagems/kael.png'; }}
              />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-mono font-black text-emerald-300 uppercase tracking-wide truncate">
                  {operator.name}
                </span>
                <span className="text-[10px] text-zinc-400 font-mono hidden sm:inline">
                  • {operator.callsign}
                </span>
                <span className="text-[9px] px-1.5 py-0.5 bg-emerald-950 border border-emerald-500/40 rounded text-emerald-400 font-mono uppercase font-bold">
                  FASE {phaseNumber}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-zinc-300 font-sans italic truncate mt-0.5">
                "{operator.quote}"
              </p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-emerald-950/70 border border-emerald-500/40 rounded-lg text-[10px] font-mono text-emerald-400 shrink-0">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span className="font-bold">LINK ATIVO</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedMap}_${phaseNumber}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="w-full flex justify-center"
          >
            {renderPhaseComponent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Phase Score Summary Modal */}
      <PhaseScoreModal />
    </div>
  );
}
