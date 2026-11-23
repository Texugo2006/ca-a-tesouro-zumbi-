import { create } from 'zustand';
import { characters } from '../data/characters';
import { sound } from '../services/soundEngine';

const STORAGE_KEY = 'caca_tesouro_save_v1';

const ZOMBIE_ATTACK_SCENARIOS = [
  {
    title: 'Mordida no Flanco!',
    subtitle: 'Ataque Surpresa na Penumbra',
    description: 'Um carniçal saltou dos escombros e cravou as garras na blindagem antes de ser repelido!',
    damage: '-1 VIDA'
  },
  {
    title: 'Emboscada da Horda!',
    subtitle: 'Cerco de Infectados',
    description: 'Um grupo de zumbis rastejantes rompeu a barricada e desferiu um ataque agressivo!',
    damage: '-1 VIDA'
  },
  {
    title: 'Esporos Virulentos!',
    subtitle: 'Nuvem Tóxica da Quarentena',
    description: 'Uma carcaça contaminada explodiu no corredor, danificando seu filtro de respiração!',
    damage: '-1 VIDA'
  },
  {
    title: 'Golpe de Brutamontes!',
    subtitle: 'Infectado Mutante Pesado',
    description: 'Um carniçal gigante arremessou escombros de concreto contra o seu flanco!',
    damage: '-1 VIDA'
  }
];

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...parsed,
          customCharacters: parsed.customCharacters || [],
          activeScreen: 'home',
          lives: 3,
          infiniteLives: Boolean(parsed.infiniteLives),
          zombieAttackEvent: null,
          showPhaseScoreModal: false,
          lastPhaseScore: null,
          showLeaderboardModal: false,
          showGrandPrizeModal: false,
          characterAnimation: 'idle'
        };
      }
    } catch (e) {
      console.warn("Error loading saved game:", e);
    }
  }

  const defaultChar = characters[0];
  return {
    selectedCharacter: defaultChar.id,
    customization: { ...defaultChar.defaultCustomization },
    customCharacters: [],
    selectedMap: "pirates",
    currentPhaseIndex: 0,
    lives: 3,
    infiniteLives: false,
    zombieAttackEvent: null,
    coins: 250,
    score: 0,
    unlockedMaps: ["pirates", "forest", "temple", "frozen"],
    mapProgress: {
      pirates: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      forest: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      temple: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      frozen: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} }
    },
    hintsUsed: {},
    soundEnabled: true,
    musicEnabled: true,
    activeScreen: 'home',
    characterAnimation: 'idle',
    showHowToPlay: false,
    showSettings: false,
    showLeaderboardModal: false,
    showGrandPrizeModal: false,
    grandPrizeClaimed: false,
    showPhaseScoreModal: false,
    lastPhaseScore: null,
    isPaused: false
  };
};

export const useGameStore = create((set, get) => ({
  ...getInitialState(),

  saveToStorage: () => {
    try {
      const state = get();
      const persistable = {
        selectedCharacter: state.selectedCharacter,
        customization: state.customization,
        customCharacters: state.customCharacters || [],
        selectedMap: state.selectedMap,
        coins: state.coins,
        score: state.score,
        unlockedMaps: state.unlockedMaps,
        mapProgress: state.mapProgress,
        hintsUsed: state.hintsUsed,
        infiniteLives: state.infiniteLives,
        grandPrizeClaimed: state.grandPrizeClaimed,
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch (e) {
      console.warn("Error saving game state:", e);
    }
  },

  toggleInfiniteLives: () => {
    sound.playClick();
    const next = !get().infiniteLives;
    set({ infiniteLives: next });
    get().saveToStorage();
  },

  closeZombieAttack: () => {
    set({ zombieAttackEvent: null });
  },

  loseLife: () => {
    sound.playError();
    const { infiniteLives, lives } = get();

    // Escolhe aleatoriamente uma cena dramática de ataque zumbi
    const randomAttack = ZOMBIE_ATTACK_SCENARIOS[Math.floor(Math.random() * ZOMBIE_ATTACK_SCENARIOS.length)];
    const attackEvent = {
      ...randomAttack,
      damage: infiniteLives ? 'ESCUDO ∞ ABSORVEU O DANO!' : '-1 VIDA PERDIDA'
    };

    if (infiniteLives) {
      set({
        zombieAttackEvent: attackEvent,
        characterAnimation: 'error'
      });
      setTimeout(() => {
        set({ characterAnimation: 'idle' });
      }, 900);
      return;
    }

    const nextLives = Math.max(0, lives - 1);
    set({
      lives: nextLives,
      zombieAttackEvent: attackEvent,
      characterAnimation: 'error'
    });

    setTimeout(() => {
      if (get().lives > 0) {
        set({ characterAnimation: 'idle' });
      } else {
        set({ activeScreen: 'game_over' });
      }
    }, 1500);
  },

  startNewGame: () => {
    sound.playClick();
    const cleanMapProgress = {
      pirates: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      forest: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      temple: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} },
      frozen: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} }
    };
    // Limpa localStorage ANTES de setar o estado para garantir reset completo
    localStorage.removeItem(STORAGE_KEY);
    set({
      score: 0,
      currentPhaseIndex: 0,
      lives: 3,
      coins: 250,
      grandPrizeClaimed: false,
      hintsUsed: {},
      mapProgress: cleanMapProgress,
      activeScreen: 'home'
    });
    get().saveToStorage();
    // Recarrega a página para garantir que o estado do Zustand seja reiniciado do zero
    setTimeout(() => window.location.reload(), 300);
  },

  resetZone: (mapId) => {
    sound.playClick();
    // Reseta apenas a zona selecionada
    set(state => ({
      mapProgress: {
        ...state.mapProgress,
        [mapId]: {
          maxPhaseUnlocked: 1,
          completed: false,
          cluesCollected: [],
          phaseScores: {}
        }
      }
    }));
    get().saveToStorage();
    setTimeout(() => window.location.reload(), 300);
  },

  resetGame: () => {
    localStorage.removeItem(STORAGE_KEY);
    const initial = getInitialState();
    set(initial);
  },

  openLeaderboardModal: () => {
    sound.playClick();
    set({ showLeaderboardModal: true });
  },

  closeLeaderboardModal: () => {
    set({ showLeaderboardModal: false });
  },

  openGrandPrizeModal: () => {
    sound.playClick();
    set({ showGrandPrizeModal: true });
  },

  closeGrandPrizeModal: () => {
    set({ showGrandPrizeModal: false });
  },

  claimGrandPrize: () => {
    sound.playCorrect();
    set(state => ({
      score: state.score + 5000,
      coins: state.coins + 2500,
      grandPrizeClaimed: true,
      showGrandPrizeModal: true
    }));
    get().saveToStorage();
  },

  closePhaseScoreModal: () => {
    const { lastPhaseScore } = get();
    set({ showPhaseScoreModal: false });
    if (lastPhaseScore?.isFinal) {
      set({ activeScreen: 'victory' });
    } else if (lastPhaseScore) {
      set({
        currentPhaseIndex: lastPhaseScore.phaseNumber,
        activeScreen: 'game_phase'
      });
    }
  },

  returnToMapAfterScore: () => {
    set({
      showPhaseScoreModal: false,
      activeScreen: 'map_overview'
    });
  },

  addCustomCharacter: (char) => {
    set(state => ({ customCharacters: [...(state.customCharacters || []), char] }));
    get().saveToStorage();
  },

  setSelectedCharacter: (characterId) => {
    const char = characters.find(c => c.id === characterId) || characters[0];
    sound.playClick();
    set({
      selectedCharacter: characterId,
      customization: { ...char.defaultCustomization },
      characterAnimation: 'special'
    });
    setTimeout(() => {
      set({ characterAnimation: 'idle' });
    }, 1000);
    get().saveToStorage();
  },

  setCustomization: (customUpdates) => {
    set(state => ({
      customization: { ...state.customization, ...customUpdates }
    }));
    get().saveToStorage();
  },

  setSelectedMap: (mapId) => {
    sound.playClick();
    sound.playAmbient(mapId);
    set({ selectedMap: mapId, currentPhaseIndex: 0 });
    get().saveToStorage();
  },

  setActiveScreen: (screen) => {
    sound.playClick();
    set({ activeScreen: screen });
  },

  setCharacterAnimation: (animType) => {
    set({ characterAnimation: animType });
  },

  setShowHowToPlay: (val) => {
    sound.playClick();
    set({ showHowToPlay: val });
  },

  setShowSettings: (val) => {
    sound.playClick();
    set({ showSettings: val });
  },

  setIsPaused: (val) => {
    sound.playClick();
    set({ isPaused: val });
  },

  toggleSound: () => {
    const next = !get().soundEnabled;
    sound.setSoundEnabled(next);
    if (next) sound.playClick();
    set({ soundEnabled: next });
    get().saveToStorage();
  },

  toggleMusic: () => {
    const next = !get().musicEnabled;
    sound.setMusicEnabled(next);
    if (next) {
      sound.playAmbient(get().selectedMap);
    } else {
      sound.stopAmbient();
    }
    set({ musicEnabled: next });
    get().saveToStorage();
  },

  reviveWithCoins: (cost = 50) => {
    if (get().coins >= cost) {
      sound.playCoin();
      set(state => ({
        coins: state.coins - cost,
        lives: 3,
        activeScreen: 'game_phase',
        characterAnimation: 'success'
      }));
      setTimeout(() => {
        set({ characterAnimation: 'idle' });
      }, 1000);
      get().saveToStorage();
      return true;
    }
    return false;
  },

  gainCoins: (amount) => {
    sound.playCoin();
    set(state => ({
      coins: state.coins + amount,
      score: state.score + amount * 2
    }));
    get().saveToStorage();
  },

  spendCoins: (amount) => {
    if (get().coins >= amount) {
      sound.playCoin();
      set(state => ({ coins: state.coins - amount }));
      get().saveToStorage();
      return true;
    }
    return false;
  },

  collectClue: (mapId, clue) => {
    sound.playClue();
    set(state => {
      const mapProg = state.mapProgress[mapId] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
      const exists = mapProg.cluesCollected.some(c => c.id === clue.id);
      const updatedClues = exists ? mapProg.cluesCollected : [...mapProg.cluesCollected, clue];

      return {
        characterAnimation: 'clue',
        mapProgress: {
          ...state.mapProgress,
          [mapId]: {
            ...mapProg,
            cluesCollected: updatedClues
          }
        }
      };
    });
    setTimeout(() => {
      set({ characterAnimation: 'idle' });
    }, 1200);
    get().saveToStorage();
  },

  reorderClues: (mapId, reorderedClues) => {
    set(state => {
      const mapProg = state.mapProgress[mapId] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
      return {
        mapProgress: {
          ...state.mapProgress,
          [mapId]: {
            ...mapProg,
            cluesCollected: reorderedClues
          }
        }
      };
    });
    get().saveToStorage();
  },

  completePhase: (mapId, phaseNumber, reward = 100) => {
    sound.playCorrect();
    const state = get();
    const currentMapProg = state.mapProgress[mapId] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [], phaseScores: {} };
    const isFinal = phaseNumber >= 7;
    const nextMax = Math.max(currentMapProg.maxPhaseUnlocked, isFinal ? 7 : phaseNumber + 1);

    const basePoints = reward * 2;
    const lifeBonus = state.lives * 50;
    const precisionBonus = 100;
    const totalPhaseScore = basePoints + lifeBonus + precisionBonus;

    const phaseScoreData = {
      phaseNumber,
      basePoints,
      lifeBonus,
      precisionBonus,
      totalPhaseScore,
      reward,
      lives: state.lives,
      isFinal
    };

    const updatedPhaseScores = {
      ...(currentMapProg.phaseScores || {}),
      [phaseNumber]: totalPhaseScore
    };

    set({
      coins: state.coins + reward,
      score: state.score + totalPhaseScore,
      characterAnimation: isFinal ? 'special' : 'success',
      lastPhaseScore: phaseScoreData,
      showPhaseScoreModal: true,
      mapProgress: {
        ...state.mapProgress,
        [mapId]: {
          ...currentMapProg,
          maxPhaseUnlocked: nextMax,
          completed: isFinal ? true : currentMapProg.completed,
          phaseScores: updatedPhaseScores
        }
      }
    });

    get().saveToStorage();
  },

  startPhase: (phaseIdx) => {
    sound.playClick();
    set({
      currentPhaseIndex: phaseIdx,
      activeScreen: 'game_phase',
      characterAnimation: 'entry'
    });
    setTimeout(() => {
      set({ characterAnimation: 'idle' });
    }, 700);
  },

  unlockHint: (mapId, phaseNumber, hintLevel, cost) => {
    const key = `${mapId}_${phaseNumber}`;
    const currentHints = get().hintsUsed[key] || 0;

    if (hintLevel <= currentHints) return true;

    if (cost > 0) {
      const spent = get().spendCoins(cost);
      if (!spent) return false;
    }

    sound.playClick();
    set(state => ({
      hintsUsed: {
        ...state.hintsUsed,
        [key]: Math.max(currentHints, hintLevel)
      }
    }));
    get().saveToStorage();
    return true;
  },
  useHint: (...args) => get().unlockHint(...args),
}));
