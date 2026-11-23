import React from 'react';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from './store/useGameStore';
import { sound } from './services/soundEngine';

// Modals
import { HowToPlayModal, PauseModal, SettingsModal, GameOverModal } from './components/Modals';
import GrandPrizeModal from './components/GrandPrizeModal';
import LeaderboardModal from './components/LeaderboardModal';
import ZombieAttackModal from './components/ZombieAttackModal';

// Pages & Screens
import Home from './pages/Home';
import CharacterSelector from './components/CharacterSelector';
import CharacterEditor from './components/CharacterEditor';
import TreasureMap from './components/TreasureMap';
import GamePhasePage from './pages/GamePhasePage';
import TreasureChest from './components/TreasureChest';
import ZombieEncounter from './components/ZombieHorde/ZombieEncounter';

export default function App() {
  const {
    activeScreen,
    setActiveScreen,
    selectedMap,
    musicEnabled,
    soundEnabled
  } = useGameStore();

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
            onProceed={() => setActiveScreen('home')}
          />
        );

      case 'character_edit':
        return (
          <CharacterEditor
            key="character_edit"
            onConfirm={() => setActiveScreen('home')}
            onBack={() => setActiveScreen('home')}
          />
        );

      // map_select screen removed — route chosen on Home

      case 'map_overview':
        return (
          <TreasureMap
            key="map_overview"
            onStartPhase={() => setActiveScreen('game_phase')}
            onBackToMapSelect={() => setActiveScreen('home')}
          />
        );

      case 'game_phase':
        return <GamePhasePage key="game_phase" />;

      case 'victory':
        return (
          <TreasureChest
            key="victory"
            onReturnToMap={() => setActiveScreen('map_overview')}
            onReturnHome={() => setActiveScreen('home')}
          />
        );

      default:
        return <Home key="home_default" />;
    }
  };

  return (
    <div
      className="relative min-h-screen w-full overflow-x-hidden flex flex-col"
      style={{ background: '#0d1108', color: '#d4c9a8' }}
    >
      {/* Screen transitions */}
      <div className="relative z-10 flex-1 flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScreen}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="flex-1 flex flex-col"
          >
            {renderActiveScreen()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Zombie Encounters on Home & Map */}
      {(activeScreen === 'home' || activeScreen === 'map_overview') && <ZombieEncounter />}

      {/* Global modals */}
      <HowToPlayModal />
      <PauseModal />
      <SettingsModal />
      <GameOverModal />
      <GrandPrizeModal />
      <LeaderboardModal />
      <ZombieAttackModal />
    </div>
  );
}
