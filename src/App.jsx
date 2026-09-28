import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/useGameStore';
import { sound } from './services/soundEngine';
import ParticleBackground from './animations/particles';

// Modals
import { HowToPlayModal, PauseModal, SettingsModal, GameOverModal } from './components/Modals';

// Pages & Screens
import Home from './pages/Home';
import CharacterSelector from './components/CharacterSelector';
import CharacterEditor from './components/CharacterEditor';
import MapSelector from './components/MapSelector';
import TreasureMap from './components/TreasureMap';
import GamePhasePage from './pages/GamePhasePage';
import TreasureChest from './components/TreasureChest';

export default function App() {
  const {
    activeScreen,
    setActiveScreen,
    selectedMap,
    musicEnabled,
    soundEnabled
  } = useGameStore();

  // Handle ambient music lifecycle
  useEffect(() => {
    sound.setSoundEnabled(soundEnabled);
    sound.setMusicEnabled(musicEnabled);

    if (activeScreen === 'game_phase' || activeScreen === 'map_overview') {
      sound.playAmbient(selectedMap);
    } else if (activeScreen === 'home') {
      sound.playAmbient('pirates');
    }
  }, [activeScreen, selectedMap, musicEnabled, soundEnabled]);

  const renderActiveScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <Home key="home" />;

      case 'character_select':
        return (
          <CharacterSelector
            key="character_select"
            onSelect={(id) => {}}
            onCustomize={() => setActiveScreen('character_edit')}
            onProceed={() => setActiveScreen('map_select')}
          />
        );

      case 'character_edit':
        return (
          <CharacterEditor
            key="character_edit"
            onConfirm={() => setActiveScreen('character_select')}
            onBack={() => setActiveScreen('character_select')}
          />
        );

      case 'map_select':
        return (
          <MapSelector
            key="map_select"
            onSelectMap={() => setActiveScreen('map_overview')}
            onBack={() => setActiveScreen('home')}
            onEditCharacter={() => setActiveScreen('character_edit')}
          />
        );

      case 'map_overview':
        return (
          <TreasureMap
            key="map_overview"
            onStartPhase={() => setActiveScreen('game_phase')}
            onBackToMapSelect={() => setActiveScreen('map_select')}
          />
        );

      case 'game_phase':
        return <GamePhasePage key="game_phase" />;

      case 'victory':
        return (
          <TreasureChest
            key="victory"
            onReturnToMap={() => setActiveScreen('map_select')}
            onReturnHome={() => setActiveScreen('home')}
          />
        );

      default:
        return <Home key="home_default" />;
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#071A2F] text-[#F2E3C6] font-outfit overflow-x-hidden flex flex-col">
      {/* Dynamic Themed Particle Background */}
      <ParticleBackground theme={selectedMap || 'pirates'} count={35} />

      {/* Main Content View with Transition */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className="flex-1 flex flex-col"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Persistent Global Modals */}
      <HowToPlayModal />
      <PauseModal />
      <SettingsModal />
      <GameOverModal />
    </div>
  );
}
