import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../../store/useGameStore';
import { Volume2, VolumeX, Music, RotateCcw, Play, Map, Home, Heart, Key, Sparkles, HelpCircle } from 'lucide-react';

export function HowToPlayModal() {
  const { showHowToPlay, setShowHowToPlay } = useGameStore();

  if (!showHowToPlay) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="w-full max-w-xl bg-slate-950 border-2 border-amber-500/80 rounded-3xl p-6 shadow-2xl relative text-amber-100 max-h-[88vh] overflow-y-auto"
      >
        <button
          onClick={() => setShowHowToPlay(false)}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-200 text-lg font-bold w-8 h-8 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">📜</span>
          <h2 className="text-2xl font-cinzel font-black text-amber-400">
            Manual do Aventureiro
          </h2>
        </div>

        <div className="space-y-4 text-sm text-amber-100/90 leading-relaxed">
          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">🗺️</span>
            <div>
              <h4 className="font-bold text-amber-300">O Objetivo</h4>
              <p className="text-xs text-amber-200/80 mt-1">
                Você recebeu um mapa lendário! Escolha seu herói, personalize seus atributos e avance pelas 7 fases de cada um dos 4 mapas até abrir o grande baú final.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">❤️</span>
            <div>
              <h4 className="font-bold text-amber-300">Sistema de Vidas</h4>
              <p className="text-xs text-amber-200/80 mt-1">
                Você possui 3 vidas por fase. Errar opções, caminhos ou códigos custa 1 vida. Se perder todas, poderá usar 50 moedas para se recuperar ou reiniciar a fase.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">🪙</span>
            <div>
              <h4 className="font-bold text-amber-300">Moedas & Dicas (💡)</h4>
              <p className="text-xs text-amber-200/80 mt-1">
                Ganhe moedas de ouro completando fases e acertando de primeira! Cada fase oferece até 3 dicas: a primeira é gratuita, e as seguintes custam moedas.
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">🧩</span>
            <div>
              <h4 className="font-bold text-amber-300">Variedade de Mecânicas</h4>
              <p className="text-xs text-amber-200/80 mt-1">
                As fases nunca se repetem consecutivamente: coordenadas, perguntas, bifurcações de rota, jogos de memória, decodificação de senhas, busca de relíquias e o grande Enigma Final!
              </p>
            </div>
          </div>

          <div className="p-3 bg-amber-950/40 border border-amber-500/30 rounded-2xl flex items-start gap-3">
            <span className="text-2xl">🗝️</span>
            <div>
              <h4 className="font-bold text-amber-300">O Enigma Final (Fase 7)</h4>
              <p className="text-xs text-amber-200/80 mt-1">
                Nas fases 1 a 6 você encontra pistas especiais (coordenadas, direções, símbolos, palavras e números). No Enigma Final, use o painel interativo para combinar tudo e abrir o Baú do Tesouro!
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShowHowToPlay(false)}
          className="mt-6 w-full py-3 gold-gradient-btn rounded-xl font-cinzel font-bold text-sm cursor-pointer"
        >
          ENTENDIDO, VAMOS AVANÇAR!
        </button>
      </motion.div>
    </div>
  );
}

export function PauseModal() {
  const { isPaused, setIsPaused, setActiveScreen } = useGameStore();

  if (!isPaused) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm bg-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 shadow-2xl text-center"
      >
        <div className="text-4xl mb-2">⏸️</div>
        <h3 className="text-2xl font-cinzel font-bold text-amber-400 mb-1">Jogo Pausado</h3>
        <p className="text-xs text-amber-200/70 mb-6">Respire fundo antes de prosseguir a jornada!</p>

        <div className="space-y-3">
          <button
            onClick={() => setIsPaused(false)}
            className="w-full py-3 gold-gradient-btn rounded-xl font-cinzel font-bold flex items-center justify-center gap-2 cursor-pointer text-sm"
          >
            <Play className="w-4 h-4" /> Continuar Aventura
          </button>

          <button
            onClick={() => {
              setIsPaused(false);
              setActiveScreen('map_overview');
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 rounded-xl font-cinzel text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Map className="w-4 h-4" /> Ver Mapa do Tesouro
          </button>

          <button
            onClick={() => {
              setIsPaused(false);
              setActiveScreen('home');
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white rounded-xl font-cinzel text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Home className="w-4 h-4" /> Menu Inicial
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export function SettingsModal() {
  const {
    showSettings,
    setShowSettings,
    soundEnabled,
    musicEnabled,
    toggleSound,
    toggleMusic,
    resetGame
  } = useGameStore();

  if (!showSettings) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="w-full max-w-sm bg-slate-950 border-2 border-amber-500/70 rounded-3xl p-6 shadow-2xl relative text-amber-100"
      >
        <button
          onClick={() => setShowSettings(false)}
          className="absolute top-4 right-4 text-amber-400 hover:text-amber-200 text-lg font-bold w-8 h-8 rounded-full bg-slate-900 border border-amber-500/40 flex items-center justify-center cursor-pointer"
        >
          ✕
        </button>

        <h3 className="text-xl font-cinzel font-bold text-amber-400 mb-4 flex items-center gap-2">
          <span>⚙️</span> Configurações
        </h3>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between p-3 bg-slate-900/80 border border-amber-500/30 rounded-2xl">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <Volume2 className="w-4 h-4 text-amber-400" /> Efeitos Sonoros (FX)
            </span>
            <button
              onClick={toggleSound}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-cinzel cursor-pointer transition-colors ${
                soundEnabled ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {soundEnabled ? 'LIGADO' : 'DESLIGADO'}
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-slate-900/80 border border-amber-500/30 rounded-2xl">
            <span className="flex items-center gap-2 text-xs font-semibold">
              <Music className="w-4 h-4 text-amber-400" /> Trilha Musical Ambiente
            </span>
            <button
              onClick={toggleMusic}
              className={`px-3 py-1 rounded-lg text-xs font-bold font-cinzel cursor-pointer transition-colors ${
                musicEnabled ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 text-slate-400'
              }`}
            >
              {musicEnabled ? 'LIGADO' : 'DESLIGADO'}
            </button>
          </div>

          <div className="pt-2 border-t border-amber-500/20">
            <button
              onClick={() => {
                if (window.confirm("Deseja realmente resetar todo o progresso do jogo?")) {
                  resetGame();
                  setShowSettings(false);
                }
              }}
              className="w-full py-2.5 bg-red-950/60 hover:bg-red-900/80 border border-red-500/40 text-red-300 rounded-xl font-cinzel text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" /> Reiniciar Progresso Completo
            </button>
          </div>
        </div>

        <button
          onClick={() => setShowSettings(false)}
          className="mt-6 w-full py-2.5 gold-gradient-btn rounded-xl font-cinzel font-bold text-xs cursor-pointer"
        >
          SALVAR & FECHAR
        </button>
      </motion.div>
    </div>
  );
}

export function GameOverModal() {
  const { activeScreen, coins, reviveWithCoins, setActiveScreen, currentPhaseIndex } = useGameStore();

  if (activeScreen !== 'game_over') return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-lg">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-sm bg-slate-950 border-2 border-red-500/80 rounded-3xl p-6 shadow-2xl text-center"
      >
        <div className="text-5xl mb-3 animate-bounce">💀</div>
        <h3 className="text-2xl font-cinzel font-black text-red-400 mb-1">
          Vidas Esgotadas!
        </h3>
        <p className="text-xs text-amber-200/80 mb-6 leading-relaxed">
          Os perigos da caverna foram intensos demais desta vez. Não desista, aventureiro!
        </p>

        <div className="space-y-3">
          {coins >= 50 ? (
            <button
              onClick={() => reviveWithCoins(50)}
              className="w-full py-3 gold-gradient-btn rounded-xl font-cinzel font-bold flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <span>❤️ Recuperar 3 Vidas (50 🪙)</span>
            </button>
          ) : (
            <div className="text-xs text-amber-400/60 italic py-1">
              Moedas insuficientes para ressuscitar (precisa de 50 🪙).
            </div>
          )}

          <button
            onClick={() => {
              // Revive for free but restart phase
              useGameStore.setState({ lives: 3, activeScreen: 'game_phase' });
            }}
            className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 border border-amber-500/40 text-amber-300 rounded-xl font-cinzel text-xs font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <RotateCcw className="w-4 h-4" /> Tentar Esta Fase Novamente
          </button>

          <button
            onClick={() => setActiveScreen('map_overview')}
            className="w-full py-2 bg-slate-900/60 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-white rounded-xl font-cinzel text-xs font-semibold cursor-pointer transition-colors"
          >
            Retornar ao Mapa
          </button>
        </div>
      </motion.div>
    </div>
  );
}
