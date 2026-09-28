import { create } from 'zustand';
import { characters } from '../data/characters';
import { sound } from '../services/soundEngine';

const STORAGE_KEY = 'caca_tesouro_save_v1';

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
    coins: 250,
    score: 0,
    unlockedMaps: ["pirates", "forest", "temple", "frozen"],
    mapProgress: {
      pirates: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] },
      forest: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] },
      temple: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] },
      frozen: { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] }
    },
    hintsUsed: {},
    soundEnabled: true,
    musicEnabled: true,
    activeScreen: 'home',
    characterAnimation: 'idle',
    showHowToPlay: false,
    showSettings: false,
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
        soundEnabled: state.soundEnabled,
        musicEnabled: state.musicEnabled
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(persistable));
    } catch (e) {
      console.warn("Error saving game state:", e);
    }
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
    try {
      // debug: log character animation changes
      // eslint-disable-next-line no-console
      console.log('[useGameStore] setCharacterAnimation ->', animType);
    } catch (e) {}
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

  loseLife: () => {
    sound.playError();
    const current = get().lives;
    const next = Math.max(0, current - 1);
    set({ lives: next, characterAnimation: 'error' });

    setTimeout(() => {
      if (get().lives > 0) {
        set({ characterAnimation: 'idle' });
      } else {
        set({ activeScreen: 'game_over' });
      }
    }, 800);
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

  completePhase: (mapId, phaseNumber, reward = 100) => {
    sound.playCorrect();
    set(state => {
      const currentMapProg = state.mapProgress[mapId] || { maxPhaseUnlocked: 1, completed: false, cluesCollected: [] };
      const isFinal = phaseNumber >= 7;
      const nextMax = Math.max(currentMapProg.maxPhaseUnlocked, isFinal ? 7 : phaseNumber + 1);

      return {
        coins: state.coins + reward,
        score: state.score + reward * 2,
        characterAnimation: isFinal ? 'special' : 'success',
        mapProgress: {
          ...state.mapProgress,
          [mapId]: {
            ...currentMapProg,
            maxPhaseUnlocked: nextMax,
            completed: isFinal ? true : currentMapProg.completed
          }
        }
      };
    });

    get().saveToStorage();

    if (phaseNumber >= 7) {
      setTimeout(() => {
        set({ activeScreen: 'victory' });
      }, 1500);
    } else {
      setTimeout(() => {
        set({
          characterAnimation: 'idle',
          currentPhaseIndex: phaseNumber,
          activeScreen: 'game_phase'
        });
      }, 1400);
    }
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

    if (hintLevel <= currentHints) return true; // already unlocked

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

  resetGame: () => {
    localStorage.removeItem(STORAGE_KEY);
    const initial = getInitialState();
    set(initial);
  }
}));
